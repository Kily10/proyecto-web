<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Historial;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['status' => 'error']);
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