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
        <div class="card" id="tasksList">
            <div class="card-header border-0">
                <div class="d-flex align-items-center">
                    <h5 class="card-title mb-0 flex-grow-1">Add Item</h5>
                </div>
            </div>
            <div class="card-body border border-dashed border-end-0 border-start-0">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-3">
                                    <label class="form-label" for="project-title-input">Item Name</label>
                                    <input type="text" class="form-control" id="device-name-input" placeholder="Enter Model Name">
                                </div>

                                <div class="mb-3">
                                    <label class="form-label" for="project-thumbnail-img">Image</label>
                                    <input class="form-control" id="device-photo-input" type="file" accept="image/png, image/gif, image/jpeg">
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <div id="device-description">
                                        
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="mb-3 mb-lg-0">
                                            <label for="choices-priority-input" class="form-label">brand</label>
                                            <input type="text" class="form-control" id="device-brand-input" placeholder="Enter Brand">
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3 mb-lg-0">
                                            <label for="choices-status-input" class="form-label">Model</label>
                                            <input type="text" class="form-control" id="device-model-input" placeholder="Enter Brand">
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div>
                                            <label for="datepicker-deadline-input" class="form-label">hardware_version</label>
                                            <input type="text" class="form-control" id="device-version-input" placeholder="Enter hardware version">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->

          
                        <!-- end card -->
                        <div class="text-end mb-4">
                           <!--  <button type="submit" class="btn btn-soft-secondary w-sm">Delete</button>
                            <button type="submit" class="btn btn-primary w-sm">Draft</button> -->
                            <button class="btn btn-success device-create-btn w-sm">Create</button>
                        </div>
                    </div>
                    <!-- end col -->
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div>
                                    <label for="choices-priority-input" class="form-label">Category</label>
                                    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="add-category" style="height: 22px;">
                                        <i class="bx bx-shopping-bag fs-22"></i>
                                    </button>
                                    <select class="form-select" id="device-category-input">
                                        <option value="4" selected>TP-Link Archer A6</option>
                                        <option value="5">EAP225 Indoor</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="choices-privacy-status-input" class="form-label">Package Info</label>
                                    <input type="text" class="form-control" id="device-package-input" placeholder="Enter package">
                                </div>
                                <div>
                                    <label for="choices-privacy-status-input" class="form-label">EAN</label>
                                    <input type="text" class="form-control" id="device-ean-input" placeholder="Enter EAN">
                                </div>
                                <div>
                                    <label for="choices-privacy-status-input" class="form-label">Price</label>
                                    <input type="text" class="form-control" id="device-price-input" placeholder="Enter Price">
                                </div>
                                <div>
                                    <label for="choices-privacy-status-input" class="form-label">Shipping details</label>
                                    <input type="text" class="form-control" id="device-shipping-input" placeholder="Enter shipping details">
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->

                        <!-- end card -->
                    </div>
                    <!-- end col -->
                </div>
            </div>
        </div>
    </div>
</div>
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
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input class="form-control" placeholder="Enter category name" type="text" name="title" id="new-category-name" required value="" />
                            <div class="invalid-feedback">Please provide a valid category name</div>
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
<div class="modal fade" id="add-model-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-header p-3 bg-soft-info">
                <h5 class="modal-title" id="modal-title">Add Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row event-form">
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input class="form-control" placeholder="Enter Modal name" type="text" name="title" id="new-model-name" required value="" />
                            <div class="invalid-feedback">Please provide a valid modal name</div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-soft-danger" id="btn-delete-event"><i class="ri-close-line align-bottom"></i> Delete</button>
                    <button  class="btn btn-success" id="new-model-save">Add Modal</button>
                </div>
            </div>
        </div> <!-- end modal-content-->
    </div> <!-- end modal dialog-->
</div> <!-- end modal-->
@endsection
@section('script')
<script src="{{ URL::asset('assets/libs/list.js/list.js.min.js') }}"></script>
<script src="{{ URL::asset('assets/libs/@ckeditor/@ckeditor.min.js') }}"></script>
<script src="{{ URL::asset('assets/libs/list.pagination.js/list.pagination.js.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/pages/tasks-list.init.js') }}"></script>
<script src="{{ URL::asset('assets/libs/sweetalert2/sweetalert2.min.js') }}"></script>
<script src="{{ URL::asset('assets/js/pages/inventory/new-model.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection