<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\TodoListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('todos', [TodoController::class, 'index']);
Route::get('todos/{todo}', [TodoController::class, 'show']);
Route::post('todos', [TodoController::class, 'store']);
Route::put('todos/{todo}', [TodoController::class, 'update']);
Route::delete('todos/{todo}', [TodoController::class, 'delete']);

Route::get('todo_lists', [TodoListController::class, 'index']);
Route::get('todo_lists/{todo_list}', [TodoListController::class, 'show']);
Route::post('todo_lists', [TodoListController::class, 'store']);
Route::put('todo_lists/{todo_list}', [TodoListController::class, 'update']);
Route::delete('todo_lists/{todo_list}', [TodoListController::class, 'delete']);
