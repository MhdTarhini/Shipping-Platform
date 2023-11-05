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
            'waybill' => 'required|string|unique:shipments',
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|array',
            'address.latitude' => 'required_with:address|numeric',
            'address.longitude' => 'required_with:address|numeric',
        ]);

        $user=Auth::user();

        if ($id == 'add') {
            $shipment=new Shipment;
        }else{
            $shipment=Shipment::Where("id",$id);
        }
        
        $shipment->waybill = $request->waybill;
        $shipment->name = $request->name;
        $shipment->phone = $request->phone_number;
        $shipment->address = $request->address;
        $shipment->user_id = $user->id;
        $shipment->save();

        return response()->json([
            'status' => 'success',
            'data'=>$shipment,
        ]);

}
 
        public function delete(Request $request)
    {
        $shipmentId = $request->id; 

        $shipment = Shipment::findOrFail($shipmentId);
        $shipment->delete();

        return response()->json(null, 204);
    }

    public function get()
    {
        $shipments = Shipment::where("user_id", Auth::user()->id)->get();

        return response()->json([
            'status' => 'success',
            'data'=>$shipments,
        ]);
    }


}
