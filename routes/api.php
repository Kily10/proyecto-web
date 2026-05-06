<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Models\Historial;

// 🔥 AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// 🔥 CURSOS
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);

// 🔥 HISTORIAL (OBTENER POR USUARIO)
Route::get('/historial/{id}', function ($id) {
    return response()->json(
        Historial::where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
    );
});

// 🔥 HISTORIAL (GUARDAR ACCIONES)
Route::post('/historial', function (Request $request) {

    if (!$request->user_id || !$request->accion) {
        return response()->json(['error' => 'Datos incompletos'], 400);
    }

    $historial = Historial::create([
        'user_id' => $request->user_id,
        'accion' => $request->accion
    ]);

    return response()->json($historial, 201);
});

// 🔧 TEST
Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});