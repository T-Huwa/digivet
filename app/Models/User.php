<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        "role",
        "district_id",
        "area_id",
    ];

    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function inventory()
    {
        return $this->hasOne(Inventory::class,);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'extension_worker_id');
    }

    public function caseStudies()
    {
        return $this->hasMany(CaseStudies::class, 'extension_worker_id');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
