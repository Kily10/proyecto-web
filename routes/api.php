<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Models\Historial;
use App\Models\Suscripcion;

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

// 🔥 SUSCRIPCIONES (CREAR)
Route::post('/suscripcion', function (Request $request) {

    if (!$request->user_id || !$request->plan) {
        return response()->json(['error' => 'Datos incompletos'], 400);
    }

    $inicio = now();
    $fin = now()->addMonth();

    $sus = Suscripcion::create([
        'user_id' => $request->user_id,
        'plan' => $request->plan,
        'inicio' => $inicio,
        'fin' => $fin
    ]);

    return response()->json($sus, 201);
});

// 🔥 SUSCRIPCIONES (OBTENER ACTIVA)
Route::get('/suscripcion/{id}', function ($id) {

    $sus = Suscripcion::where('user_id', $id)
        ->orderBy('created_at', 'desc')
        ->first();

    return response()->json($sus);
});

// 🔧 TEST
Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});