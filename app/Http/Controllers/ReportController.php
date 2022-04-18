<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class ReportController extends Controller
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

    public function subscriberPaymentReport()
    {
        return view('pages.reports.subscriber.payment-report');
    }

    public function subscriberTransactionsReport()
    {
        return view('pages.reports.subscriber.transactions-report');
    }
    public function subscriberUserSessionReport()
    {
        return view('pages.reports.subscriber.user-session-report');
    }
    public function subscriberRoamingReport()
    {
        return view('pages.reports.subscriber.roaming-report');
    }
    public function distributorRevenueReport()
    {
        return view('pages.reports.distributor.revenue-report');
    }
    public function franchiseRevenueReport()
    {
        return view('pages.reports.franchise.revenue-report');
    }

}
