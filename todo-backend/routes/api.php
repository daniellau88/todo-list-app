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


Route::prefix('todos')->group(function () {
    Route::get('', [TodoController::class, 'index']);
    Route::get('/{todo}', [TodoController::class, 'show']);
    Route::post('', [TodoController::class, 'store']);
    Route::put('/{todo}', [TodoController::class, 'update']);
    Route::delete('/{todo}', [TodoController::class, 'delete']);
});


Route::prefix('todo_lists')->group(function () {
    Route::get('', [TodoListController::class, 'index']);
    Route::get('/{todo_list}', [TodoListController::class, 'show']);
    Route::post('', [TodoListController::class, 'store']);
    Route::put('/{todo_list}', [TodoListController::class, 'update']);
    Route::delete('/{todo_list}', [TodoListController::class, 'delete']);
});
