<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Intervention\Image\Colors\Rgb\Channels\Blue;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('testimonial_models',function(Blueprint $table){
            $table->string('desingnation')->nullable()->after('creation');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('testimonial_models',function(Blueprint $table){
            $table->dropColumn('desingnation')->nullable()->after('creation');
            
        });
    }
};
