<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateParishesTableAddPaymentStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('parishes', function (Blueprint $table) {
            $table->boolean('payment_status')
                ->comment('0 => NOT PAID, 1 =>  PAID ,2 NOT PAID AFTER DUE DATE')
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
            $table->dropColumn('payment_status');
        });
    }
}
