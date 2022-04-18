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
@slot('title') PDO List @endslot
@endcomponent
<div class="row">
    <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
            <div class="card-body" id="total-widget">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <p class="text-uppercase fw-medium text-muted mb-0">Total</p>
                    </div>
                    <!-- <div class="flex-shrink-0">
                        <h5 class="text-success fs-14 mb-0">
                            <i class="ri-arrow-right-up-line fs-13 align-middle"></i> +89.24 %
                        </h5>
                    </div> -->
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                    <div>
                        <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" data-target="">0</span></h4>
                        <span class="badge bg-secondary me-1">
                            <span class="spinner-border flex-shrink-0" style="width: 0.5rem;height: 0.5rem;" role="status"></span>
                        </span>
                        <span class="text-muted">Total Pdos</span>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                        <span class="avatar-title bg-light rounded fs-3">
                            <i data-feather="file-text" class="text-primary icon-dual-primary"></i>
                        </span>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->

    <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
            <div class="card-body" id="active-widget">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <p class="text-uppercase fw-medium text-muted mb-0">Active</p>
                    </div>
                    <!-- <div class="flex-shrink-0">
                        <h5 class="text-danger fs-14 mb-0">
                            <i class="ri-arrow-right-down-line fs-13 align-middle"></i> +8.09 %
                        </h5>
                    </div> -->
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                    <div>
                        <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" data-target="">0</span></h4>
                        <span class="badge bg-secondary me-1">
                            <span class="spinner-border flex-shrink-0" style="width: 0.5rem;height: 0.5rem;" role="status"></span>
                        </span>
                        <span class="text-muted">Active Pdos</span>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                        <span class="avatar-title bg-light rounded fs-3">
                            <i data-feather="check-square" class="text-primary icon-dual-primary"></i>
                        </span>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->

    <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
            <div class="card-body" id="limit-widget">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <p class="text-uppercase fw-medium text-muted mb-0">Max Limit Exceed</p>
                    </div>
                    <!-- <div class="flex-shrink-0">
                        <h5 class="text-danger fs-14 mb-0">
                            <i class="ri-arrow-right-down-line fs-13 align-middle"></i> +9.01 %
                        </h5>
                    </div> -->
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                    <div>
                        <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" data-target="">0</span></h4>
                        <span class="badge bg-secondary me-1">
                            <span class="spinner-border flex-shrink-0" style="width: 0.5rem;height: 0.5rem;" role="status"></span>
                        </span>
                        <span class="text-muted">Max Limit Exceed</span>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                        <span class="avatar-title bg-light rounded fs-3">
                            <i data-feather="clock" class="text-primary icon-dual-primary"></i>
                        </span>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->

    <div class="col-xl-3 col-md-6">
        <!-- card -->
        <div class="card card-animate">
            <div class="card-body" id="pending-widget">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <p class="text-uppercase fw-medium text-muted mb-0">Pending</p>
                    </div>
                    <div class="flex-shrink-0">
                        <h5 class="text-success fs-14 mb-0">
                            <i class="ri-arrow-right-up-line fs-13 align-middle"></i> +7.55 %
                        </h5>
                    </div>
                </div>
                <div class="d-flex align-items-end justify-content-between mt-4">
                    <div>
                        <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value" data-target="">0</span></h4>
                        <span class="badge bg-primary me-1">0</span> <span class="text-muted">Pending Pdos</span>
                    </div>
                    <div class="avatar-sm flex-shrink-0">
                        <span class="avatar-title bg-light rounded fs-3">
                            <i data-feather="x-octagon" class="text-primary icon-dual-primary"></i>
                        </span>
                    </div>
                </div>
            </div><!-- end card body -->
        </div><!-- end card -->
    </div><!-- end col -->
</div> <!-- end row-->

<div class="row">
    <div class="col-lg-12">
        <div class="card" id="tasksList">
            <div class="card-header border-0">
                <div class="d-flex align-items-center">
                    <h5 class="card-title mb-0 flex-grow-1">All PDOs</h5>
                    <div class="flex-shrink-0">
                        <a href="{{URL::asset('/service/pdo/pdo-setup')}}" class="btn btn-soft-primary add-btn"><i class="ri-add-line align-bottom me-1"></i> Create PDO</a>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="ri-delete-bin-2-line"></i></button>
                    </div>
                </div>
            </div>
            <div class="card-body border border-dashed border-end-0 border-start-0">
                <div class="tab-pane active" id="table-location-list-content" role="tabpanel"></div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="LocationModal" tabindex="-1" aria-labelledby="LocationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header p-3">
                <h5 class="modal-title text-uppercase" id="LocationModalLabel">Edit Pdo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="#" class="checkout-tab">
                <div class="modal-body p-0">
                    <div class="step-arrow-nav">
                        <ul class="nav nav-pills nav-justified custom-nav" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3 active" id="oq-1-tab" data-bs-toggle="pill" data-bs-target="#oq-1" type="button" role="tab" aria-controls="oq-1" aria-selected="true">Location Details</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3" id="oq-2-tab" data-bs-toggle="pill" data-bs-target="#oq-2" type="button" role="tab" aria-controls="oq-2" aria-selected="false">WiFi Routers</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--end modal-body-->
                <div class="modal-body">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="oq-1" role="tabpanel" aria-labelledby="oq-1-tab">
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

                                <!--end col-->
                                <div class="col-lg-12">
                                    <div class="d-flex align-items-start gap-3 mt-3">
                                        <button type="button" class=" btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-2-tab" data-currtab="oq-1"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i> Next Step</button>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                            <!--end row-->
                        </div>
                        <!-- end tab pane -->

                        <div class="tab-pane fade" id="oq-2" role="tabpanel" aria-labelledby="oq-2-tab">
                            <div class="alert alert-success success_message" role="alert" style="display: none">
                                A simple success alert—check it out!
                            </div>
                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                A simple danger alert—check it out!
                            </div>
                            <div class="row">
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
                                <div class="col-lg-12">
                                    <div class="hstack align-items-start gap-3 mt-4">
                                        <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-1-tab" data-currtab="oq-2"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to WiFi Routers</button>
                                        <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-3-tab" data-currtab="oq-2"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Next Step</button>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                        </div>
                        <!-- end tab pane -->
                    </div>
                    <!-- end tab content -->
                </div>
                <!--end modal-body-->
            </form>
        </div>
    </div>
</div>
<!-- end modal -->
<!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body p-5 text-center">
                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#25a0e2,secondary:#00bd9d" style="width:90px;height:90px">
                </lord-icon>
                <div class="mt-4 text-center">
                    <h4>You are about to delete a pdo ?</h4>
                    <p class="text-muted fs-15 mb-4">Deleting your pdo will remove all of
                        your information from our database.</p>
                    <div class="hstack gap-2 justify-content-center remove">
                        <button class="btn btn-link link-primary fw-medium text-decoration-none" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                        <button class="btn btn-primary" id="delete-record">Yes, Delete It</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- end modal -->
@endsection
@section('script')

<script src="{{ URL::asset('assets/libs/gridjs/gridjs.min.js') }}"></script>

<script src="{{ URL::asset('assets/js/pages/service/pdoslist.init.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection