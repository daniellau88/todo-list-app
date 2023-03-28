<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

// Based on https://levelup.gitconnected.com/create-your-own-helper-function-in-laravel-framework-a2395d6408f1
class HelperServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $allHelperFiles = glob(app_path('Helpers') . '/*.php');
        foreach ($allHelperFiles as $key => $helperFile) {
            require_once $helperFile;
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
