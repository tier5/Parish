<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use SoftDeletes;

class Zone extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sortname', 'name', 'provience_id', 'user_id'
    ];


   /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */

    protected $dates = ['deleted_at'];

    /**
     * Bind password field with bcrypt encryption
     *
     * @param $password
     */ 

    public function areas() {
    return $this->hasMany('App\Models\Area');
	}

	public function proviences() {
    return $this->hasOne('App\Models\Provience');
	} 

	public function users() {
    return $this->hasOne('App\Models\User');
	} 
}
