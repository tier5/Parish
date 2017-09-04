<?php 
public function generateNumber() {

		$length = 8;

		$randomNumber = substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), 0, $length);

		return $randomNumber;

	}