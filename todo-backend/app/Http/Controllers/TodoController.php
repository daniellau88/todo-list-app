<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return format_json_response(['items' => Todo::all()]);
    }
 
    public function show($id)
    {
        $todo = Todo::find($id);
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        return format_json_response($todo);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());

        return format_json_response($todo, ['Todo added']);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->update($request->all());

        return format_json_response($todo, ['Todo updated']);
    }

    public function delete(Request $request, $id)
    {
        $todo = Todo::find($id);
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->delete();

        return format_json_response($todo, ['Todo deleted']);
    }
}
