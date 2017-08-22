<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return mixed
     */
    public function render($request, Exception $exception)
    {
        /*
         * Handle API Route Exception with JSON Response
         */
        if ($request->is('api/*')) {
            /*
             * API Route Not Found Exception Response
             */
            if ($exception instanceOf NotFoundHttpException) {
                return response()->json([
                    'status' => false,
                    'error' => "Requested API endpoint not found."
                ], 404);
            }
            /*
             * API Method Not Allowed Exception Response
             */
            if ($exception instanceOf MethodNotAllowedException) {
                return response()->json([
                    'status' => false,
                    'error' => $exception->getMessage() ?
                        $exception->getMessage() : $request->method() . " method is not allowed."
                ], 405);
            }
        }

        return parent::render($request, $exception);
    }

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'status' => false,
                'error' => "Unauthenticated."
            ], 401);
        }

        return redirect()->guest(route('login'));
    }
}
