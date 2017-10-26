<?php
/**
* User Model for WEM and Pastor with soft delete
* @param Request $request
*/
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable{
    //

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'user_type', 'pastor_type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];


    protected $softDelete = true;

    /**
     * Bind password field with bcrypt encryption
     *
     * @param $password
     */
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function payments() {

        return $this->hasMany('App\Models\Payment','created_by');
    }

    protected static function boot() {

        parent::boot();

        static::deleting(function($user) {
            $user->payments()->delete();
            
        });
    }
}
