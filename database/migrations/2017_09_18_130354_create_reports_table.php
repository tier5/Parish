<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parish_id')
                ->unsigned()
                ->index();
            $table->integer('report_month')
                ->unsigned();
            $table->integer('report_year')
                ->unsigned();
            $table->longText('progress_report');
            $table->softDeletes();
            $table->timestamps();

            /*
            * Foreign key constraints
            */
            $table->foreign('parish_id')
                ->on('parishes')
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
        Schema::table('reports', function (Blueprint $table) {
            $table->dropForeign('reports_parish_id_foreign');
        });
    }
}
