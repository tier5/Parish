<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateParishesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parishes', function (Blueprint $table) {
           $table->date('due_date')->nullable();
           $table->boolean('penalty')
                ->comment('0 => PENALTY, 1 => NO PENALTY')
                ->default('0');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('parishes', function($table) {
          $table->dropColumn('penalty');
          $table->dropColumn('due_date');
        });
    }
}
