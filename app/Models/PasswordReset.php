<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\PasswordReset
 *
 * @property string $email
 * @property string $token
 * @property string $created_at
 * @method static \Illuminate\Database\Query\Builder|\App\PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PasswordReset whereToken($value)
 * @mixin \Eloquent
 */
class PasswordReset extends Model
{
    protected $fillable=[
        'email','password'
    ];
    public $timestamps = false;
}
