<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingList extends Model
{
    protected $fillable = [
        'due_date', 'final_sum', 'creator_id'
    ];

    /*
     * n:1 users - creator
     */
    public function creator() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /*
     * n:1 users - volunteer
     */
    public function volunteer() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /*
     * 1:n items
     */
    public function items() : HasMany {
        return $this->hasMany(Item::class);
    }

    /*
     * 1:n feedbacks
     */
    public function feedbacks() : HasMany {
        return $this->hasMany(Feedback::class);
    }
}
