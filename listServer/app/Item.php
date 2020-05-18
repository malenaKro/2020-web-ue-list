<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = [
        'name', 'amount', 'max_price', 'shopping_list_id'
    ];

    /*
     * n:1 shoppinglists
     */
    public function shoppinglist() : BelongsTo {
        return $this->belongsTo(ShoppingList::class);
    }
}
