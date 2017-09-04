<?php

/**
* Province Model for WEM and Pastor with soft delete
* @param Request $request
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provience extends Model
{

    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'name', 'user_id'
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

    public function zoneDel() {
        return $this->hasMany('App\Models\Zone','provience_id');
	}

    public function zones() {
        return $this->hasMany('App\Models\Zone');
    }

	public function users() {
        return $this->belongsTo('App\Models\User','user_id');
	}

    /**
     * Get all of the area for the Province.
     */
    
    public function areas() {
        return $this->hasManyThrough('App\Models\Area', 'App\Models\Zone');
    }

    /**
     * Get all of the area for the Province.
     */
    
    public function parishes() {
        $parishes = collect();
        foreach ($this->areas as $area) {
            $parishes = $area->parishes;
        }
        return $parishes;
    }

    /**
     * Delete functionality bewteen related models
     */

    protected static function boot() {
       parent::boot();
        static::deleting(function($province) {
            foreach(['zoneDel'] as $relation)
            {
                foreach($province->{$relation} as $item)
                {
                    $item->delete();
                }
            }
            $province->users()->delete();
        });
    }    
}
