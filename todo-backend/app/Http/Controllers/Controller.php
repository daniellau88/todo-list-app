<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\OpenApi(
 *  @OA\Info(
 *    title="Todo List API",
 *    version="1.0.0",
 *    description="API documentation for Todo List App",
 *    @OA\Contact(
 *      email="danielau88@gmail.com"
 *    )
 *  ),
 *  @OA\Server(
 *    description="Todo List API",
 *    url="https://todo.dlau.one/api/"
 *  ),
 * )
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
