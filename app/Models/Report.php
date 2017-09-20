<?php

/**
* Report Model to calculate pastor payment detail
* @param Request $request
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{

    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'report_month', 'report_year', 'progress_report'
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

}
