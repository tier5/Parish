<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id'); 
            $table->integer('wem_id')
                ->unsigned()
                ->index();
            $table->string('file_name')->nullable();
            $table->text('payment_description')->nullable();
            $table->integer('upload_month')
                ->unsigned();
            $table->integer('upload_year')
                ->unsigned();
            $table->boolean('payment_status')
                ->comment('0 => APPROVED, 1 => REJECTED, 3 => ON HOLD')
                ->default('3');
            $table->integer('created_by')
                ->unsigned();
            $table->softDeletes();
            $table->timestamps();

            /*
            * Foreign key constraints
            */
            $table->foreign('wem_id')
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
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign('payments_created_by_foreign');
        });
    }
}
