<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;
    protected $casts = [
        'address' => 'array',
    ];
    protected $fillable = [
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    function scopeIsInProces($query,$id){
        return $query->where('user_id', $id)->where("status_id",1);
    }
    function scopeIsCompleted($query,$id){
        return $query->where('user_id', $id)->where("status_id",2);
    }
    function scopeIsCanceled($query,$id){
        return $query->where('user_id', $id)->where("status_id",3);
    }
}
