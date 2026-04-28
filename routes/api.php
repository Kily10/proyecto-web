<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Historial;

// LOGIN
Route::post('/login', [AuthController::class, 'login']);


Route::get('/historial/{id}', function ($id) {
    return Historial::where('user_id', $id)->get();
});