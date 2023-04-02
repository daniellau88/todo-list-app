<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema()
 */
class Todo extends Model
{
    use HasFactory;
    protected $fillable = ['description', 'is_done', 'todo_list_id'];

    /**
     * @OA\Property(format="int32")
     *
     * @var int
     */
    public $id;

    /**
     * @OA\Property(format="string")
     *
     * @var string
     */
    public $description;

    /**
     * @OA\Property(format="string")
     *
     * @var boolean
     */
    public $is_done;

    /**
     * @OA\Property(format="int32")
     *
     * @var int
     */
    public $todo_list_id;
}
