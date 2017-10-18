<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zone extends Model
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'name', 'provience_id', 'user_id'
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

    public function areas() {
    return $this->hasMany('App\Models\Area');
    }

    public function areaDel() {
        return $this->hasMany('App\Models\Area','zone_id');
    }

    public function proviences() {
        return $this->belongsTo('App\Models\Provience', 'provience_id');
    } 

    public function users() {
        return $this->belongsTo('App\Models\User','user_id');
    }

    /**
     * Delete functionality bewteen related models
     */
    
    protected static function boot() {
        parent::boot();

        static::deleting(function($zone) {
            foreach(['areaDel'] as $relation)
            {
                foreach($zone->{$relation} as $item)
                {
                    $item->delete();
                }
            }
            $zone->users()->delete();
            
        });
    } 
}