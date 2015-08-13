<?php
//header("http/1.1 500 internal server error");
$code = empty($_REQUEST['code']) ? 404 : intval($_REQUEST['code']);
redirect($code);
function redirect($status = null, $exit = true) 
{
    if (is_array($status)) {
        extract($status, EXTR_OVERWRITE);
    }

    if (function_exists('session_write_close')) {
        session_write_close();
    }

    if (!empty($status)) {
        $codes = array(
        100 => 'Continue',
        101 => 'Switching Protocols',
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        307 => 'Temporary Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Time-out',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Request Entity Too Large',
        414 => 'Request-URI Too Large',
        415 => 'Unsupported Media Type',
        416 => 'Requested range not satisfiable',
        417 => 'Expectation Failed',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Time-out'
        );
        if (is_string($status)) {
            $codes = array_combine(array_values($codes), array_keys($codes));
        }

        if (isset($codes[$status])) {
                $code = $msg = $codes[$status];
            if (is_numeric($status)) {
                $code = $status;
            }
            if (is_string($status)) {
                $msg = $status;
            }
            $status = "HTTP/1.1 {$code} {$msg}";
        } else {
            $status = null;
        }
    }

    if (!empty($status)) {
        header($status);
    }

    if (!empty($status) && ($status >= 300 && $status < 400)) {
        header($status);
    }
    echo "{$code} {$msg}";
    if ($exit) {
        die;
    }
}
?>
