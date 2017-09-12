<?php
/**
* Moddleware to generate and check JWT token
* @param Request $request
*/
namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class VerifyJWTToken extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$token = $this->auth->setRequest($request)->getToken()) {
            return  response()->json([
                'status'    => false,
                'error'     => 'Token is not provided.'
            ], 400);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $tokenExpiredException) {
            return response()->json([
                'status'        => false,
                'error'         => 'Unauthorized! Token is expired.',
                'error_info'    => $tokenExpiredException->getMessage()
            ], $tokenExpiredException->getStatusCode());
        } catch (JWTException $JWTException) {
            return response()->json([
                'status'        => false,
                'error'         => 'Unauthorized! Token is invalid.',
                'error_info'    => $JWTException->getMessage()
            ], $JWTException->getStatusCode());
        }

        if (!$user) {
            response()->json([
                'status'    => false,
                'error'     => 'No user found.'
            ], 404);
        }

        /** @noinspection PhpUndefinedMethodInspection */
        $this->events->fire('tymon.jwt.valid', $user);

        return $next($request);
    }
}
