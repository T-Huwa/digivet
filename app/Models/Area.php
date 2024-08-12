<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'district_id'];

    // Define the relationship with the District model
    public function district()
    {
        return $this->belongsTo(District::class);
    }
}
