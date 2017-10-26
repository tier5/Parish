<?php

/**
* Payment Model to calculate pastor payment detail
* @param Request $request
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'file_name', 'wem_id', 'created_by'
    ];

    public $timestamps = true;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */

    protected $dates = ['deleted_at'];

    /**
     * Bind user model field with bcrypt encryption
     *
     * @param $wem_id
     */ 

	public function parish() {

        return $this->belongsTo('App\Models\Parish','user_id');
    }


    public function proviences() {

        return $this->belongsTo('App\Models\Provience', 'user_id');

    }

    public function zones() {

        return $this->belongsTo('App\Models\Zones', 'user_id');

    }

    public function areas() {

        return $this->belongsTo('App\Models\Areas', 'user_id');

    }

    public function user() {

        return $this->belongsTo('App\Models\User');
    }
}
