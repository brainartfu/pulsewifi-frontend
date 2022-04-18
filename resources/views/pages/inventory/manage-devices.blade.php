@extends('layouts.master')
@section('title')
@lang('translation.list-view')
@endsection
@section('css')
<link href="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="row" id="contactList">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header d-flex align-items-center border-0">
                <h5 class="card-title mb-0 flex-grow-1">All Device</h5>
                <div class="flex-shrink-0">
                    <div class="flax-shrink-0 hstack gap-2">
                        <a href="/inventory/devices"><button class="btn btn-primary">New Device</button></a>
                    </div>
                </div>
            </div>
            <div class="card-body border border-dashed border-end-0 border-start-0">
                <div class="row g-2">
                    <div class="col-xl-4 col-md-6">
                        <div class="search-box">
                            <input type="text" class="form-control search" placeholder="Search to devices...">
                            <i class="ri-search-line search-icon"></i>
                        </div>
                    </div>
                    <!--end col-->
                    <!-- <div class="col-xl-3 col-md-6">
                        <div class="input-group">
                            <span class="input-group-text" id="basic-addon1"><i class="ri-calendar-2-line"></i></span>
                            <input type="text" class="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-range-date="true" placeholder="Select date" aria-describedby="basic-addon1">
                        </div>
                    </div> -->
                    <!--end col-->
                    <div class="col-xl-3 col-md-5">
                        <select class="form-control" data-choices data-choices-search-false name="choices-single-default" id="choices-single-default">
                            <option value="">Select Category</option>
                            <option value="1">TP-Link Archer A6</option>
                            <option value="2">BuEAP225 Indoory</option>
                        </select>
                    </div>
                    <!--end col-->
                    <div class="col-xl-3 col-md-5">
                        <select class="form-control" data-choices data-choices-search-false name="choices-single-default2" id="choices-single-default2">
                            <option value="">Select Status</option>
                            <option value="Successful">Successful</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <!--end col-->
                    <div class="col-xl-1 col-md-4">
                        <button class="btn btn-primary w-100">Filters</button>
                    </div>
                </div>
                <!--end row-->
            </div>
            <div class="card-body">
                <div class="table-responsive table-card">
                    <table class="table align-middle table-nowrap" id="customerTable">
                        <thead class="table-light text-muted">
                            <tr>
                                <th class="sort" data-sort="created_at" scope="col">Date</th>
                                <th class="sort" data-sort="name" scope="col">Name</th>
                                <th class="sort" data-sort="category" scope="col">Category</th>
                                <th class="sort" data-sort="model" scope="col">Model</th>
                                <th class="sort" data-sort="price" scope="col">Price</th>
                                <th class="sort" data-sort="brand" scope="col">Brand</th>
                                <th class="sort" data-sort="status" scope="col">Action</th>
                            </tr>
                        </thead>
                       <!--end thead-->
                        <tbody class="list form-check-all device-list">
                            <tr>
                                <td colspan="7" style="text-align: center;"> Data don't exist.</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--end table-->
                    <div class="noresult" style="display: none">
                        <div class="text-center">
                            <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#25a0e2,secondary:#00bd9d" style="width:75px;height:75px"></lord-icon>
                            <h5 class="mt-2">Sorry! No Result Found</h5>
                            <p class="text-muted mb-0">We've searched more than 150+ orders We did not find any orders
                                for you search.</p>
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
        </div>
        <!--end card-->
    </div>
    <!--end col-->
</div>
@endsection
@section('script')
<script src="{{ URL::asset('assets/libs/list.js/list.js.min.js') }}"></script>
<script src="{{ URL::asset('assets/libs/list.pagination.js/list.pagination.js.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/pages/tasks-list.init.js') }}"></script>
<script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/pages/inventory/device-manage.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection