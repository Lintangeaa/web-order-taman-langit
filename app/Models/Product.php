<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        'category_id',
        'group_id'
    ];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function group()
    {
        return $this->belongsTo(ProductGroup::class);
    }
}
