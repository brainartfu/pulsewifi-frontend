<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
//Profile Routes
Route::get('dashboard/profile', [App\Http\Controllers\HomeController::class, 'profile'])->name('profile');

//Language Translation
Route::get('index/{locale}', [App\Http\Controllers\HomeController::class, 'lang']);

Route::get('/', [App\Http\Controllers\HomeController::class, 'root'])->name('root');

//Update User Details
Route::post('/update-profile/{id}', [App\Http\Controllers\HomeController::class, 'updateProfile'])->name('updateProfile');
Route::post('/update-password/{id}', [App\Http\Controllers\HomeController::class, 'updatePassword'])->name('updatePassword');

// Route::get('{any}', [App\Http\Controllers\HomeController::class, 'index'])->name('index');

// Dashboard routes
Route::get('dashboard/analytics', [App\Http\Controllers\DashboardController::class, 'analytics']);

// Services routes
Route::get('service/distributor/distributor-onboard', [App\Http\Controllers\DistributorController::class, 'distributorOnboard']);
Route::get('service/distributor/manage-distributors', [App\Http\Controllers\DistributorController::class, 'manageDistributors']);
Route::get('service/franchise/franchise-onboard', [App\Http\Controllers\FranchiseController::class, 'franchiseOnboard']);
Route::get('service/franchise/manage-franchise', [App\Http\Controllers\FranchiseController::class, 'manageFranchise']);
Route::get('service/pdo/pdo-setup', [App\Http\Controllers\PdoController::class, 'pdoSetup']);
Route::get('service/pdo/manage-pdo', [App\Http\Controllers\PdoController::class, 'managePdo']);
Route::get('service/pdo/pdo-request', [App\Http\Controllers\PdoController::class, 'pdoRequest']);
Route::get('service/pdoa/pdoa-onboard', [App\Http\Controllers\PdoaController::class, 'pdoaOnboard']);
Route::get('service/pdoa/manage-pdoa', [App\Http\Controllers\PdoaController::class, 'managePdoa']);
Route::get('service/subscribers', [App\Http\Controllers\SubscriberController::class, 'index']);
Route::get('orders', [App\Http\Controllers\OrderController::class, 'index']);
Route::get('order/add', [App\Http\Controllers\OrderController::class, 'create']);
Route::get('invoices', [App\Http\Controllers\InvoiceController::class, 'index']);
Route::get('invoice/create', [App\Http\Controllers\InvoiceController::class, 'create']);
Route::get('tickets', [App\Http\Controllers\TicketController::class, 'index']);

Route::get('inventory/category', [App\Http\Controllers\InventoryController::class, 'category']);
Route::get('inventory/items', [App\Http\Controllers\InventoryController::class, 'items']);
Route::get('inventory/new-item', [App\Http\Controllers\InventoryController::class, 'newItem']);
Route::get('inventory/stocks', [App\Http\Controllers\InventoryController::class, 'stocks']);
Route::get('inventory/manage', [App\Http\Controllers\InventoryController::class, 'manage']);
Route::get('inventory/devices', [App\Http\Controllers\InventoryController::class, 'devices']);
Route::get('inventory/manage/stocks', [App\Http\Controllers\InventoryController::class, 'manageStocks']);
Route::get('inventory/add-stock', [App\Http\Controllers\InventoryController::class, 'addStock']);
Route::get('inventory/manage/devices', [App\Http\Controllers\InventoryController::class, 'manageDevices']);

Route::get('finance/payout/approve', [App\Http\Controllers\PayoutController::class, 'payoutApprove']);
Route::get('finance/payout/report', [App\Http\Controllers\PayoutController::class, 'payoutReport']);

Route::get('marketing/leads', [App\Http\Controllers\MarketingController::class, 'leads']);
Route::get('marketing/lead/add', [App\Http\Controllers\MarketingController::class, 'addLead']);

Route::get('report/subscriber-payment-report', [App\Http\Controllers\ReportController::class, 'subscriberPaymentReport']);
Route::get('report/subscriber-transactions-report', [App\Http\Controllers\ReportController::class, 'subscriberTransactionsReport']);
Route::get('report/subscriber-user-session-report', [App\Http\Controllers\ReportController::class, 'subscriberUserSessionReport']);
Route::get('report/subscriber-roaming-report', [App\Http\Controllers\ReportController::class, 'subscriberRoamingReport']);

Route::get('report/distributor-revenue-report', [App\Http\Controllers\ReportController::class, 'distributorRevenueReport']);
Route::get('report/franchise-revenue-report', [App\Http\Controllers\ReportController::class, 'franchiseRevenueReport']);

Route::get('logs/pdo-logs', [App\Http\Controllers\LogsController::class, 'pdoLogs']);
Route::get('logs/user-access-logs', [App\Http\Controllers\LogsController::class, 'userAccessLogs']);
Route::get('logs/user-recharge-logs', [App\Http\Controllers\LogsController::class, 'userRechargeLogs']);
Route::get('logs/nat-logs', [App\Http\Controllers\LogsController::class, 'natLogs']);
Route::get('logs/email-logs', [App\Http\Controllers\LogsController::class, 'emailLogs']);
Route::get('logs/sms-logs', [App\Http\Controllers\LogsController::class, 'smsLogs']);
Route::get('logs/transaction-logs', [App\Http\Controllers\LogsController::class, 'transactionLogs']);
Route::get('logs/distributor-logs', [App\Http\Controllers\LogsController::class, 'distributorLogs']);
Route::get('logs/franchise-logs', [App\Http\Controllers\LogsController::class, 'franchiseLogs']);

Route::get('settings', [App\Http\Controllers\SettingController::class, 'index']);
Route::get('apps/sms-gateway', [App\Http\Controllers\SettingController::class, 'smsGateway']);
Route::get('apps/email-gateway', [App\Http\Controllers\SettingController::class, 'emailGateway']);
Route::get('apps/payment-gateway', [App\Http\Controllers\SettingController::class, 'paymentGateway']);
Route::get('apps/payout-gateway', [App\Http\Controllers\SettingController::class, 'payoutGateway']);
Route::get('apps/accounting-gateway', [App\Http\Controllers\SettingController::class, 'accountingGateway']);
Route::get('apps/sms-templates', [App\Http\Controllers\SettingController::class, 'smsTemplates']);
Route::get('apps/mail-templates', [App\Http\Controllers\SettingController::class, 'mailTemplates']);

Route::get('user/manage-roles', [App\Http\Controllers\SettingController::class, 'manageRoles']);
Route::get('user/manage-staffs', [App\Http\Controllers\SettingController::class, 'manageStaffs']);

Route::get('system-logs', [App\Http\Controllers\SystemController::class, 'systemLogs']);
Route::get('system-health', [App\Http\Controllers\SystemController::class, 'systemHealth']);
