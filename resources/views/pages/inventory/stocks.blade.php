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
            <div class="card"  id="CategoryList">
                <div class="card-header border-0">
                    <div class="d-flex align-items-center">
                        <h5 class="card-title mb-0 flex-grow-1">Category</h5>
                        <div class="flex-shrink-0">
                            <button class="btn btn-primary" onClick="deleteMultiple()"><i class="ri-delete-bin-2-line"></i></button>
                            <a href="#" class="btn btn-soft-primary" onclick="newCategory()"><i class="ri-add-line align-bottom me-1"></i> Create Category</a>
                        </div>
                    </div>
                </div>
                <div class="card-body bg-soft-light border border-dashed border-start-0 border-end-0">
                    <form>
                        <div class="row g-3">
                            <div class="col-xxl-3 col-sm-4">
                                <div class="search-box">
                                    <input type="text" class="form-control  bg-light border-light" id="search-name"
                                        placeholder="Search for name...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-xxl-3 col-sm-3">
                                <div class="search-box">
                                    <input type="number" class="form-control  bg-light border-light" id="search-hsn" 
                                        placeholder="Search for HSN code...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-xxl-3 col-sm-3">
                                <div class="input-light">
                                    <select class="form-control" name="choices-single-default"  id="search-status">
                                        <option value="" selected>Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Non-Active</option>
                                    </select>
                                </div>
                            </div>
                            <!--end col-->

                            <div class="col-xxl-1 col-sm-2">
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
                            <table class="table align-middle table-nowrap" id="CategoryTable">
                                <thead class="text-muted">
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                            </div>
                                        </th>
                                        <th class="sort text-uppercase" data-sort="name">Name</th>
                                        <th class="sort text-uppercase" data-sort="unit">
                                            Unit</th>
                                        <th class="sort text-uppercase" data-sort="tax_preference">Tax Preference</th>
                                        <th class="sort text-uppercase" data-sort="hsn_code">HSN Code</th>
                                        <th class="sort text-uppercase" data-sort="tax_rate">Tax Rate</th>
                                        <th class="sort text-uppercase" data-sort="status">
                                            Status</th>
                                        <th class="text-uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="list form-check-all" id="category-list-data">

                                </tbody>
                            </table>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                                        colors="primary:#25a0e2,secondary:#00bd9d" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">Sorry! No Result Found</h5>
                                    <p class="text-muted mb-0">We did not find any
                                        invoices for you search.</p>
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
                    <div class="modal fade flip" id="deleteOrder" tabindex="-1" aria-labelledby="deleteOrderLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body p-5 text-center">
                                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                        colors="primary:#25a0e2,secondary:#00bd9d" style="width:90px;height:90px">
                                    </lord-icon>
                                    <div class="mt-4 text-center">
                                        <h4>You are about to delete a invoice ?</h4>
                                        <p class="text-muted fs-15 mb-4">Deleting your invoice will remove all of
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

        </div><!--end col-->
    </div><!--end row-->
<!-- Add New CATEGORY -->
<div class="modal fade" id="add-category-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-header p-3 bg-soft-info">
                <h5 class="modal-title" id="modal-title">Add Stock</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row event-form">
                    <input type="text" name="id" id="new-category-id" style="display: none;">
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-control" name="choices-single-default" id="new-stock-category">
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Brand</label>
                            <select class="form-control" name="choices-single-default" id="new-stock-brand">
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Model</label>
                            <select class="form-control" name="choices-single-default" id="new-stock-model">
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">MAC</label>
                            <input class="form-control" placeholder="Enter MAC..." type="text" name="title" id="new-stock-mac" required value="" />
                            <div class="invalid-feedback">Please provide a valid MAC</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Serial No</label>
                            <input class="form-control" placeholder="Enter MAC..." type="number" name="title" id="new-stock-serial" required value="" />
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">WLAN0 MAC</label>
                            <input class="form-control" placeholder="Enter MAC..." type="text" name="title" id="new-stock-wlan0" required value="" />
                            <div class="invalid-feedback">Please provide a valid MAC...</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">WLAN1 MAC</label>
                            <input class="form-control" placeholder="Enter MAC..." type="text" name="title" id="new-stock-wlan1" required value="" />
                            <div class="invalid-feedback">Please provide a valid MAC...</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">IS CONFIGURED</label>
                            <select class="form-control" name="choices-single-default" id="new-stock-configure">
                                <option value="1" selected>Configure</option>
                                <option value="0">Not Configure</option>
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Device Status</label>
                            <select class="form-control" name="choices-single-default" id="new-stock-status">
                                <option value="1">Active</option>
                                <option value="2">Blocked</option>
                                <option value="3">Broken</option>
                                <option value="4">Died</option>
                            </select>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-soft-danger" id="btn-delete-event"><i class="ri-close-line align-bottom"></i> Delete</button>
                    <button class="btn btn-success" id="new-category-save">Add Category</button>
                </div>
            </div>
        </div> <!-- end modal-content-->
    </div> <!-- end modal dialog-->
</div> <!-- end modal--><!-- Add New MODEL -->
@endsection
@section('script')
    <script src="{{ URL::asset('assets/libs/list.js/list.js.min.js') }}"></script>
    <script src="{{ URL::asset('assets/libs/list.pagination.js/list.pagination.js.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/pages/inventory/stocks.js') }}"></script>
    <script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection
