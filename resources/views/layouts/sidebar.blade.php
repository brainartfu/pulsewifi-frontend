<!-- ========== App Menu ========== -->
<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="/dashboard/analytics" class="logo logo-dark">
            <span class="logo-sm">
                <img src="{{ URL::asset('assets/images/logo-sm.png') }}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{ URL::asset('assets/images/logo-d.png') }}" alt="" height="50" style="margin-top: 15px;">
            </span>
        </a>
        <!-- Light Logo-->
        <a href="/dashboard/analytics" class="logo logo-light">
            <span class="logo-sm">
                <img src="{{ URL::asset('assets/images/logo-sm.png') }}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{ URL::asset('assets/images/logo-l.png') }}" alt="" height="50" style="margin-top: 15px;">
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="menu-title"><span>@lang('translation.menu')</span></li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{url('dashboard/analytics')}}" role="button">
                        <i data-feather="home" class="icon-dual"></i> <span>@lang('translation.dashboards')</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#services" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="services">
                        <i data-feather="grid" class="icon-dual"></i> <span>@lang('translation.services')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="services">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="#distributors" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="distributors">@lang('translation.distributors')
                                </a>
                                <div class="collapse menu-dropdown" id="distributors">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('service/distributor/distributor-onboard')}}" class="nav-link">@lang('translation.distributor-onboard')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('service/distributor/manage-distributors')}}" class="nav-link">@lang('translation.manage-distributors')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#franchises" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="franchises">@lang('translation.franchises')
                                </a>
                                <div class="collapse menu-dropdown" id="franchises">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('service/franchise/franchise-onboard')}}" class="nav-link">@lang('translation.franchise-onboard')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('service/franchise/manage-franchise')}}" class="nav-link">@lang('translation.manage-franchisees')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#PDOs" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="PDOs">@lang('translation.pdos')
                                </a>
                                <div class="collapse menu-dropdown" id="PDOs">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('service/pdo/pdo-setup')}}" class="nav-link">@lang('translation.pdo-setup')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('service/pdo/manage-pdo')}}" class="nav-link">@lang('translation.manage-pdos')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('service/pdo/pdo-request')}}" class="nav-link">@lang('translation.pdo-requests')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#PDOAs" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="PDOAs">@lang('translation.pdoas')
                                </a>
                                <div class="collapse menu-dropdown" id="PDOAs">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('service/pdoa/pdoa-onboard')}}" class="nav-link">@lang('translation.pdoa-onboard')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('service/pdoa/manage-pdoa')}}" class="nav-link">@lang('translation.manage-pdoas')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('service/subscribers')}}" class="nav-link">@lang('translation.subscribers')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#orders-and-requests" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="orders-and-requests">
                        <i data-feather="list" class="icon-dual"></i> <span>@lang('translation.orders-&-requests')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="orders-and-requests">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('orders')}}" class="nav-link">@lang('translation.orders')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('order/add')}}" class="nav-link">@lang('translation.add-order')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#invoices" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="invoices">
                        <i data-feather="cast" class="icon-dual"></i> <span>@lang('translation.invoices')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="invoices">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('invoices')}}" class="nav-link">@lang('translation.invoices')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('invoice/create')}}" class="nav-link">@lang('translation.create-invoice')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="{{url('tickets')}}" class="nav-link"><i data-feather="tablet" class="icon-dual"></i> <span>@lang('translation.support-tickets')</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#stocks-and-inventory" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="stocks-and-inventory">
                        <i data-feather="battery-charging" class="icon-dual"></i> <span>@lang('translation.stocks-&-inventory')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="stocks-and-inventory">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('inventory/category')}}" class="nav-link">@lang('translation.category')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('inventory/items')}}" class="nav-link">@lang('translation.items')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('inventory/stocks')}}" class="nav-link">@lang('translation.stocks')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('inventory/manage')}}" class="nav-link">@lang('translation.manage')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#finance" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="finance">
                        <i data-feather="layers" class="icon-dual"></i> <span>@lang('translation.finance')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="finance">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('finance/payout/approve')}}" class="nav-link">@lang('translation.approve-payouts')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('finance/payout/report')}}" class="nav-link">@lang('translation.payout-reports')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#marketing" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="marketing">
                        <i data-feather="phone" class="icon-dual"></i> <span>@lang('translation.marketing')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="marketing">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('marketing/leads')}}" class="nav-link">@lang('translation.manage-leads')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('marketing/lead/add')}}" class="nav-link">@lang('translation.add-leads')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#reports" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="reports">
                        <i data-feather="package" class="icon-dual"></i> <span>@lang('translation.reports')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="reports">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="#subscriber-reports" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="subscriber-reports">@lang('translation.subscriber-reports')
                                </a>
                                <div class="collapse menu-dropdown" id="subscriber-reports">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('report/subscriber-payment-report')}}" class="nav-link">@lang('translation.payment-reports')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('report/subscriber-transactions-report')}}" class="nav-link">@lang('translation.transactions-reports')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('report/subscriber-user-session-report')}}" class="nav-link">@lang('translation.user-session-report')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('report/subscriber-roaming-report')}}" class="nav-link">@lang('translation.roaming-report')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#revenue-share-reports" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="revenue-share-reports">@lang('translation.revenue-share-reports')
                                </a>
                                <div class="collapse menu-dropdown" id="revenue-share-reports">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('report/distributor-revenue-report')}}" class="nav-link">@lang('translation.distributor-revenue-reports')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('report/franchise-revenue-report')}}" class="nav-link">@lang('translation.franchise-revenue-reports')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#logs" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="logs">
                        <i data-feather="square" class="icon-dual"></i> <span>@lang('translation.logs')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="logs">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('logs/pdo-logs')}}" class="nav-link">@lang('translation.pdo-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/user-access-logs')}}" class="nav-link">@lang('translation.user-access-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/user-recharge-logs')}}" class="nav-link">@lang('translation.user-recharge-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/nat-logs')}}" class="nav-link">@lang('translation.nat-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/email-logs')}}" class="nav-link">@lang('translation.email-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/sms-logs')}}" class="nav-link">@lang('translation.sms-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/transaction-logs')}}" class="nav-link">@lang('translation.transaction-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/distributor-logs')}}" class="nav-link">@lang('translation.distributor-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('logs/franchise-logs')}}" class="nav-link">@lang('translation.franchise-logs')</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#settings" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="settings">
                        <i data-feather="settings" class="icon-dual"></i> <span>@lang('translation.settings')</span>
                    </a>
                    <div class="collapse menu-dropdown" id="settings">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{url('settings')}}" class="nav-link">@lang('translation.system-settings')</a>
                            </li>
                            <li class="nav-item">
                                <a href="#apps-and-integrations" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="apps-and-integrations">@lang('translation.apps-&-integrations')
                                </a>
                                <div class="collapse menu-dropdown" id="apps-and-integrations">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('apps/sms-gateway')}}" class="nav-link">@lang('translation.sms-gateway')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/email-gateway')}}" class="nav-link">@lang('translation.email-gateway')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/payment-gateway')}}" class="nav-link">@lang('translation.payment-gateways')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/payout-gateway')}}" class="nav-link">@lang('translation.payout-gateways')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/accounting-gateway')}}" class="nav-link">@lang('translation.accounting-book')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/sms-templates')}}" class="nav-link">@lang('translation.sms-templates')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('apps/mail-templates')}}" class="nav-link">@lang('translation.mail-templates')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="#manage-users" class="nav-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="manage-users">@lang('translation.manage-users')
                                </a>
                                <div class="collapse menu-dropdown" id="manage-users">
                                    <ul class="nav nav-sm flex-column">
                                        <li class="nav-item">
                                            <a href="{{url('user/manage-roles')}}" class="nav-link">@lang('translation.user-roles')</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="{{url('user/manage-staffs')}}" class="nav-link">@lang('translation.manage-staffs')</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('system-logs')}}" class="nav-link">@lang('translation.system-logs')</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{url('system-health')}}" class="nav-link">@lang('translation.system-health')</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->
<!-- Vertical Overlay-->
<div class="vertical-overlay"></div>