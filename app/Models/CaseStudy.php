<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;

    protected $fillable = ['extension_worker_id', 'title', 'content', 'image_url'];

    public function extensionWorker()
    {
        return $this->belongsTo(User::class, 'extension_worker_id');
    }
}
