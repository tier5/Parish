<?php 

/**
* Generate random number to make random pastor username and password
* @param Request $request
*/
public function generateNumber() {

		$length = 8;

		$randomNumber = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

		return $randomNumber;

	}