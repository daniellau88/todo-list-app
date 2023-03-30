<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index()
    {
        return format_json_response(['items' => TodoList::orderBy('id', 'desc')->get()]);
    }
 
    public function show($id)
    {
        $todo_list = TodoList::with('todos')->find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);
        return format_json_response($todo_list);
    }

    public function store(Request $request)
    {
        $todo_list = TodoList::create($request->all());

        return format_json_response($todo_list, ['Todolist added']);
    }

    public function update(Request $request, $id)
    {
        $todo_list = TodoList::find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);
        $todo_list->update($request->all());

        return format_json_response($todo_list, ['Todolist updated']);
    }

    public function delete(Request $request, $id)
    {
        $todo_list = TodoList::find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);

        foreach ($todo_list->todos() as $todo) {
            $todo->delete();
        }

        $todo_list->delete();
        return format_json_response($todo_list, ['Todolist deleted']);
    }
}
