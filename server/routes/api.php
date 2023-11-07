<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShipmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "guest"], function(){
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});

Route::group(["middleware" => "auth:api"], function(){
        Route::post("logout", [AuthController::class, "logout"]);

        Route::group(["prefix" => "shipment"], function(){
            Route::post("add_edit/{id?}", [ShipmentController::class, "addEditShipment"]);
            Route::get("get", [ShipmentController::class, "getShipment"]);
            Route::post("delete", [ShipmentController::class, "deleteShipment"]);
            Route::get("search/{data?}", [ShipmentController::class, "searchShipment"]);
        });
});


