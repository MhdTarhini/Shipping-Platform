<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShipmentController extends Controller
{
    public function addEditShipment(Request $request, $id="add")
    {
        $request->validate([
            'name' => 'string|nullable',
            'phone' => 'string|nullable',
            'address'=>'array|nullable',
            'address.latitude' => 'numeric|nullable',
            'address.longitude' => 'numeric|nullable',
        ]);

        $user=Auth::user();
        if (!$user) {
        return response()->json(['message' => 'Not Authenticated'], 401);
    }

        if ($id == 'add') {
            $shipment=new Shipment;
            $shipment->waybill = $this->generateWaybillNumber();
        }else{
            $shipment=Shipment::Where("id",$id)->first();
        }
        
        $shipment->name = $request->name;
        $shipment->phone_number = $request->phone;
        $shipment->address = $request->address;
        $shipment->user_id = $user->id;
         if ($id == 'add') {
            $shipment->save();
        } else {
            $shipment->update();
        }

        return response()->json([
            'status' => 'success',
            'data'=>$shipment,
        ]);

}
    function generateWaybillNumber() {
        $year = date('Y');
        $dayOfYear = date('z'); 
        $serviceCode = 'US'; 
        $sequenceNumber = str_pad(mt_rand(0, 9999999), 7, '0', STR_PAD_LEFT); 
        $waybillNumber = $year . $dayOfYear . $serviceCode . $sequenceNumber;
        return $waybillNumber;
}
 
     public function deleteShipment(Request $request)
{
    $shipmentId = $request->id; 
    
    $shipment = Shipment::find($shipmentId);
    
    if (!$shipment) {
        return response()->json([
            'status' => 'error',
            'message' => 'Shipment not found',
        ]);
    }

    $shipment->delete();
    
    return response()->json([
        'status' => 'success',
    ]);
}

    public function getShipment()
    {
        $user=Auth::user();

        if (!$user) {
        return response()->json([
            'status' => 'error',
            'message' => 'User not authenticated.',
        ], 401);
        }

        $userId = $user->id;

        $shipments = Shipment::where("user_id", $userId)->orderBy('created_at', 'desc')->get();

        $shipments_number = $shipments->count();

        $completed_shipment=Shipment::isCompleted($userId)->count();

        $inProcess_shipment=Shipment::isInProces($userId)->count();
        
        $canceled_shipment=Shipment::isCanceled($userId)->count();

        return response()->json([
            'status' => 'success',
            'data'=>$shipments,
            'shipments_number'=>$shipments_number,
            'completed_shipment'=>$completed_shipment,
            'inProcess_shipment'=>$inProcess_shipment,
            'canceled_shipment'=>$canceled_shipment,
        ]);
    }

    public function getShipmentsDetails(){
        $user=Auth::user();

        if (!$user) {
        return response()->json([
            'status' => 'error',
            'message' => 'User not authenticated.',
        ], 401);
        }

        $userId = $user->id;

        $shipments_number = Shipment::where('user_id', $userId)->count();

        $completed_shipment=Shipment::isCompleted($userId)->count();

        $inProcess_shipment=Shipment::isInProces($userId)->count();
        
        $canceled_shipment=Shipment::isCanceled($userId)->count();

        return response()->json([
            'status' => 'success',
            'shipments_number'=>$shipments_number,
            'completed_shipment'=>$completed_shipment,
            'inProcess_shipment'=>$inProcess_shipment,
            'canceled_shipment'=>$canceled_shipment,
        ]);

    }


}
