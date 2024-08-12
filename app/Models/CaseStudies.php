<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudies extends Model
{
    use HasFactory;

    protected $fillable = ['extension_worker_id', 'title', 'content'];

    public function extensionWorker()
    {
        return $this->belongsTo(User::class, 'extension_worker_id');
    }
}
