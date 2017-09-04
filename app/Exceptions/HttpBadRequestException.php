<?php
/**
* HttpBadRequestException method use to hand API Route Exception for 400, 500 etc
*/

namespace App\Exceptions;

use Exception;
use Throwable;

/**
 * Handle API Route Exception for 400, 500 etc
 */

class HttpBadRequestException extends Exception
{
    protected $code;
    protected $message;
    public $errorInfo;

    public function __construct($message = "", $code = 400, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function setCode($code = 400)
    {
        $this->code = $code;
    }

    /**
     * @param mixed $message
     */
    public function setMessage($message)
    {
        $this->message = $message;
    }
}