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
            <div class="card"  id="ItemList">
                <div class="card-header border-0">
                    <div class="d-flex align-items-center">
                        <h5 class="card-title mb-0 flex-grow-1">Category</h5>
                        <div class="flex-shrink-0">
                            <button class="btn btn-primary" onClick="deleteMultiple()"><i class="ri-delete-bin-2-line"></i></button>
                            <a href="/inventory/new-item" class="btn btn-soft-primary"><i class="ri-add-line align-bottom me-1"></i> Create Item</a>
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
                                    <input type="text" class="form-control  bg-light border-light" id="search-model" 
                                        placeholder="Search for model...">
                                    <i class="ri-search-line search-icon"></i>
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-xxl-3 col-sm-3">
                                <div class="input-light">
                                    <select class="form-control" name="choices-single-default"  id="search-status">
                                        <option value="" selected>Status</option>
                                        <option value="1">Published</option>
                                        <option value="0">Hidden</option>
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
                        <div class="table-responsive table-card" style="min-height: 40vh;">
                            <table class="table align-middle table-nowrap" id="CategoryTable">
                                <thead class="text-muted">
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                            </div>
                                        </th>
                                        <th class="sort text-uppercase" data-sort="name">Category</th>
                                        <th class="sort text-uppercase" data-sort="unit">
                                            Name</th>
                                        <th class="sort text-uppercase" data-sort="brand-logo">BRAND LOGO</th>
                                        <th class="sort text-uppercase" data-sort="model">Model</th>
                                        <th class="sort text-uppercase" data-sort="hardware_version">H/W VERSION</th>
                                        <!-- <th class="sort text-uppercase" data-sort="stocks"> Stocks</th> -->
                                        <th class="sort text-uppercase" data-sort="created_at">Created</th>
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
                                        item for you search.</p>
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
                    <div class="modal fade flip" id="deleteItem" tabindex="-1" aria-labelledby="deleteOrderLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body p-5 text-center">
                                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop"
                                        colors="primary:#25a0e2,secondary:#00bd9d" style="width:90px;height:90px">
                                    </lord-icon>
                                    <div class="mt-4 text-center">
                                        <h4>You are about to delete a item ?</h4>
                                        <p class="text-muted fs-15 mb-4">Deleting your item will remove all of
                                            your information from our database.</p>
                                        <div class="hstack gap-2 justify-content-center remove">
                                            <button class="btn btn-link link-primary fw-medium text-decoration-none" data-bs-dismiss="modal"><i class="ri-close-line me-1 align-middle"></i> Close</button>
                                            <button class="btn btn-primary" id="delete-item-btn">Yes, Delete It</button>
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
                <h5 class="modal-title" id="modal-title">Add Category</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row event-form">
                    <input type="text" name="id" id="new-category-id" style="display: none;">
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input class="form-control" placeholder="Enter category name" type="text" name="title" id="new-category-name" required value="" />
                            <div class="invalid-feedback">Please provide a valid category name</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Unit</label>
                            <input class="form-control" placeholder="Enter category name" type="text" name="title" id="new-category-unit" required value="" />
                            <div class="invalid-feedback">Please provide a valid category unit</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Tax Preference</label>
                            <select class="form-control" name="choices-single-default" id="new-category-tax_preference">
                                <option value="1" selected>Taxable</option>
                                <option value="0">Non-Taxable</option>
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">HSN code</label>
                            <input class="form-control" placeholder="Enter category name" type="number" name="title" id="new-category-hsn_code" required value="" />
                            <div class="invalid-feedback">Please provide a valid HSN code</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Tax Rate</label>
                            <input class="form-control" placeholder="Enter category name" type="number" name="title" id="new-category-tax_rate" required value="" />
                            <div class="invalid-feedback">Please provide a valid tax rate</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12"> 
                        <div class="mb-3">
                            <label class="form-label">Status</label>
                            <select class="form-control" name="choices-single-default" id="new-category-status">
                                <option value="1" selected>Active</option>
                                <option value="0">Non-Active</option>
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
    <script src="{{ URL::asset('assets/js/pages/inventory/items.js') }}"></script>
    <script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection
