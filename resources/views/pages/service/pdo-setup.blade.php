@extends('layouts.master')
@section('title')
@lang('translation.list-view')
@endsection
@section('css')
<link rel="stylesheet" href="{{ URL::asset('assets/libs/gridjs/gridjs.min.css') }}">
@endsection
@section('content')
@component('components.breadcrumb')
@slot('li_1') PDOs @endslot
@slot('title') PDO setup @endslot
@endcomponent
<div class="row">
    <div class="col-lg-12">
        <div class="card" id="tasksList">
            <div class="card-header border-0">
                <div class="d-flex align-items-center">
                    <h5 class="card-title mb-0 flex-grow-1">Add PDO</h5>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body form-steps">
                <form class="vertical-navs-step checkout-tab">
                    <div class="row gy-5">
                        <div class="col-lg-3">
                            <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                                <button class="nav-link active" id="oq-1-tab" data-bs-toggle="pill" data-bs-target="#oq-1" type="button" role="tab" aria-controls="oq-1" aria-selected="true">
                                    <span class="step-title me-2">
                                        <i class="ri-close-circle-fill step-icon me-2"></i>
                                        Step 1
                                    </span>
                                    Location Details
                                </button>
                                <button class="nav-link" id="oq-2-tab" data-bs-toggle="pill" data-bs-target="#oq-2" type="button" role="tab" aria-controls="oq-2" aria-selected="false">
                                    <span class="step-title me-2">
                                        <i class="ri-close-circle-fill step-icon me-2"></i>
                                        Step 2
                                    </span>
                                    WiFi Routers
                                </button>
                            </div>
                            <!-- end nav -->
                        </div>
                        <div class="col-lg-6">
                            <div class="px-lg-4">
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="oq-1" role="tabpanel" aria-labelledby="oq-1-tab">
                                        <div>
                                            <h5>Location Details</h5>
                                            <p class="text-muted">Fill all information below</p>
                                        </div>

                                        <div>
                                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                A simple danger alert—check it out!
                                            </div>
                                            <div class="row g-3">
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="pdoName">Location Name</label>
                                                        <input type="text" class="form-control" id="pdoName" placeholder="Enter Location Name">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="address">Address</label>
                                                        <input type="text" class="form-control" id="address" placeholder="Enter Address">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="city">City</label>
                                                        <input type="text" class="form-control" id="city" placeholder="Enter City">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="state">State</label>
                                                        <select class="form-control" id="state">
                                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                            <option value="Assam">Assam</option>
                                                            <option value="Bihar">Bihar</option>
                                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                                            <option value="Goa">Goa</option>
                                                            <option value="Gujarat">Gujarat</option>
                                                            <option value="Haryana">Haryana</option>
                                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                            <option value="Karnataka">Karnataka</option>
                                                            <option value="Kerala">Kerala</option>
                                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                            <option value="Maharashtra">Maharashtra</option>
                                                            <option value="Manipur">Manipur</option>
                                                            <option value="Meghalaya">Meghalaya</option>
                                                            <option value="Mizoram">Mizoram</option>
                                                            <option value="Nagaland">Nagaland</option>
                                                            <option value="Odisha">Odisha</option>
                                                            <option value="Punjab">Punjab</option>
                                                            <option value="Rajasthan">Rajasthan</option>
                                                            <option value="Sikkim">Sikkim</option>
                                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                                            <option value="Telangana">Telangana</option>
                                                            <option value="Tripura">Tripura</option>
                                                            <option value="Uttarakhand">Uttarakhand</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                            <option value="West Bengal">West Bengal</option>
                                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                            <option value="Chandigarh">Chandigarh</option>
                                                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                                            <option value="Daman and Diu">Daman and Diu</option>
                                                            <option value="Delhi">Delhi</option>
                                                            <option value="Lakshadweep">Lakshadweep</option>
                                                            <option value="Puducherry">Puducherry</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="country">Country</label>
                                                        <select class="form-control" id="country">
                                                            <option value="India">India</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="postal_code">Postal Code</label>
                                                        <input type="text" class="form-control" id="postal_code" placeholder="Enter Postal Code">
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="owner_id">Owner</label>
                                                        <select class="form-control" id="owner_id">

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-start gap-3 mt-4">
                                            <button type="button" class="btn btn-success btn-label right ms-auto nexttab" data-nexttab="oq-2-tab" data-currtab="oq-1"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go
                                                to WiFi Routers</button>
                                        </div>
                                    </div>
                                    <!-- end tab pane -->
                                    <div class="tab-pane fade" id="oq-2" role="tabpanel" aria-labelledby="oq-2-tab">
                                        <div>
                                            <h5>WiFi Routers</h5>
                                            <p class="text-muted">Fill all information below</p>
                                        </div>

                                        <div>
                                            <div class="alert alert-success success_message" role="alert" style="display: none">
                                                A simple success alert—check it out!
                                            </div>
                                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                A simple danger alert—check it out!
                                            </div>
                                            <div class="row g-3">
                                                <div class="col-lg-12 wizard-tab">
                                                    <div class="text-center mb-3">
                                                        <h5>WiFi Routers included in the location</h5>
                                                    </div>
                                                    <div class="row" id="wifiList"></div>
                                                    <br />
                                                    <div class="text-center mb-3">
                                                        <h5>WiFi Routers not included in the location</h5>
                                                    </div>
                                                    <div class="row" id="wifiList_"></div>
                                                </div>
                                                <!--end col-->
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-start gap-3 mt-4">
                                            <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-1-tab" data-currtab="oq-2"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to WiFi Routers</button>
                                            <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-3-tab" data-currtab="oq-2"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Finish</button>
                                        </div>
                                    </div>
                                    <!-- end tab pane -->
                                </div>
                                <!-- end tab content -->
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->
                </form>
            </div>
        </div>
        <!-- end -->
    </div>
    <!-- end col -->
</div>
@endsection
@section('script')
<script src="{{ URL::asset('assets/libs/gridjs/gridjs.min.js') }}"></script>

<script src="{{ URL::asset('assets/js/pages/service/pdosetup.init.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection