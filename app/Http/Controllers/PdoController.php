<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class PdoController extends Controller
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

    public function pdoSetup()
    {
        return view('pages.service.pdo-setup');
    }

    public function managePdo()
    {
        return view('pages.service.manage-pdo');
    }

    public function pdoRequest()
    {
        return view('pages.service.pdo-request');
    }
}
