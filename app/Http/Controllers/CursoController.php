<?php

namespace App\Http\Controllers;

use App\Models\Curso;

class CursoController extends Controller
{
    public function index()
    {
        return response()->json(Curso::all());
    }

    public function show($id)
    {
        $curso = Curso::find($id);

        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        return response()->json($curso);
    }
}