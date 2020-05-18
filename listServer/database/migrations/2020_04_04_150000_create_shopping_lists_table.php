<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopping_lists', function( Blueprint $table ){
            $table->bigIncrements( 'id' );

            $table->bigInteger( 'creator_id' )->unsigned()->nullable();

            $table->foreign('creator_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->bigInteger( 'volunteer_id' )->unsigned()->nullable();

            $table->foreign('volunteer_id')
                ->references('id')->on('users');

            $table->date( 'due_date' );
            $table->float( 'final_sum' )->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopping_lists');
    }
}
