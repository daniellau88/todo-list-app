<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Database\Seeder;

class TodosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Todo::truncate();
        TodoList::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 3; $i++) {
            $todo_list = TodoList::create([
                'name' => $faker->sentence
            ]);
            for ($j = 0; $j < 10; $j++) {
                Todo::create([
                    'description' => $faker->sentence,
                    'is_done' => false,
                    'todo_list_id' => $todo_list["id"],
                ]);
            }
        }
    }
}
