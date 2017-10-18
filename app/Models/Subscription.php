<?php
/**
* Subscription Model for WEM and Pastor with soft delete
* @param Request $request
*/
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Cashier\Billable;

class Subscription extends Authenticatable{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

        'user_id','name', 'stripe_id', 'stripe_plan','quantity','trial_ends_at','ends_at'
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
