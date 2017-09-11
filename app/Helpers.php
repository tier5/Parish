<?php
/**
* Helper file with static method generateNumber to generate random number
* @param Request $request
*/
namespace App;

class Helpers {

    /**
    * Generate Random username and password
    *
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */

  public static function generateNumber() {
     $length = 8;

        $randomNumber = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

        return $randomNumber;
  }

}
