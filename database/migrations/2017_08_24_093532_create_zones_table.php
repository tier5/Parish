<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_id')
                ->unsigned()
                ->index();
            $table->integer('provience_id')
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
                
            $table->foreign('provience_id')
                ->on('proviences')
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
        Schema::table('zones', function (Blueprint $table) {
            $table->dropForeign('zones_provience_id_foreign');
            $table->dropForeign('zones_user_id_foreign');
        });
    }
}
