@extends('layouts.master')
@section('title')
@lang('translation.list-view')
@endsection
@section('css')
<link href="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />

@endsection
@section('content')
@component('components.breadcrumb')
@slot('li_1')
PDOAs
@endslot
@slot('title')
PDOA List
@endslot
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
                        <span class="text-muted">Total Pdoas</span>
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
                        <span class="text-muted">Active Pdoas</span>
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
                        <span class="badge bg-primary me-1">0</span> <span class="text-muted">Pending Pdoas</span>
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
        <div class="card" id="invoiceList">
            <div class="card-header border-0">
                <div class="d-flex align-items-center">
                    <h5 class="card-title mb-0 flex-grow-1">All PDOAs</h5>
                    <div class="flex-shrink-0">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteOrder"><i class="ri-delete-bin-2-line"></i></button>
                        <a href="{{URL::asset('/service/pdoa/pdoa-onboard')}}" class="btn btn-soft-primary"><i class="ri-add-line align-bottom me-1"></i> Create PDOA</a>
                    </div>
                </div>
            </div>
            <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
                <form id="search-pdoa-list">
                    <div class="row g-3">
                        <div class="col-xxl-5 col-sm-12">
                            <div class="search-box">
                                <input type="text" class="form-control search bg-light border-light" id="searchKey" placeholder="Search for id, pdoa, email or something...">
                                <i class="ri-search-line search-icon"></i>
                            </div>
                        </div>
                        <!--end col-->
                        <!-- <div class="col-xxl-3 col-sm-4">
                            <input type="text" class="form-control bg-light border-light" id="datepicker-range" placeholder="Select date">
                        </div> -->
                        <!--end col-->
                        <div class="col-xxl-3 col-sm-4">
                            <div class="input-light">
                                <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                    <option value="">Status</option>
                                    <option value="All" selected>All</option>
                                    <option value="Enable">Enable</option>
                                    <option value="Disable">Disable</option>
                                </select>
                            </div>
                        </div>
                        <!--end col-->

                        <div class="col-xxl-1 col-sm-4">
                            <button type="button" class="btn btn-primary w-100" onclick="SearchData();">
                                <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters
                            </button>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->
                </form>
            </div>
            <div class="card-body">
                <div>
                    <div class="table-responsive table-card">
                        <table class="table align-middle table-nowrap" id="pdoasTable">
                            <thead class="text-muted">
                                <tr>
                                    <th scope="col" style="width: 50px;">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                        </div>
                                    </th>
                                    <th class="sort text-uppercase">ID</th>
                                    <th class="sort text-uppercase">Contact person</th>
                                    <th class="sort text-uppercase">Phone Number</th>
                                    <th class="sort text-uppercase">Brand Name</th>
                                    <th class="sort text-uppercase">Domain Name</th>
                                    <th class="sort text-uppercase">Plan Name</th>
                                    <th class="sort text-uppercase">Status</th>
                                    <th class="sort text-uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody class="list form-check-all" id="pdos-list">
                                <tr>
                                    <td colspan="9" style="text-align: center;"><span class="spinner-border flex-shrink-0" role="status"></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="noresult" style="display: none">
                            <div class="text-center">
                                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#25a0e2,secondary:#00bd9d" style="width:75px;height:75px">
                                </lord-icon>
                                <h5 class="mt-2">Sorry! No Result Found</h5>
                                <p class="text-muted mb-0">We've searched more than 150+ pdoas We did not find any
                                    pdoas for you search.</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                        <div class="pagination-wrap hstack gap-2">
                            <a class="page-item pagination-prev disabled" href="#">
                                Previous
                            </a>
                            <ul class="pagination listjs-pagination mb-0"></ul>
                            <a class="page-item pagination-next" href="#">
                                Next
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade flip" id="deleteOrder" tabindex="-1" aria-labelledby="deleteOrderLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body p-5 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#25a0e2,secondary:#00bd9d" style="width:90px;height:90px">
                                </lord-icon>
                                <div class="mt-4 text-center">
                                    <h4>You are about to delete a pdoa ?</h4>
                                    <p class="text-muted fs-15 mb-4">Deleting your pdoa will remove all of
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
                <!--end modal -->
            </div>
        </div>

    </div>
    <!--end col-->
</div>
<!--end row-->
<div class="modal fade" id="editPdoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header p-3">
                <h5 class="modal-title text-uppercase" id="exampleModalLabel">Verify your Account</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="#" class="checkout-tab">
                <div class="modal-body p-0">
                    <div class="step-arrow-nav">
                        <ul class="nav nav-pills nav-justified custom-nav" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3 active" id="oq-1-tab" data-bs-toggle="pill" data-bs-target="#oq-1" type="button" role="tab" aria-controls="oq-1" aria-selected="true">Basic Information</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3" id="oq-2-tab" data-bs-toggle="pill" data-bs-target="#oq-2" type="button" role="tab" aria-controls="oq-2" aria-selected="false">Company Information</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3" id="oq-3-tab" data-bs-toggle="pill" data-bs-target="#oq-3" type="button" role="tab" aria-controls="oq-3" aria-selected="false">Billing and commission</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link p-3" id="oq-4-tab" data-bs-toggle="pill" data-bs-target="#oq-4" type="button" role="tab" aria-controls="oq-4" aria-selected="false">Choose Package</button>
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
                                    <div>
                                        <label for="firstName" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="firstName" placeholder="Enter your firstname">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="lastName" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="lastName" placeholder="Enter your lastname">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="phoneNumber" class="form-label">Phone</label>
                                        <input type="text" class="form-control" id="phoneNumber" placeholder="Enter your phone number">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="emailID" class="form-label">Email ID</label>
                                        <input type="email" class="form-control" id="emailID" placeholder="Enter your email">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="designation" class="form-label">Designation</label>
                                        <input type="text" class="form-control" id="designation" placeholder="Enter your Designation">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="id_proof" class="form-label">ID Proof</label>
                                        <select class="form-control" name="id-proof-select" id="id_proof">

                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div>
                                        <label for="id_proof_no" class="form-label">ID Proof Number (Aadhaar/Voter/PAN Card)</label>
                                        <input type="text" class="form-control" id="id_proof_no" placeholder="Enter ID Proof Number">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password" placeholder="Enter your password">
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-6">
                                    <div>
                                        <label for="password_confirmation" class="form-label">Confirm Password</label>
                                        <input type="password" class="form-control" id="password_confirmation" placeholder="Enter your confirm password">
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
                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                A simple danger alert—check it out!
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div>
                                        <label for="company_name" class="form-label">Company Name</label>
                                        <input type="text" class="form-control" id="company_name" placeholder="Enter your Company Name">
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div>
                                        <label for="cin_no" class="form-label">CIN No</label>
                                        <input type="text" class="form-control" id="cin_no" placeholder="CIN No">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="upload_certificate">Upload Incorporation Certificate</label>
                                        <input type="file" class="form-control" id="upload_certificate" accept="image/*, application/pdf">
                                        <div id="preview_upload_certificate"></div>
                                    </div>
                                </div>
                                <!--end col-->
                                <div class="col-lg-12">
                                    <div class="hstack align-items-start gap-3 mt-4">
                                        <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-1-tab" data-currtab="oq-2"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Personal Info</button>
                                        <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-3-tab" data-currtab="oq-2"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Next Step</button>
                                    </div>
                                </div>
                                <!--end col-->
                            </div>
                        </div>
                        <!-- end tab pane -->

                        <div class="tab-pane fade" id="oq-3" role="tabpanel" aria-labelledby="oq-3-tab">
                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                A simple danger alert—check it out!
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div>
                                        <label for="company_name_" class="form-label">Company Name</label>
                                        <input type="text" class="form-control" id="company_name_" readonly placeholder="Enter your Company Name">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="address">Address</label>
                                        <input type="text" class="form-control" id="address" placeholder="Enter Address">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="city">City</label>
                                        <input type="text" class="form-control" id="city" placeholder="Enter City">
                                    </div>
                                </div>
                                <div class="col-6">
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
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="country">Country</label>
                                        <select class="form-control" id="country">
                                            <option value="India">India</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="postal_code">Postal Code</label>
                                        <input type="number" class="form-control" id="postal_code" placeholder="Enter Postal Code">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="gst_no">GST No</label>
                                        <input type="text" class="form-control" id="gst_no" placeholder="Enter GST No">
                                    </div>
                                </div>
                            </div>
                            <!-- end dropzon-preview -->
                            <div class="d-flex align-items-start gap-3 mt-4">
                                <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-2-tab" data-currtab="oq-3"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Company Information</button>
                                <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-4-tab" data-currtab="oq-3"><i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>Next Step</button>
                            </div>
                        </div>
                        <!-- end tab pane -->

                        <div class="tab-pane fade" id="oq-4" role="tabpanel" aria-labelledby="oq-4-tab">
                            <div class="alert alert-success success_message" role="alert" style="display: none">
                                A simple success alert—check it out!
                            </div>
                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                A simple danger alert—check it out!
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label" for="brand_name">Brand Name</label>
                                    <input type="text" class="form-control" id="brand_name" placeholder="Enter Brand Name" />
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="enabled">Status</label>
                                    <br />
                                    <label class="switch">
                                        <input type="checkbox" id="enabled" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="brand_logo">Brand Logo</label>
                                    <input type="file" id="brand_logo" accept="image/*" />
                                    <div id="preview_logo"></div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="brand_bg">Brand Background</label>
                                    <input type="file" id="brand_bg" accept="image/*" />
                                    <div id="preview_bg"></div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="domain_name">Domain Name</label>
                                    <input type="text" class="form-control" id="domain_name" placeholder="Enter Domain Name" />
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="pdoa_plan">PDOA Plan</label>
                                    <select class="form-control" id="pdoa_plan">

                                    </select>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="franchise_fee">Franchise Fee</label>
                                    <input type="number" class="form-control" id="franchise_fee" placeholder="Enter Franchise Fee" />
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="distributor_fee">Distributor Fee</label>
                                    <input type="number" class="form-control" id="distributor_fee" placeholder="Enter Distributor Fee" />
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="favicon">FavIcon</label>
                                    <input type="file" id="favicon" accept="image/*" />
                                    <div id="preview_favicon"></div>
                                </div>
                            </div>
                            <div class="d-flex align-items-start gap-3 mt-4">
                                <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-3-tab" data-currtab="oq-4"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Billing and Commission</button>
                                <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-5-tab" data-currtab="oq-4"><i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>Submit</button>
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

@endsection
@section('script')
<script src="{{ URL::asset('assets/js/pages/service/pdoaslist.init.js') }}"></script>
<script src="{{ URL::asset('/assets/libs/dropzone/dropzone.min.js') }}"></script>
<script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection