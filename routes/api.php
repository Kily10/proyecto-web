<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CursoController;
use App\Models\Historial;
use App\Models\Suscripcion;
use App\Models\Pago;
use App\Models\User;
use App\Models\Inscripcion;
use App\Models\Curso;


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

        return response()->json([
            'error' => 'Datos incompletos'
        ], 400);
    }

    return response()->json(

        Historial::create([
            'user_id' => $request->user_id,
            'accion' => $request->accion
        ]),

        201
    );
});


// 💳 PAGO + SUSCRIPCIÓN + HISTORIAL
Route::post('/pago', function (Request $request) {

    try {

        if (!$request->user_id || !$request->plan) {

            return response()->json([
                'error' => 'Datos incompletos'
            ], 400);
        }

        $precios = [
            'Gratis' => 0,
            'Platino' => 20,
            'Gold' => 30,
            'Diamante' => 50
        ];

        if (!array_key_exists($request->plan, $precios)) {

            return response()->json([
                'error' => 'Plan inválido'
            ], 400);
        }

        $monto = $precios[$request->plan];

        // 💳 GUARDAR PAGO
        $pago = Pago::create([
            'user_id' => $request->user_id,
            'plan' => $request->plan,
            'monto' => $monto,
            'estado' => 'completado'
        ]);

        // 📦 CREAR SUSCRIPCIÓN
        $suscripcion = Suscripcion::create([
            'user_id' => $request->user_id,
            'plan' => $request->plan,
            'inicio' => now(),
            'fin' => now()->addMonth()
        ]);

        // 📊 GUARDAR HISTORIAL
        Historial::create([
            'user_id' => $request->user_id,
            'accion' => 'Pagó y activó plan ' . $request->plan
        ]);

        return response()->json([
            'pago' => $pago,
            'suscripcion' => $suscripcion
        ], 201);

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

        return response()->json(
            Suscripcion::where('user_id', $id)
                ->latest()
                ->first()
        );

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
});


// 📈 REPORTES

// 💰 INGRESOS
Route::get('/reporte/ingresos', function () {

    return Pago::selectRaw('plan, COUNT(*) as total, SUM(monto) as ingresos')
        ->groupBy('plan')
        ->get();
});


// 🔥 CURSOS MÁS INSCRITOS
Route::get('/reporte/cursos', function () {

    return Historial::selectRaw('accion, COUNT(*) as total')
        ->where('accion', 'like', 'Se inscribió al curso%')
        ->groupBy('accion')
        ->orderByDesc('total')
        ->limit(5)
        ->get();
});


// 👥 USUARIOS
Route::get('/reporte/usuarios', function () {

    $total = User::count();

    $activos = Suscripcion::where('fin', '>=', now())->count();

    return response()->json([
        'total_usuarios' => $total,
        'activos' => $activos,
        'inactivos' => $total - $activos
    ]);
});


// ADMIN CREAR CURSO
Route::post('/cursos', function (Request $request) {

    return Curso::create([
        'titulo' => $request->titulo,
        'descripcion' => $request->descripcion,
        'categoria' => $request->categoria,
        'nivel' => $request->nivel,
        'emoji' => $request->emoji,
        'precio' => $request->precio,
        'rating' => $request->rating
    ]);
});


// ADMIN ELIMINAR CURSO
Route::delete('/cursos/{id}', function ($id) {

    $curso = Curso::find($id);

    if ($curso) {
        $curso->delete();
    }

    return response()->json([
        'status' => 'ok'
    ]);
});


// 📚 INSCRIBIRSE A CURSO
Route::post('/inscribirse', function (Request $request) {

    try {

        // 🔍 VERIFICAR SI YA ESTÁ INSCRITO
        $existe = Inscripcion::where('user_id', $request->user_id)
            ->where('curso_id', $request->curso_id)
            ->first();

        if ($existe) {

            return response()->json([
                'message' => 'Ya inscrito'
            ]);
        }

        // 📚 CREAR INSCRIPCIÓN
        $inscripcion = Inscripcion::create([
            'user_id' => $request->user_id,
            'curso_id' => $request->curso_id
        ]);

        // 🔍 OBTENER CURSO
        $curso = Curso::find($request->curso_id);

        // 📊 HISTORIAL
        Historial::create([
            'user_id' => $request->user_id,
            'accion' => 'Se inscribió al curso ' . $curso->titulo
        ]);

        return response()->json([
            'message' => 'Inscripción exitosa',
            'inscripcion' => $inscripcion
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
});


// 🔧 TEST
Route::get('/test', function () {

    return response()->json([
        'status' => 'ok'
    ]);
});