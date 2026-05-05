<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
       Schema::create('cursos', function (Blueprint $table) {
           $table->id();
           $table->string('titulo');
           $table->text('descripcion');
           $table->integer('precio')->default(0);
           $table->integer('rating')->default(5);
           $table->string('nivel'); // Gratis, Platino, Gold, Diamante
           $table->string('categoria');
           $table->timestamps();
      });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};
