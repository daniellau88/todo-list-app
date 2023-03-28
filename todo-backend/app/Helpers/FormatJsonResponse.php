<?php

use App\Http\Helpers\ResponseStatus;

if (!function_exists('format_json_response')) {
    function format_json_response($payload, $messages = [], $status = ResponseStatus::Success) {
        return (object) [
            'messages' => $messages,
            'payload' => $payload,
            'status' => $status,
        ];
    }
}

?>
