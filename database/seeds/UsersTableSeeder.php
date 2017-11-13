<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['parish_id' => NULL,'first_name' => 'Super Admin','last_name' => '','user_type' =>0,'pastor_type'=>0,'user_status'=>1,'email'=>'superadmin@gmail.com','password'=>bcrypt('12345678'),'uniqueKey'=>Crypt::encrypt('12345678'),'remember_token'=>NULL,'deleted_at'=>NULL,'created_at'=>Date('Y-m-d')]
        ]);
    }
}
