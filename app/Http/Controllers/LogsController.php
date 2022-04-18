<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LogsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function pdoLogs()
    {
        return view('pages.logs.pdo-logs');
    }

    public function userAccessLogs()
    {
        return view('pages.logs.user-access-logs');
    }

    public function userRechargeLogs()
    {
        return view('pages.logs.user-recharge-logs');
    }

    public function natLogs()
    {
        return view('pages.logs.nat-logs');
    }

    public function emailLogs()
    {
        return view('pages.logs.email-logs');
    }

    public function smsLogs()
    {
        return view('pages.logs.sms-logs');
    }

    public function transactionLogs()
    {
        return view('pages.logs.transaction-logs');
    }

    public function distributorLogs()
    {
        return view('pages.logs.distributor-logs');
    }

    public function franchiseLogs()
    {
        return view('pages.logs.franchise-logs');
    }
    

}
