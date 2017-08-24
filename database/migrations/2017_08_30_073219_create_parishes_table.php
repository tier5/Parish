<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parishes', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('name');
            $table->integer('user_id')
                ->unsigned()
                ->index();
            $table->integer('area_id')
                ->unsigned()
               ->index();
            $table->integer('created_by');
            $table->softDeletes();
            $table->timestamps();
             /*
             * Foreign key constraints
             */
            $table->foreign('user_id')
                ->on('users')
                ->references('id');
                
            $table->foreign('area_id')
                ->on('areas')
                ->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /** @noinspection PhpUndefinedClassInspection */
        Schema::table('parishs', function (Blueprint $table) {
            $table->dropForeign('parishs_area_id_foreign');
            $table->dropForeign('parishs_user_id_foreign');
        });
    }
}
