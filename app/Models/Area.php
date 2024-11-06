<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'district_id'];

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function farmers()
    {
        return $this->hasMany(User::class, 'area_id')
                    ->where('role', 'Farmer');
    }

    public function extensionOfficer()
    {
        return $this->hasOne(User::class, 'area_id')
                    ->where('role', 'Extension Worker')
                    ->where('area_id', $this->id);
    }
}
