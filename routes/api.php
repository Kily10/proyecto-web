<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Models\Historial;
use App\Models\Suscripcion;
use App\Models\Pago;


//AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// CURSOS
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);

// HISTORIAL
Route::get('/historial/{id}', function ($id) {
    return response()->json(
        Historial::where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
    );
});

// HISTORIAL
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

// SUSCRIPCIONES 
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

//SUSCRIPCIONES 
Route::get('/suscripcion/{id}', function ($id) {

    $sus = Suscripcion::where('user_id', $id)
        ->orderBy('created_at', 'desc')
        ->first();

    return response()->json($sus);
});

//TEST
Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});

//REPORTE 1: INGRESOS POR PLAN
Route::get('/reporte/ingresos', function () {

    return \App\Models\Suscripcion::selectRaw('plan, COUNT(*) as total, COUNT(*) * 20 as ingresos')
        ->groupBy('plan')
        ->get();
});


//REPORTE 2: CURSOS MÁS INSCRITOS
Route::get('/reporte/cursos', function () {

    return \App\Models\Historial::selectRaw('accion, COUNT(*) as total')
        ->where('accion', 'like', 'Se inscribió al curso%')
        ->groupBy('accion')
        ->orderByDesc('total')
        ->limit(5)
        ->get();
});


//REPORTE 3: USUARIOS ACTIVOS
Route::post('/pago', function (Request $request) {

    try {

        return response()->json([
            'mensaje' => 'ENTRO AL ENDPOINT',
            'datos' => $request->all()
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine()
        ], 500);
    }
});