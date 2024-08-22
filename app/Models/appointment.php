<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class appointment extends Model
{
    use HasFactory;

    protected $fillable = ['farmer_id', 'extension_worker_id','area_id', 'appointment_date', 'description', 'status'];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    public function extensionWorker()
    {
        return $this->belongsTo(User::class, 'extension_worker_id');
    }

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }
}
