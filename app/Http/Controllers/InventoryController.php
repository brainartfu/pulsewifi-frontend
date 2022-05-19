<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class InventoryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function devices()
    {
        return view('pages.inventory.device');
    }
    public function category()
    {
        return view('pages.inventory.category');
    }
    public function items()
    {
        return view('pages.inventory.items');
    }
    public function newItem()
    {
        return view('pages.inventory.new-item');
    }
    public function stocks()
    {
        return view('pages.inventory.stocks');
    }
    public function manage()
    {
        return view('pages.inventory.manage');
    }

    public function manageStocks()
    {
        return view('pages.inventory.manage-stocks');
    }

    public function manageDevices()
    {
        return view('pages.inventory.manage-devices');
    }
    public function addStock()
    {
        return view('pages.inventory.stocks');
    }

}
