@extends('layouts.master')
@section('title') Franchise Onboard @endsection
@section('css')
<link href="{{ URL::asset('assets/libs/jsvectormap/jsvectormap.min.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ URL::asset('assets/libs/swiper/swiper.min.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
@component('components.breadcrumb')
@slot('li_1') Franchises @endslot
@slot('title') Franchise Onboard @endslot
@endcomponent
<div class="row">
    <div class="col">

        <div class="h-100">
            <div class="row mb-3 pb-1">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title mb-0">Add Franchise</h4>
                        </div><!-- end card header -->
                        <div class="card-body form-steps">
                            <form class="vertical-navs-step">
                                <div class="row gy-5">
                                    <div class="col-lg-3">
                                        <div class="nav flex-column custom-nav nav-pills" role="tablist" aria-orientation="vertical">
                                            <button class="nav-link active" id="oq-1-tab" data-bs-toggle="pill" data-bs-target="#oq-1" type="button" role="tab" aria-controls="oq-1" aria-selected="true">
                                                <span class="step-title me-2">
                                                    <i class="ri-close-circle-fill step-icon me-2"></i>
                                                    Step 1
                                                </span>
                                                Basic information
                                            </button>
                                            <button class="nav-link" id="oq-2-tab" data-bs-toggle="pill" data-bs-target="#oq-2" type="button" role="tab" aria-controls="oq-2" aria-selected="false">
                                                <span class="step-title me-2">
                                                    <i class="ri-close-circle-fill step-icon me-2"></i>
                                                    Step 2
                                                </span>
                                                Billing and commission
                                            </button>
                                            <button class="nav-link" id="oq-3-tab" data-bs-toggle="pill" data-bs-target="#oq-3" type="button" role="tab" aria-controls="oq-3" aria-selected="false">
                                                <span class="step-title me-2">
                                                    <i class="ri-close-circle-fill step-icon me-2"></i>
                                                    Step 3
                                                </span>
                                                Choose Package
                                            </button>
                                            <button class="nav-link" id="oq-4-tab" data-bs-toggle="pill" data-bs-target="#oq-4" type="button" role="tab" aria-controls="oq-4" aria-selected="false">
                                                <span class="step-title me-2">
                                                    <i class="ri-close-circle-fill step-icon me-2"></i>
                                                    Step 4
                                                </span>
                                                Payment
                                            </button>
                                        </div>
                                        <!-- end nav -->
                                    </div> <!-- end col-->
                                    <div class="col-lg-6">
                                        <div class="px-lg-4">
                                            <div class="tab-content">
                                                <div class="tab-pane fade show active" id="oq-1" role="tabpanel" aria-labelledby="oq-1-tab">
                                                    <div>
                                                        <h5>Basic information</h5>
                                                        <p class="text-muted">Fill all information below</p>
                                                    </div>

                                                    <div>
                                                        <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                            A simple danger alert—check it out!
                                                        </div>
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <label class="form-label" for="firstname">First Name</label>
                                                                <input type="text" class="form-control" id="firstname" placeholder="Enter First Name">
                                                            </div>
                                                            <div class="col-6">
                                                                <label class="form-label" for="lastname">Last Name</label>
                                                                <input type="text" class="form-control" id="lastname" placeholder="Enter Last Name">
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="email">Email Address</label>
                                                                    <input type="email" class="form-control" id="email" placeholder="Enter Email Address">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="user_phone">Phone Number</label>
                                                                    <br>
                                                                    <input type="tel" class="form-control" id="phone_no" placeholder="Enter Phone Number">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="company_name">Company Name</label>
                                                                    <input type="text" class="form-control" id="company_name" placeholder="Enter Company Name">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="designation">Designation</label>
                                                                    <input type="text" class="form-control" id="designation" placeholder="Enter Designation">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="id_proof">ID Proof</label>
                                                                    <select class="form-control" id="id_proof">
                                                                        <option value="Aadhaar">Aadhaar</option>
                                                                        <option value="Voter">Voter</option>
                                                                        <option value="PAN">PAN</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="id_proof_no">ID Proof Number (Aadhaar/Voter/PAN Card)</label>
                                                                    <input type="text" class="form-control" id="id_proof_no" placeholder="Enter ID Proof Number">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="upload_id_proof">Upload ID Proof</label>
                                                                    <input type="file" class="form-control" id="upload_id_proof" accept="image/*, application/pdf">
                                                                    <div id="preview_upload_id_proof"></div>
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="identity_verification">Identity verification (Pan Card/Aadhar
                                                                        Card)</label>
                                                                    <input type="text" class="form-control" id="identity_verification" placeholder="Enter Identity verification">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <label class="form-label" for="pdoa_id">Select PDOA</label>
                                                                <select class="form-control" id="pdoa_id">
                                                                    <option value=""> Select Pdoa</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="belongs_to">Belongs To [Distributor]</label>
                                                                    <select class="form-control" id="belongs_to">
                                                                        <option value=""> Select Distributor</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="password">Password</label>
                                                                    <input type="password" class="form-control" id="password" placeholder="Enter password">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="repassword">Confirm Password</label>
                                                                    <input type="password" class="form-control" id="password_confirmation" placeholder="Enter password">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="d-flex align-items-start gap-3 mt-4">
                                                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab" data-nexttab="oq-2-tab" data-currtab="oq-1"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go
                                                            to Billing and commission</button>
                                                    </div>
                                                </div>
                                                <!-- end tab pane -->
                                                <div class="tab-pane fade" id="oq-2" role="tabpanel" aria-labelledby="oq-2-tab">
                                                    <div>
                                                        <h5>Billing and commission</h5>
                                                        <p class="text-muted">Fill all information below</p>
                                                    </div>

                                                    <div>
                                                        <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                            A simple danger alert—check it out!
                                                        </div>
                                                        <div class="row g-3">
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="company_name">Company Name</label>
                                                                    <input type="text" class="form-control" id="company_name_" disabled>
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
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="revenue_model">Revenue Model</label>
                                                                    <select class="form-control" id="revenue_model">
                                                                        <option value="5">5%</option>
                                                                        <option value="10">10%</option>
                                                                        <option value="20">20%</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="revenue_sharing_ratio">Revenue Sharing Ratio</label>
                                                                    <input type="number" class="form-control" id="revenue_sharing_ratio" placeholder="Enter Revenue Sharing Ratio">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex align-items-start gap-3 mt-4">
                                                        <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-1-tab" data-currtab="oq-2"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                            Back to Basic information</button>
                                                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="oq-3-tab" data-currtab="oq-2"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go
                                                            to Bank details</button>
                                                    </div>
                                                </div>
                                                <!-- end tab pane -->
                                                <div class="tab-pane fade" id="oq-3" role="tabpanel" aria-labelledby="oq-3-tab">
                                                    <div>
                                                        <h5>Bank details</h5>
                                                        <p class="text-muted">Fill all information below</p>
                                                    </div>

                                                    <div>
                                                        <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                            A simple danger alert—check it out!
                                                        </div>
                                                        <div class="row gy-3">
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="beneficiary_name">Beneficiary name</label>
                                                                    <input type="text" class="form-control" id="beneficiary_name" placeholder="Enter Beneficiary name">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="ifsc_code">IFSC Code</label>
                                                                    <input type="text" class="form-control" id="ifsc_code" placeholder="Enter IFSC Code">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="ac_no">A/C No</label>
                                                                    <input type="text" class="form-control" id="ac_no" placeholder="Enter A/C No">
                                                                </div>
                                                            </div>
                                                            <div class="col-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="passbook_cheque">Upload Passbook / Cancelled Cheque</label>
                                                                    <input type="file" class="form-control" id="passbook_cheque" accept="image/*, application/pdf">
                                                                    <div id="preview_passbook_cheque"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="d-flex align-items-start gap-3 mt-4">
                                                        <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-2-tab" data-currtab="oq-3"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                            Back to Billing and commission</button>
                                                        <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="oq-4-tab" data-currtab="oq-3"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                                            Submit Distributor And Continue to Payment</button>
                                                    </div>
                                                </div>
                                                <!-- end tab pane -->
                                                <div class="tab-pane fade" id="oq-4" role="tabpanel" aria-labelledby="oq-4-tab">
                                                    <div>
                                                        <h5>Payment</h5>
                                                    </div>
                                                    <div>
                                                        <div class="row gy-3">
                                                            <div class="alert alert-success success_message" role="alert" style="display: none">
                                                                A simple success alert—check it out!
                                                            </div>
                                                            <div class="alert alert-danger error_message" role="alert" style="display: none">
                                                                A simple danger alert—check it out!
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <div class="text-muted">
                                                                    <h5 class="font-size-15 mb-2" id="billed_name"> </h5>
                                                                    <p class="mb-1" id="billed_address"> </p>
                                                                    <p class="mb-1" id="billed_email"> </p>
                                                                    <p id="billed_phone"> </p>
                                                                </div>
                                                            </div>

                                                            <div class="col-4">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="inventory_list">Select Inventory</label>
                                                                    <select class="form-control" id="inventory_list">

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-2">
                                                                <label class="form-label">Price</label>
                                                                <input type="text" class="form-control" id="price" disabled>
                                                            </div>
                                                            <div class="col-2">
                                                                <label class="form-label">Max Quantity</label>
                                                                <input type="text" class="form-control" id="max_quantity" disabled>
                                                            </div>
                                                            <div class="col-2">
                                                                <label class="form-label">Quantity</label>
                                                                <input type="number" class="form-control" id="quantity" placeholder="Enter Quantity">
                                                            </div>
                                                            <div class="col-2">
                                                                <label class="form-label">Action</label>
                                                                <br>
                                                                <div class="btn btn-success" id="btn_addInventory"> + </div>
                                                            </div>

                                                            <div class="col-12">
                                                                <h5 class="font-size-15">Order Summary</h5>

                                                                <div class="table-responsive" id="invoice_content">

                                                                </div><!-- end table responsive -->
                                                            </div>
                                                        </div>
                                                        <div class="d-flex align-items-start gap-3 mt-4">
                                                            <button type="button" class="btn btn-light btn-label previestab" data-previous="oq-3-tab" data-currtab="oq-4"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Bank details</button>
                                                            <button type="button" class="btn btn-primary btn-label right ms-auto nexttab" data-nexttab="oq-5-tab" data-currtab="oq-4"><i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end tab pane -->
                                            </div>
                                            <!-- end tab content -->
                                        </div>
                                    </div>
                                    <!-- end col -->

                                    <div class="col-lg-3">
                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                            <h5 class="fs-14 text-primary mb-0"><i class="ri-shopping-cart-fill align-middle me-2"></i> Your cart</h5>
                                            <!-- <span class="badge bg-primary rounded-pill">3</span> -->
                                        </div>
                                        <ul class="list-group mb-3" id="franchise-cart-detail">

                                        </ul>
                                    </div>
                                </div>
                                <!-- end row -->
                            </form>
                        </div>
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->



        </div> <!-- end .h-100-->

    </div> <!-- end col -->


</div>


@endsection
@section('script')

<script src="{{ URL::asset('assets/js/pages/service/franchiseonboard.init.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection