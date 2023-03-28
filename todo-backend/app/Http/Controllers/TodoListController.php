<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index()
    {
        return format_json_response(['items' => TodoList::with('todos')->get()]);
    }
 
    public function show(TodoList $todo)
    {
        return format_json_response($todo);
    }

    public function store(Request $request)
    {
        $todo_list = TodoList::create($request->all());

        return format_json_response($todo_list, ['Todolist added']);
    }

    public function update(Request $request, TodoList $todo_list)
    {
        $todo_list->update($request->all());

        return format_json_response($todo_list, ['Todolist updated']);
    }

    public function delete(Request $request, TodoList $todo_list)
    {
        foreach ($todo_list->todos() as $todo) {
            $todo->delete();
        }

        $todo_list->delete();
        return format_json_response($todo_list, ['Todolist deleted']);
    }
}
