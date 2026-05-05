<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Historial;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 🔥 REGISTRO
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4'
        ]);

        $user = User::create([
            'name' => $request->email,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // 🔥 GUARDAR HISTORIAL
        Historial::create([
            'user_id' => $user->id,
            'accion' => 'Registro de usuario'
        ]);

        return response()->json([
            'status' => 'ok',
            'user' => $user
        ]);
    }

    // 🔥 LOGIN
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // 🔥 GUARDAR HISTORIAL
        Historial::create([
            'user_id' => $user->id,
            'accion' => 'Inicio de sesión'
        ]);

        return response()->json([
            'status' => 'ok',
            'user' => $user
        ]);
    }
}