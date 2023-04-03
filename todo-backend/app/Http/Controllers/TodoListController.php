<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    /**
     * @OA\Get(path="/todo_lists",
     *   tags={"todo_list"},
     *   summary="Returns all todo lists",
     *   description="Returns all todo lists",
     *   operationId="getTodoLists",
     *   @OA\Response(
     *     response=200,
     *     description="successful operation",
     *     @OA\Schema(
     *       additionalProperties={
     *         "type": "integer",
     *         "format": "int32"
     *       }
     *     )
     *   )
     * )
     */
    public function index()
    {
        return format_json_response(['items' => TodoList::withCount('todos')->orderBy('id', 'desc')->get()]);
    }
 
    /**
     * @OA\Get(path="/todo_lists/{todo_list_id}",
     *   tags={"todo_list"},
     *   summary="Returns the queried todo list",
     *   description="Returns the queried todo list",
     *   operationId="getTodoList",
     *   parameters={
     *     @OA\Parameter(
     *       name="todo_list_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     ),
     *   },
     *   @OA\Response(
     *     response=200,
     *     description="successful operation",
     *     @OA\Schema(
     *       additionalProperties={
     *         "type": "integer",
     *         "format": "int32"
     *       }
     *     )
     *   )
     * )
     */
    public function show($id)
    {
        $todo_list = TodoList::withCount('todos')->find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);
        return format_json_response($todo_list);
    }

    /**
     * @OA\Post(path="/todo_lists",
     *   tags={"todo_list"},
     *   summary="Creates new todo list",
     *   description="Creates new todo list",
     *   operationId="createTodoList",
     *   @OA\RequestBody(
     *     required=true,
     *     description="new todo list to create",
     *     @OA\JsonContent(ref="#/components/schemas/TodoList")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="successful operation",
     *     @OA\Schema(
     *       additionalProperties={
     *         "type": "integer",
     *         "format": "int32"
     *       }
     *     )
     *   )
     * )
     */
    public function store(Request $request)
    {
        $todo_list = TodoList::create($request->all());
        $todo_list['todos_count'] = 0;

        return format_json_response($todo_list, ['Todolist added']);
    }

    /**
     * @OA\Put(path="/todo_lists/{todo_list_id}",
     *   tags={"todo_list"},
     *   summary="Updates information on existing todo list",
     *   description="Updates information on existing todo list",
     *   operationId="updateTodoList",
     *   parameters={
     *     @OA\Parameter(
     *       name="todo_list_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     ),
     *   },
     *   @OA\RequestBody(
     *     description="todo list to update",
     *     @OA\JsonContent(ref="#/components/schemas/TodoList")
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="successful operation",
     *     @OA\Schema(
     *       additionalProperties={
     *         "type": "integer",
     *         "format": "int32"
     *       }
     *     )
     *   )
     * )
     */
    public function update(Request $request, $id)
    {
        $todo_list = TodoList::withCount('todos')->find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);
        $todo_list->update($request->all());

        return format_json_response($todo_list, ['Todolist updated']);
    }

    /**
     * @OA\Delete(path="/todo_lists/{todo_list_id}",
     *   tags={"todo_list"},
     *   summary="Deletes an existing todo list",
     *   description="Deletes an existing todo list",
     *   operationId="deleteTodoList",
     *   parameters={
     *     @OA\Parameter(
     *       name="todo_list_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     ),
     *   },
     *   @OA\Response(
     *     response=200,
     *     description="successful operation",
     *     @OA\Schema(
     *       additionalProperties={
     *         "type": "integer",
     *         "format": "int32"
     *       }
     *     )
     *   )
     * )
     */
    public function delete(Request $request, $id)
    {
        $todo_list = TodoList::withCount('todos')->find($id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todolist'], ResponseStatus::NotFound);

        foreach ($todo_list->todos() as $todo) {
            $todo->delete();
        }

        $todo_list->delete();
        return format_json_response($todo_list, ['Todolist deleted']);
    }
}
