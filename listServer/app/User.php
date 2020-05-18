<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role', 'firstname', 'lastname', 'email', 'password'
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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /*
     * n:m addresses
     */
    public function addresses() : BelongsToMany {
        return $this->belongsToMany(Address::class)->withTimestamps();
    }
    /*
     * 1:n shoppinglists - creator
     */
    public function shoppinglists_c() : HasMany {
        return $this->hasMany(ShoppingList::class);
    }
    /*
     * 1:n shoppinglists - volunteer
     */
    public function shoppinglists_v() : HasMany {
        return $this->hasMany(ShoppingList::class);
    }
    /*
     * 1:n feedbacks
     */
    public function feedbacks() : HasMany {
        return $this->hasMany(Feedback::class);
    }

    /* ---- auth JWT ---- */
    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id, 'role' => $this->role]];
    }
}
