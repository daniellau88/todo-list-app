<?php

namespace App\Http\Helpers;

enum ResponseStatus: int
{
    case Success = 0;
    case NotFound = 1;
}

?>
