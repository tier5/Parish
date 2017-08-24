<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProviencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proviences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_id')
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
        Schema::table('proviences', function (Blueprint $table) {
            $table->dropForeign('proviences_user_id_foreign');
        });
    }
}
