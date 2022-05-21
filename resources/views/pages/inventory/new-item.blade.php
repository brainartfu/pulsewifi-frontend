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
                <form class="row g-3" id="new-item-form" novalidate>     
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <label class="form-label" for="project-title-input">Item Name</label>
                                        <input type="text" class="form-control" id="device-name-input" placeholder="Enter Model Name" required>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="project-thumbnail-img">Image</label>
                                        <input class="form-control" id="device-photo-input" type="file" accept="image/png, image/gif, image/jpeg" required>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <div id="device-description">
                                            
                                        </div>
                                    </div>

                                    <div class="row">
                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->
                            <div class="card">
                                <div class="card-header">
                                    <ul class="nav nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-bs-toggle="tab" href="#device-package-info"
                                                role="tab">
                                                Packaging Info
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#device-shipping-info"
                                                role="tab">
                                                Shipping Charges
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#device-price-info"
                                                role="tab">
                                                Price
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- end card header -->
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="device-package-info" role="tabpanel">
                                            <div class="row">
                                                <div class="col-lg-3 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="product-price-input">Weight</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-weight-input" placeholder="Enter weight" required>
                                                            <span class="input-group-text">Kg</span>
                                                            <div class="invalid-feedback">Please enter item weight.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="product-price-input">Height</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-height-input" placeholder="Enter heigth" required>
                                                            <span class="input-group-text">cm</span>
                                                            <div class="invalid-feedback">Please enter item height.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="product-price-input">Width</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-width-input" placeholder="Enter width" required>
                                                            <span class="input-group-text">cm</span>
                                                            <div class="invalid-feedback">Please enter item width.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="product-price-input">Length</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-length-input" placeholder="Enter length" required>
                                                            <span class="input-group-text">cm</span>
                                                            <div class="invalid-feedback">Please enter item length.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end col -->
                                            </div>
                                            <!-- end row -->
                                        </div>
                                        <!-- end tab-pane -->

                                        <div class="tab-pane" id="device-shipping-info" role="tabpanel">
                                            <div class="row">
                                                <div class="form-check form-switch mb-3 col-lg-3">
                                                    <input class="form-check-input device-shipping-input" type="radio" role="switch1" id="device-shipping-free" name="device-shipping" value="free" checked>
                                                    <label class="form-check-label" for="device-shipping-free">Free</label>
                                                </div>
                                                <div class="form-check form-switch mb-3 col-lg-3">
                                                    <input class="form-check-input device-shipping-input" type="radio" role="switch2" id="device-shipping-fixed" name="device-shipping" value="fixed">
                                                    <label class="form-check-label" for="device-shipping-fixed">Fixed</label>
                                                </div>
                                                <div class="form-check form-switch mb-3 col-lg-3">
                                                    <input class="form-check-input device-shipping-input" type="radio" role="switch3" id="device-shipping-auto" name="device-shipping" value="auto">
                                                    <label class="form-check-label" for="device-shipping-auto">Auto Calculate</label>
                                                </div>
                                                <!-- end col -->
                                            </div>
                                            <!-- end row -->

                                            <div id="device-shipping-fixed-input" style="display: none;">
                                                <label class="form-label" for="device-shipping-fixed-value">Fixed Price</label>
                                                <input class="form-control" id="device-shipping-fixed-price" placeholder="Enter fixed shipping.">
                                                <div class="invalid-feedback">Please enter fixed price.</div>
                                            </div>
                                        </div>
                                        <!-- end tab-pane -->
                                        <div class="tab-pane" id="device-price-info" role="tabpanel">
                                            <div class="row">
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="device-price-mrp">MRP</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-price-mrp" placeholder="Enter MRP price" required>
                                                            <div class="invalid-feedback">Please enter MRP price.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-sm-6">
                                                    <div class="mb-3">
                                                        <label class="form-label" for="device-price-mrp">Selling Price</label>
                                                        <div class="input-group has-validation mb-3">
                                                            <input type="text" class="form-control" id="device-price-selling" placeholder="Enter Selling price" required>
                                                            <div class="invalid-feedback">Please enter Selling price.</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end col -->
                                            </div>
                                            <!-- end row -->
                                        </div>
                                        <!-- end tab-pane -->
                                    </div>
                                    <!-- end tab content -->
                                </div>
                                <!-- end card body -->
                            </div>                    

              
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
                                    <div class="mb-3">
                                        <label for="choices-priority-input" class="form-label">Category</label>
                                        <select class="form-select" id="device-category-input" required>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="choices-privacy-status-input" class="form-label">EAN</label>
                                        <input type="text" class="form-control" id="device-ean-input" placeholder="Enter EAN" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="choices-priority-input" class="form-label">brand</label>
                                        <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="add-brand" style="height: 22px;">
                                            <i class="bx bx-plus-medical fs-22"></i>
                                        </button>
                                        <select class="form-select" id="device-brand-input" required>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="choices-status-input" class="form-label">Model</label>
                                        <input type="text" class="form-control" id="device-model-input" placeholder="Enter Brand" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="datepicker-deadline-input" class="form-label">hardware_version</label>
                                        <input type="text" class="form-control" id="device-version-input" placeholder="Enter hardware version" required>
                                    </div>
                                </div>
                                <!-- end card body -->
                            </div>
                            <!-- end card -->

                        </div>
                        <!-- end col -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="add-brand-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-header p-3 bg-soft-info">
                <h5 class="modal-title" id="modal-title">Add Brand</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body p-4">
                <div class="row event-form">
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label">New or Update</label>
                            <select class="form-select" id="add-brand-id">
                            </select>
                        </div>
                    </div><!--end col-->
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input class="form-control" placeholder="Enter Modal name" type="text" name="title" id="add-brand-name" required value="" />
                            <div class="invalid-feedback">Please provide a valid brand name</div>
                        </div>
                    </div><!--end col-->
                    <div class="col-12">
                        <div class="mb-3">
                            <label class="form-label" for="project-thumbnail-img">Logo</label>
                            <input class="form-control" id="add-brand-logo" type="file" accept="image/png, image/gif, image/jpeg" required>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
                <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-soft-danger" id="brand-delete" style="display: none;"><i class="ri-close-line align-bottom"></i> Delete</button>
                    <button  class="btn btn-success" id="add-brand-save">Add Brand</button>
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
<script src="{{ URL::asset('assets/js/pages/inventory/new-item.js') }}"></script>
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection