<?php

namespace App\Http\Controllers;

use App\ShoppingList;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Item;
use App\Feedback;
use Psy\Util\Json;

class ListController extends Controller
{
    /*
     * return all lists of application
     */
    public function index(){

        $lists = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user' ])->get();
        return $lists;
    }

    /*
     * find list by given id
     */
    public function findById(string $id) : ShoppingList{
        $list = ShoppingList::where('id', $id)
                                ->with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                                ->first();
        return $list;
    }
    /*
     * returns 200 if list exists, 404 if not
     */
    public function checkId(string $id) {
        $list = ShoppingList::where('id', $id)->first();
        return $list != null ?
            response()->json('List with ' . $id . ' exists', 200) :
            response()->json('List with ' . $id . ' does not exist', 404);
    }
    /*
     * find list by search term
     * SQL injection is prevented by default, because Eloquent
     * uses PDO parameter binding
     */
    public function findBySearchTerm(string $searchTerm){
        $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                                ->where('final_sum', 'LIKE', '%' . $searchTerm . '%')
                                ->orWhereHas('creator', function ($query) use ($searchTerm) {
                                    $query->where('firstname', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('lastname', 'LIKE', '%' . $searchTerm . '%');
                                })
                                ->orWhereHas('creator.addresses', function ($query) use ($searchTerm) {
                                    $query->where('street', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('number', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('postcode', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('location', 'LIKE', '%' . $searchTerm . '%');
                                })
                                ->orWhereHas('volunteer', function ($query) use ($searchTerm) {
                                    $query->where('firstname', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('lastname', 'LIKE', '%' . $searchTerm . '%');
                                })
                                ->orWhereHas('volunteer.addresses', function ($query) use ($searchTerm) {
                                    $query->where('street', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('number', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('postcode', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('location', 'LIKE', '%' . $searchTerm . '%');
                                })
                                ->orWhereHas('items', function ($query) use ($searchTerm) {
                                    $query->where('name', 'LIKE', '%' . $searchTerm . '%')
                                        ->orWhere('amount', 'LIKE', '%' . $searchTerm . '%');
                                })
                                ->orWhereHas('feedbacks', function ($query) use ($searchTerm) {
                                    $query->where('feedback_text', 'LIKE', '%' . $searchTerm . '%');
                                })->get();
        return $list;
    }

    /*
     * create new list
     */
    public function save (Request $request) : JsonResponse {

        $request = $this->parseRequest($request);

        //var_dump($request->all()); die();

        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {

            //saves data of list
            $list = ShoppingList::create($request->all());

            // save items
            if (isset($request['items']) && is_array($request['items'])) {
                foreach ($request['items'] as $i ) {
                    $item =
                        Item::create([
                            'name'=>$i['name'],
                            'amount'=>$i['amount'],
                            'max_price'=>$i['max_price']
                        ]);
                    $list->items()->save($item);
                }
            }

            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving list failed: " . $e->getMessage(), 420);
        }
    }

    /*
     * create new feedback comment
     */
    public function saveFeedback (Request $request, int $id) : JsonResponse
    {

        $request = $this->parseRequest($request);

        //var_dump($request->all()); die();

        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {
            //get list
            $list = ShoppingList::with(['creator', 'volunteer', 'items', 'feedbacks'])
                ->where('id', $id)->first();

            // check if list exists and save feedback
            if ($list != null && isset($request['feedback'])) {
                    $feedback =
                        Feedback::create([
                            'feedback_text'=>$request['feedback']['feedback_text'],
                            'user_id'=>$request['feedback']['user_id']
                        ]);
                    $list->feedbacks()->save($feedback);
            }

            //get the updated list to return
            $list = $this->findById($id);

            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving feedback comment failed: " . $e->getMessage(), 420);
        }
    }

    public function update (Request $request, int $id) : JsonResponse
    {
        DB::beginTransaction();

        try {
            $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                ->where('id', $id)->first();

            //its only possible to edit the list, if theres no volunteer yet
            if ($list != null && $list->getAttributeValue('volunteer_id') == null){
                $request = $this->parseRequest($request);
                $list->update($request->all());

                //delete all old items
                $list->items()->delete();

                //save items
                if(isset($request['items']) && is_array($request['items'])){
                    foreach ($request['items'] as $item){
                        $item =
                            Item::create([
                                'name' => $item['name'],
                                'amount' => $item['amount'],
                                'max_price' => $item['max_price']
                            ]);

                        $list->items()->save($item);
                    }
                }

                $list ->save();
            }
            else return response()->json('updating list failed: there is already a volunteer for this list');

            DB:: commit ();

            $list1 = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                ->where( 'id' , $id )->first();

            // return a vaild http response
            return response()->json( $list1 , 201 );
        }
        catch (\Exception $e ) {
            // rollback all queries
            DB:: rollBack ();
            return response()->json( "updating list failed: " . $e ->getMessage(), 420 );
        }
    }

    /*
     * delete list
     * check if creator of list wants to delete the list
     * - if so, delete
     */
    public function delete (int $id) : JsonResponse
    {
        $list = ShoppingList::where('id', $id)->first();

        //its only possible to delete the list, if theres no volunteer yet
        if ($list != null && $list->getAttributeValue('volunteer_id') == null){
            $list->delete();
        }else {
            throw new \Exception("list couldn't be deleted - does not exist or already has a volunteer");
        }
        return response()->json('list '.$id.' successfully deleted', 200);
    }

    /*
     * MISSING
     * put the final sum of the goods (volunteer)
     */
    public function putFinalSum (Request $request, int $id) : JsonResponse
    {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {

            $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                ->where('id', $id)->first();

            if ($list != null && $list->getAttributeValue('volunteer_id') != null ){
                // check if volunteer of list has the same id as the requesting user
                if (isset($request['final_sum']) && isset($request['volunteer_id'])
                    && $list->getAttributeValue('volunteer_id') == $request['volunteer_id'] ) {

                    //update list
                    $list->setAttribute('final_sum', $request['final_sum']);
                    $list->save();
                }
                else return response()->json("putting final sum failed: user is not allowed to make these changes", 420);
            }

            //get the updated list to return
            $list = $this->findById($id);

            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving commitment failed: " . $e->getMessage(), 420);
        }

    }

    /*
     * volunteer to help
     */
    public function volunteer (Request $request, int $id) : JsonResponse
    {

        $request = $this->parseRequest($request);

        //var_dump($request->all()); die();

        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {

            //get list
            $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                ->where('id', $id)->first();

            //check if list exists and has no volunteer yet
            if ( $list != null && $list->getAttributeValue('volunteer_id') == null ){
                // save volunteer
                if (isset($request['volunteer_id'])) {

                    //check if user exists
                    if ($this->findUserById($request['volunteer_id']) != null){
                        //find user in db
                        $volunteer = $this->findUserById($request['volunteer_id']);
                        $list->volunteer()->associate($volunteer);
                        $list->save();
                    }
                }
            }
            else return response()->json("saving commitment failed: user is not allowed to make these changes", 420);

            //get the updated list to return
            $list = $this->findById($id);

            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);
        } catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving commitment failed: " . $e->getMessage(), 420);
        }
    }

    /*
     * drop list - user does not want to volunteer anymore
     * set volunteer_id of list back to null
     */
    public function dropVolunteer (Request $request, int $id): JsonResponse
    {
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {

            //get list
            $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                ->where('id', $id)->first();

            //check if list exists and has a volunteer
            if ( $list != null && $list->getAttributeValue('volunteer_id') != null ){
                // check if volunteer of list has the same id as the requesting user
                if (isset($request['volunteer_id'])
                    && $list->getAttributeValue('volunteer_id') == $request['volunteer_id'] ) {

                    //update list
                    $list->setAttribute('volunteer_id', null);
                    $list->save();
                }
                else return response()->json("undoing commitment failed: user is not allowed to make these changes", 420);
            }

            //get the updated list to return
            $list = $this->findById($id);

            DB::commit();
            // return a vaild http response
            return response()->json($list, 201);

        }catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("undoing commitment failed: " . $e->getMessage(), 420);
        }
    }

    public function usersLists (Request $request): JsonResponse{

        $request = $this->parseRequest($request);
        //var_dump($request->all()); die();

        DB::beginTransaction();
        try {

            if (isset($request['user_id']) && isset($request['role'])){

                $id = $request['user_id'];
                $role = $request['role'];

                //check if user is a creator
                if ($role == 0){

                    $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                                            ->whereHas('creator', function ($query) use ($id) {
                                                $query->where('id', 'LIKE', $id);
                                            })->get();
                }
                //check if user is a volunteer
                else if ($role == 1){

                    $list = ShoppingList::with(['creator', 'creator.addresses', 'volunteer', 'volunteer.addresses', 'items', 'feedbacks', 'feedbacks.user'])
                        ->whereHas('volunteer', function ($query) use ($id) {
                            $query->where('id', 'LIKE', $id);
                        })->get();
                }
                else return response()->json("retrieving lists of this user failed", 420);
            }
            DB::commit();

            return response()->json($list, 201);

        }catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("retrieving lists of this user failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * checks if user is in db
     */
    private function checkUser(int $id) {
        return $user = User::where('id', $id)->first();
    }

    /**
     * returns user if the user exits in db
     */
    private function findUserById(int $id): User {

        if ($this->checkUser($id) != null)
            $user = User::where('id', $id)->first();
            return $user;
        return null;
    }

    /**
     * modify / convert values if needed
     */
    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->due_date);
        $request['due_date'] = $date;
        return $request;
    }
}
