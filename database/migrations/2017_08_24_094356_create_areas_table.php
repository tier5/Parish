<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('user_id')
                ->unsigned()
                ->index();
            $table->integer('zone_id')
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
                ->references('id')
                ->onDelete('cascade');
                
            $table->foreign('zone_id')
                ->on('zones')
                ->references('id')
                ->onDelete('cascade');
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
        Schema::table('areas', function (Blueprint $table) {
            $table->dropForeign('areas_zone_id_foreign');
            $table->dropForeign('areas_user_id_foreign');
        });
    }
}
