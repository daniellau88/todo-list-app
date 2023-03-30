<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index($todo_list_id)
    {
        return format_json_response(['items' => Todo::where('todo_list_id', $todo_list_id)->get()]);
    }
 
    public function show($todo_list_id, $id)
    {
        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        return format_json_response($todo);
    }

    public function store(Request $request, $todo_list_id)
    {
        $data = $request->all();
        $data['todo_list_id'] = $todo_list_id;
        $data['is_done'] = false;
        $todo = Todo::create($data);

        return format_json_response($todo, ['Todo added']);
    }

    public function update(Request $request, $todo_list_id, $id)
    {
        $data = $request->all();
        $data['todo_list_id'] = $todo_list_id;

        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);;
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->update($data);

        return format_json_response($todo, ['Todo updated']);
    }

    public function delete(Request $request, $todo_list_id, $id)
    {
        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);;
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->delete();

        return format_json_response($todo, ['Todo deleted']);
    }
}
