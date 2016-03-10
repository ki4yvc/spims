<?php

use Illuminate\Database\Seeder;

class user_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
          'name' => 'admin',
          'email' => 'admin@gmail.com',
          'password' => bcrypt('admin'),
          // 'password' => bcrypt('4dm1nc4mp0ld1nd14n'),
          'type' => 'admin'
          // 'password' => bcrypt('secret'),
      ]);
    }
}
