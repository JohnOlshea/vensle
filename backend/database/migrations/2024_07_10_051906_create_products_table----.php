<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
	    $table->string('name');
	    $table->enum('condition', ['New', 'Fairly Used', 'N/A']);
	    $table->decimal('price', 8, 2);
	    $table->string('address');
	    $table->string('phone_number');
	    $table->text('description');
	    $table->string('type');
	    $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
