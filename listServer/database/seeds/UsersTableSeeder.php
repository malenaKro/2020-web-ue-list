<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = new \App\User;
        $user1->role = 0;
        $user1->firstname = 'Herbert';
        $user1->lastname = 'Bauer';
        $user1->email = 'test1@test.at';
        $user1->password = bcrypt('secret');

        $user1->save();

        //address of user 1
        $address1 = new \App\Address;
        $address1->street = 'Ferihumerstraße';
        $address1->number = '8';
        $address1->postcode = '4040';
        $address1->location = 'Linz';

        $address1->save();

        //address synced to user
        $user1->addresses()->saveMany([$address1]);

        $user2 = new \App\User;
        $user2->role = 1;
        $user2->firstname = 'Lisa';
        $user2->lastname = 'Lustig';
        $user2->email = 'test2@test.at';
        $user2->password = bcrypt('secret');

        $user2->save();

        //address of user 2
        $address2 = new \App\Address;
        $address2->street = 'Rudolfstraße';
        $address2->number = '23';
        $address2->postcode = '4040';
        $address2->location = 'Linz';

        $address2->save();

        //address synced to user
        $user2->addresses()->saveMany([$address2]);

        $user3 = new \App\User;
        $user3->role = 0;
        $user3->firstname = 'Elfriede';
        $user3->lastname = 'Huber';
        $user3->email = 'test3@test.at';
        $user3->password = bcrypt('secret');

        $user3->save();

        //address of user 3
        $address3 = new \App\Address;
        $address3->street = 'Auf dem Haselbachfeld';
        $address3->number = '7';
        $address3->postcode = '5280';
        $address3->location = 'Braunau am Inn';

        $address3->save();

        //address synced to user
        $user3->addresses()->saveMany([$address3]);

        $user4 = new \App\User;
        $user4->role = 0;
        $user4->firstname = 'Henriette';
        $user4->lastname = 'Maier';
        $user4->email = 'test4@test.at';
        $user4->password = bcrypt('secret');

        $user4->save();

        //address of user 4
        $address4 = new \App\Address;
        $address4->street = 'Softwarepark';
        $address4->number = '23';
        $address4->postcode = '4232';
        $address4->location = 'Hagenberg im Mühlkreis';

        $address4->save();

        //address synced to user
        $user4->addresses()->saveMany([$address4]);

        $user5 = new \App\User;
        $user5->role = 1;
        $user5->firstname = 'Nina';
        $user5->lastname = 'Pettringer';
        $user5->email = 'test5@test.at';
        $user5->password = bcrypt('secret');

        $user5->save();

        //address of user 5
        $address5 = new \App\Address;
        $address5->street = 'Softwarepark';
        $address5->number = '45';
        $address5->postcode = '4232';
        $address5->location = 'Hagenberg im Mühlkreis';

        $address5->save();

        //address synced to user
        $user5->addresses()->saveMany([$address5]);

        $user6 = new \App\User;
        $user6->role = 1;
        $user6->firstname = 'Sebastian';
        $user6->lastname = 'Blom';
        $user6->email = 'test6@test.at';
        $user6->password = bcrypt('secret');

        $user6->save();

        //address of user 6
        $address6 = new \App\Address;
        $address6->street = 'Teichstraße';
        $address6->number = '5';
        $address6->postcode = '5280';
        $address6->location = 'Braunau am Inn';

        $address6->save();

        //address synced to user
        $user6->addresses()->saveMany([$address6]);

        $user7 = new \App\User;
        $user7->role = 1;
        $user7->firstname = 'Fabian';
        $user7->lastname = 'Timber';
        $user7->email = 'test7@test.at';
        $user7->password = bcrypt('secret');

        $user7->save();

        //address of user 7
        $address7 = new \App\Address;
        $address7->street = 'Raitfeldstraße';
        $address7->number = '47';
        $address7->postcode = '5280';
        $address7->location = 'Braunau am Inn';

        $address7->save();

        //address synced to user
        $user7->addresses()->saveMany([$address7]);


    }
}
