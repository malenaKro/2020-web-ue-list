<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Feedback extends Model
{
    protected $fillable = [
        'feedback_text', 'shopping_list_id', 'user_id'
    ];

    /*
     * n:1 user
     */
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /*
     * n:1 shoppinglist
     */
    public function shoppinglist() : BelongsTo {
        return $this->belongsTo(ShoppingList::class);
    }
}
