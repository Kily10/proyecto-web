<?php

namespace App\Http\Controllers;

use App\Models\Curso;

class CursoController extends Controller
{
    public function index()
    {
        return response()->json(Curso::all());
    }
}