<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{
    protected $fillable = [
        'user_id',
        'plan',
        'inicio',
        'fin'
    ];
}