<?php

/**
* Area Model to make relation with province, zone, parish and soft delete.
* @param Request $request
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'name', 'zone_id', 'user_id', 'created_by'
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

    public function zones() {

        return $this->belongsTo('App\Models\Zone','zone_id');
    }

    public function users() {

        return $this->belongsTo('App\Models\User','user_id');

    }

    public function parishes() {

        return $this->hasMany('App\Models\Parish');

    }

    public function parishDel() {

        return $this->hasMany('App\Models\Parish','area_id');

    }

    protected static function boot() {

        parent::boot();

        static::deleting(function($area) {
            foreach(['parishDel'] as $relation)
            {
                foreach($area->{$relation} as $item)
                {
                    $item->delete();
                }
            }
            
            $area->users()->delete();
            
        });
    }
}
