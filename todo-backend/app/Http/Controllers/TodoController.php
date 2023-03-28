<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return format_json_response(['items' => Todo::all()]);
    }
 
    public function show(Todo $todo)
    {
        return format_json_response($todo);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());

        return format_json_response($todo, ['Todo added']);
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update($request->all());

        return format_json_response($todo, ['Todo updated']);
    }

    public function delete(Request $request, Todo $todo)
    {
        $todo->delete();

        return format_json_response($todo, ['Todo deleted']);
    }
}
