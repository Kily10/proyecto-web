<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
     protected $table = 'historial';

    protected $fillable = [
        'user_id',
        'accion'
    ];
}
