<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Historial;
use App\Http\Controllers\CursoController;

// 🔥 AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);

// 🔥 HISTORIAL POR USUARIO
Route::get('/historial/{id}', function ($id) {
    return response()->json(
        Historial::where('user_id', $id)->orderBy('created_at', 'desc')->get()
    );
});

// 🔥 GUARDAR ACCIONES (CURSOS / PLANES)
Route::post('/historial', function (Request $request) {
    return response()->json(
        Historial::create([
            'user_id' => $request->user_id,
            'accion' => $request->accion
        ])
    );
});

// 🔧 TEST
Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});