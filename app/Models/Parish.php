<?php

/**
* Parish Model to make relation with area and soft delete.
* @param Request $request
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parish extends Model
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'name', 'area_id', 'user_id'
    ];

    public $timestamps = true;

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

        return $this->belongsTo('App\Models\Area','area_id');
	}

	public function users() {

        return $this->belongsTo('App\Models\User','user_id');
	}
    
    protected static function boot() {

        parent::boot();

        static::deleting(function($parish) {

            $parish->users()->delete();
        });
    }
}
