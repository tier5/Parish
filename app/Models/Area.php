<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use SoftDeletes;

class Area extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sortname', 'name', 'zone_id', 'user_id'
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

    public function zones() {
    return $this->hasOne('App\Models\Zone');
	}

	public function users() {
    return $this->hasOne('App\Models\User');
	} 
}
