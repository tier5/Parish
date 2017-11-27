<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableWemPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wem_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('wem_id')
                  ->unsigned()
                  ->index();
            $table->foreign('wem_id')
                  ->on('users')
                  ->references('id');   
            $table->integer('parish_user_id')
                  ->unsigned()
                  ->index();   
            $table->string('name');
            $table->string('stripe_id')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('card_last_four')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('wem_payments');
    }
}
