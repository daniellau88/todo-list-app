<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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

        $todo_list = TodoList::find($todo_list_id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todo list'], ResponseStatus::NotFound);

        $todo = Todo::create($data);

        $todo_list->touch();

        return format_json_response($todo, ['Todo added']);
    }

    public function update(Request $request, $todo_list_id, $id)
    {
        $data = $request->all();
        $data['todo_list_id'] = $todo_list_id;

        $todo_list = TodoList::find($todo_list_id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todo list'], ResponseStatus::NotFound);

        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);;
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->update($data);

        $todo_list->touch();

        return format_json_response($todo, ['Todo updated']);
    }

    public function delete(Request $request, $todo_list_id, $id)
    {
        $todo_list = TodoList::find($todo_list_id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todo list'], ResponseStatus::NotFound);

        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);;
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        $todo->delete();

        $todo_list->touch();

        return format_json_response($todo, ['Todo deleted']);
    }
}
