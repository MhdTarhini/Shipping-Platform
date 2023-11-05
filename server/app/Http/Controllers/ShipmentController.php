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
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|array',
            'address.latitude' => 'required_with:address|numeric',
            'address.longitude' => 'required_with:address|numeric',
        ]);

        $user=Auth::user();
        if (!$user) {
        return response()->json(['message' => 'Not Authenticated'], 401);
    }

        if ($id == 'add') {
            $shipment=new Shipment;
            $shipment->waybill = $this->generateWaybillNumber();
        }else{
            $shipment=Shipment::Where("id",$id);
        }
        
        $shipment->name = $request->name;
        $shipment->phone_number = $request->phone;
        $shipment->address = $request->address;
        $shipment->user_id = $user->id;
        $shipment->save();

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
        
        $shipment = Shipment::findOrFail($shipmentId);
        $shipment->delete();
        
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function getShipment()
    {
        $shipments = Shipment::where("user_id", Auth::user()->id)->get();

        return response()->json([
            'status' => 'success',
            'data'=>$shipments,
        ]);
    }


}
