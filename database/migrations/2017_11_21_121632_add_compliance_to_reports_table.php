<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddComplianceToReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reports', function (Blueprint $table) {
           $table->integer('compliance')
                ->default(3)
                ->comment('0 => NON COMPLIANCE, 1 => COMPLIANCE, 3 => HOLD');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reports', function($table) {
          $table->dropColumn('compliance');
        });
    }
}
