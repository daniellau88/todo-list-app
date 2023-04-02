<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ResponseStatus;
use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * @OA\Get(path="/todo_lists/{todo_list_id}/todos",
     *   tags={"todo"},
     *   summary="Returns all todos for a particular todo list",
     *   description="Returns all todos for a particular todo list",
     *   operationId="getTodoListTodos",
     *   parameters={
     *     @OA\Parameter(
     *       name="todo_list_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     )
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
    public function index($todo_list_id)
    {
        return format_json_response(['items' => Todo::where('todo_list_id', $todo_list_id)->get()]);
    }
 
    /**
     * @OA\Get(path="/todo_lists/{todo_list_id}/todos/{todo_id}",
     *   tags={"todo"},
     *   summary="Returns the queried todo for the particular todo list",
     *   description="Returns the queried todo for the particular todo list",
     *   operationId="getTodoListTodo",
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
     *     @OA\Parameter(
     *       name="todo_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     )
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
    public function show($todo_list_id, $id)
    {
        $todo = Todo::where('todo_list_id', $todo_list_id)->find($id);
        if (is_null($todo)) return format_json_response((object)[], ['Cannot find todo'], ResponseStatus::NotFound);
        return format_json_response($todo);
    }

    /**
     * @OA\Post(path="/todo_lists/{todo_list_id}/todos",
     *   tags={"todo"},
     *   summary="Creates a new todo for given todo list",
     *   description="Creates a new todo for given todo list",
     *   operationId="createTodoListTodo",
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
     *     required=true,
     *     description="new todo to create",
     *     @OA\JsonContent(ref="#/components/schemas/Todo")
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
    public function store(Request $request, $todo_list_id)
    {
        $data = $request->all();
        $data['todo_list_id'] = (int)$todo_list_id;
        $data['is_done'] = false;

        $todo_list = TodoList::find($todo_list_id);
        if (is_null($todo_list)) return format_json_response((object)[], ['Cannot find todo list'], ResponseStatus::NotFound);

        $todo = Todo::create($data);

        $todo_list->touch();

        return format_json_response($todo, ['Todo added']);
    }

    /**
     * @OA\Put(path="/todo_lists/{todo_list_id}/todos/{todo_id}",
     *   tags={"todo"},
     *   summary="Updates information on existing todos for given todo list",
     *   description="Updates information on existing todos for given todo list",
     *   operationId="updateTodoListTodo",
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
     *     @OA\Parameter(
     *       name="todo_id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(
     *         type="integer",
     *         format="int32"
     *       )
     *     ),
     *   },
     *   @OA\RequestBody(
     *     description="todo to update",
     *     @OA\JsonContent(ref="#/components/schemas/Todo")
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

    /**
     * @OA\Delete(path="/todo_lists/{todo_list_id}/todos/{todo_id}",
     *   tags={"todo"},
     *   summary="Deletes an existing todo for given todo list",
     *   description="Deletes an existing todo for given todo list",
     *   operationId="deleteTodoListTodo",
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
     *     @OA\Parameter(
     *       name="todo_id",
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
