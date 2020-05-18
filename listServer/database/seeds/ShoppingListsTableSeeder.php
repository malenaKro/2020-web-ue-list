<?php

use Illuminate\Database\Seeder;

class ShoppingListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $list = new \App\ShoppingList;

        $creator = App\User::all()->first();
        //add relation
        $list->creator()->associate($creator);

        $volunteer = App\User::all()->find(2);
        //add relation
        $list->volunteer()->associate($volunteer);

        $list->due_date = new DateTime('2020-04-30');
        $list->final_sum = 37.50;

        $list->save();

        $item1 = new \App\Item;
        $item1->name = 'Milch 1l';
        $item1->amount = 2;
        $item1->max_price = 1.50;

        $item2 = new \App\Item;
        $item2->name = 'Eier 10 Stk.';
        $item2->amount = 1;
        $item2->max_price = 3.70;

        $item3 = new \App\Item;
        $item3->name = 'Butter 250g';
        $item3->amount = 1;
        $item3->max_price = 2.30;

        $list->items()->saveMany([
            $item1, $item2, $item3
        ]);

        $list->save();

        $feedback1 = new \App\Feedback;
        $feedback1->user()->associate($volunteer);
        $feedback1->feedback_text = 'Ich versuche das so bald wie möglich zu besorgen und Ihnen vor die Haustür zu stellen!';

        $feedback2 = new \App\Feedback;
        $feedback2->user()->associate($creator);
        $feedback2->feedback_text = 'Vielen Dank für die rasche Hilfe!';

        $list->feedbacks()->saveMany([
            $feedback1, $feedback2
        ]);

        $list->save();
    }
}
