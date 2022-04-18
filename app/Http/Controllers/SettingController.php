<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SettingController extends Controller
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

    public function index()
    {
        return view('pages.settings.index');
    }

    public function smsGateway()
    {
        return view('pages.settings.apps.sms-gateway');
    }
    public function emailGateway()
    {
        return view('pages.settings.apps.email-gateway');
    }
    public function paymentGateway()
    {
        return view('pages.settings.apps.payment-gateway');
    }
    public function payoutGateway()
    {
        return view('pages.settings.apps.payout-gateway');
    }
    public function accountingGateway()
    {
        return view('pages.settings.apps.accounting-gateway');
    }
    public function smsTemplates()
    {
        return view('pages.settings.apps.sms-templates');
    }
    public function mailTemplates()
    {
        return view('pages.settings.apps.mail-templates');
    }
    public function manageRoles()
    {
        return view('pages.settings.user.manage-roles');
    }
    public function manageStaffs()
    {
        return view('pages.settings.user.manage-staffs');
    }
}
