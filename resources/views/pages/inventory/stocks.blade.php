@extends('layouts.master')
@section('title')
    @lang('translation.list-view')
@endsection
@section('css')
<link href="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet" type="text/css" />

@endsection
@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card"  id="StockList">
                <div class="card-header border-0">
                    <div class="d-flex align-items-center">
                        <h5 class="card-title mb-0 flex-grow-1">Stocks</h5>
                        <div class="flex-shrink-0">
                            <button class="btn btn-primary" onClick="deleteMultiple()"><i class="ri-delete-bin-2-line"></i></button>
                            <a href="#" class="btn btn-soft-primary" onclick="newStock()"><i class="ri-add-line align-bottom me-1"></i> Create stock</a>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
                    <form>
                        <div class="row g-3">
                            <div class="col-xxl-3 col-sm-4">
                                <div class="search-box">
                                    <input type="text" class="form-control search bg-light border-light" id="search-name"
                                        placeholder="Search for name...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <!--end col-->
                           <!--  <div class="col-xxl-3 col-sm-3">
                                <div class="search-box">
                                    <input type="test" class="form-control  bg-light border-light" id="search-model" 
                                        placeholder="Search for model...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div> -->
                           <div class="col-xxl-4 col-sm-5"></div>
                            <!--end col-->
                            <div class="col-xxl-3 col-sm-3">
                                <div class="input-light">
                                    <select class="form-control" name="choices-single-default"  id="search-status">
                                        <option value="" selected>All</option>
                                        <option value="Active">Active</option>
                                        <option value="Blocked">Blocked</option>
                                        <option value="Broken">Broken</option>
                                        <option value="Died">Died</option>
                                    </select>
                                </div>
                            </div>
                            <!--end col-->

                           <!--  <div class="col-xxl-1 col-sm-2">
                                <button type="button" class="btn btn-primary w-100" onclick="SearchData();">
                                    <i class="ri-equalizer-fill me-1 align-bottom"></i> Filters
                                </button>
                            </div> -->
                            <!--end col-->
                        </div>
                        <!--end row-->
                    </form>
                </div>
                <div class="card-body">
                    <div>
                        <div class="table-responsive table-card" style="min-height:38vh;">
                            <table class="table align-middle table-nowrap" id="CategoryTable">
                                <thead class="text-muted">
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                            </div>
                                        </th>
                                        <th class="sort text-uppercase" data-sort="name">Stock ID</th>
                                        <th class="sort text-uppercase" data-sort="brand_name"> Category</th>
                                        <!-- <th class="sort text-uppercase" data-sort="brand_name"> Brand</th> -->
                                        <th class="sort text-uppercase" data-sort="model_name">Model</th>
                                        <th class="sort text-uppercase" data-sort="mac_address">MAC</th>
                                        <th class="sort text-uppercase" data-sort="serial_num">Serial Number</th>
                                        <th class="sort text-uppercase" data-sort="wlan0_mac">WLAN0 MAC</th>
                                        <th class="sort text-uppercase" data-sort="wlan1_mac">WLAN1 MAC</th>
                                        <th class="sort text-uppercase" data-sort="user_name">OWNER</th>
                                        <th class="sort text-uppercase" data-sort="location">LOCATION</th>
                                        <th class="sort text-uppercase" data-sort="status">Status</th>
                                        <th class="text-uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="list form-check-all" id="category-list-data">
                                    <tr>
                                        <td colspan="12" style="text-align: center;"><span class="spinner-border flex-shrink-0" role="status"></span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                        colors="primary:#25a0e2,secondary:#00bd9d" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">Sorry! No Result Found</h5>
                                    <p class="text-muted mb-0">We did not find any
                                        stock for you search.</p>
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
                    <div class="modal fade flip" id="deleteStock" tabindex="-1" aria-labelledby="deleteOrderLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body p-5 text-center">
                                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                        colors="primary:#25a0e2,secondary:#00bd9d" style="width:90px;height:90px">
                                    </lord-icon>
                                    <div class="mt-4 text-center">
                                        <h4>You are about to delete a stock ?</h4>
                                        <p class="text-muted fs-15 mb-4">Deleting your stock will remove all of
                                            your information from our database.</p>
                                        <div class="hstack gap-2 justify-content-center remove">
                                            <button class="btn btn-link link-primary fw-medium text-decoration-none" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                                            <button class="btn btn-primary" id="delete-stock-btn">Yes, Delete It</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--end modal -->
                </div>
            </div>

        </div><!--end col-->
    </div><!--end row-->
<!-- Add New CATEGORY -->
<div class="modal fade" id="new-stock-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-header p-3 bg-soft-info">
                <h5 class="modal-title" id="modal-title">Add Stock</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body p-4">
                <form class="row g-3" id="new-stock-form" novalidate>                    
                    <div class="row event-form">

                        <input type="text" name="id" id="new-stock-id" style="display: none;">
                        <!-- <div class="col-12"> 
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input class="form-control" placeholder="Enter Name..." type="text" name="name" id="new-stock-name" required />
                                <div class="invalid-feedback">Please enter name</div>
                            </div>
                        </div> --><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-control" name="choices-single-default" id="new-stock-category" required>
                                </select>
                            </div>
                        </div><!--end col-->
                        <!-- <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">Brand</label>
                                <select class="form-control" name="choices-single-default" id="new-stock-brand" required>
                                </select>
                            </div>
                        </div> --><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">Item</label>
                                <select class="form-control" name="choices-single-default" id="new-stock-model" required>
                                </select>
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">MAC</label>
                                <input class="form-control mac-mask1 mac-mask" placeholder="Enter MAC..." type="text" name="mac" id="new-stock-mac" required />
                                <div class="invalid-feedback">Please provide a valid MAC</div>
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">Serial No</label>
                                <input class="form-control" placeholder="Enter MAC..." type="number" name="serial_num" id="new-stock-serial" required />
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">WLAN0 MAC</label>
                                <input class="form-control mac-mask2 mac-mask" placeholder="Enter MAC..." type="text" name="wlan0_mac" id="new-stock-wlan0" required />
                                <div class="invalid-feedback">Please provide a valid MAC...</div>
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">WLAN1 MAC</label>
                                <input class="form-control mac-mask3 mac-mask" placeholder="Enter MAC..." type="text" name="wlan1_mac" id="new-stock-wlan1" required />
                                <div class="invalid-feedback">Please provide a valid MAC...</div>
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">IS CONFIGURED</label>
                                <select class="form-control" name="configure" id="new-stock-configure">
                                    <option value="1" selected>Configure</option>
                                    <option value="0">Not Configure</option>
                                </select>
                            </div>
                        </div><!--end col-->
                        <div class="col-6"> 
                            <div class="mb-3">
                                <label class="form-label">Device Status</label>
                                <select class="form-control" name="status" id="new-stock-status" required >
                                    <option value="" selected disabled>Select Device Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Blocked</option>
                                    <option value="3">Broken</option>
                                    <option value="4">Died</option>
                                </select>
                            </div>
                        </div><!--end col-->
                    </div><!--end row-->
                    <div class="hstack gap-2 justify-content-end">
                        <button type="button" class="btn btn-soft-danger" id="new-stock-close"><i class="ri-close-line align-bottom"></i> Close</button>
                        <button class="btn btn-success" id="new-stock-save">Add Stock</button>
                    </div>
                </form>
            </div>
        </div> <!-- end modal-content-->
    </div> <!-- end modal dialog-->
</div> <!-- end modal--><!-- Add New MODEL -->
@endsection
@section('script')
    <script src="{{ URL::asset('assets/libs/list.js/list.js.min.js') }}"></script>
    <script src="{{ URL::asset('assets/libs/list.pagination.js/list.pagination.js.min.js') }}"></script>    
    <script src="{{ URL::asset('assets/libs/cleave.js/cleave.js.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/pages/form-masks.init.js') }}"></script>
    <script src="{{ URL::asset('assets/js/pages/inventory/stocks.js') }}"></script>
    <script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection
