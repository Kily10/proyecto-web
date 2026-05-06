<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Models\Historial;
use App\Models\Suscripcion;
use App\Models\Pago;

// 🔐 AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// 📚 CURSOS
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);


// 📊 HISTORIAL
Route::get('/historial/{id}', function ($id) {
    return response()->json(
        Historial::where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
    );
});

Route::post('/historial', function (Request $request) {

    if (!$request->user_id || !$request->accion) {
        return response()->json(['error' => 'Datos incompletos'], 400);
    }

    return response()->json(
        Historial::create([
            'user_id' => $request->user_id,
            'accion' => $request->accion
        ]),
        201
    );
});


// 💳 PAGO + SUSCRIPCIÓN (REAL)
Route::post('/pago', function (Request $request) {

    try {

        if (!$request->user_id || !$request->plan) {
            return response()->json(['error' => 'Datos incompletos'], 400);
        }

        $precios = [
            'Platino' => 20,
            'Gold' => 30,
            'Diamante' => 50
        ];

        $monto = $precios[$request->plan] ?? 0;

        // 💰 guardar pago
        $pago = Pago::create([
            'user_id' => $request->user_id,
            'plan' => $request->plan,
            'monto' => $monto,
            'estado' => 'aprobado'
        ]);

        // 📦 crear suscripción
        $suscripcion = Suscripcion::create([
            'user_id' => $request->user_id,
            'plan' => $request->plan,
            'inicio' => now(),
            'fin' => now()->addMonth()
        ]);

        return response()->json([
            'pago' => $pago,
            'suscripcion' => $suscripcion
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine()
        ], 500);
    }
});


// 📦 OBTENER SUSCRIPCIÓN
Route::get('/suscripcion/{id}', function ($id) {

    try {

        $suscripcion = Suscripcion::where('user_id', $id)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json($suscripcion);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
});


// 📈 REPORTES

// 1️⃣ INGRESOS POR PLAN
Route::get('/reporte/ingresos', function () {

    return Suscripcion::selectRaw('plan, COUNT(*) as total, COUNT(*) * 20 as ingresos')
        ->groupBy('plan')
        ->get();
});


// 2️⃣ CURSOS MÁS INSCRITOS
Route::get('/reporte/cursos', function () {

    return Historial::selectRaw('accion, COUNT(*) as total')
        ->where('accion', 'like', 'Se inscribió al curso%')
        ->groupBy('accion')
        ->orderByDesc('total')
        ->limit(5)
        ->get();
});


// 3️⃣ USUARIOS ACTIVOS
Route::get('/reporte/usuarios', function () {

    return \App\Models\User::selectRaw('COUNT(*) as total_usuarios')
        ->get();
});


// 🔧 TEST
Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});