<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index()
    {
        return TodoList::with('todos')->get();
    }
 
    public function show(TodoList $todo)
    {
        return $todo;
    }

    public function store(Request $request)
    {
        $todo_list = TodoList::create($request->all());

        return response()->json($todo_list, 201);
    }

    public function update(Request $request, TodoList $todo_list)
    {
        $todo_list->update($request->all());

        return response()->json($todo_list, 200);
    }

    public function delete(Request $request, TodoList $todo_list)
    {
        foreach ($todo_list->todos() as $todo) {
            $todo->delete();
        }

        $todo_list->delete();
        return response()->json(null, 204);
    }
}
