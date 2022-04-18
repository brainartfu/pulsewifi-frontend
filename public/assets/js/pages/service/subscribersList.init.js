const franchiseList = [];
const subscriberList = [];
let modelList = [];
let subscriberId = 0;
let deleteId = -1;
// let currentTab = 0;
let arr_state = {
    "Andhra Pradesh": "Andhra Pradesh",
    "Arunachal Pradesh": "Arunachal Pradesh",
    Assam: "Assam",
    Bihar: "Bihar",
    Chhattisgarh: "Chhattisgarh",
    Goa: "Goa",
    Gujarat: "Gujarat",
    Haryana: "Haryana",
    "Himachal Pradesh": "Himachal Pradesh",
    "Jammu and Kashmir": "Jammu and Kashmir",
    Jharkhand: "Jharkhand",
    Karnataka: "Karnataka",
    Kerala: "Kerala",
    "Madhya Pradesh": "Madhya Pradesh",
    Maharashtra: "Maharashtra",
    Manipur: "Manipur",
    Meghalaya: "Meghalaya",
    Mizoram: "Mizoram",
    Nagaland: "Nagaland",
    Odisha: "Odisha",
    Punjab: "Punjab",
    Rajasthan: "Rajasthan",
    Sikkim: "Sikkim",
    "Tamil Nadu": "Tamil Nadu",
    Telangana: "Telangana",
    Tripura: "Tripura",
    Uttarakhand: "Uttarakhand",
    "Uttar Pradesh": "Uttar Pradesh",
    "West Bengal": "West Bengal",
    "Andaman and Nicobar Islands": "Andaman and Nicobar Islands",
    Chandigarh: "Chandigarh",
    "Dadra and Nagar Haveli": "Dadra and Nagar Haveli",
    "Daman and Diu": "Daman and Diu",
    Delhi: "Delhi",
    Lakshadweep: "Lakshadweep",
    Puducherry: "Puducherry",
};

function setCheckAllScript() {
    var checkAll = document.getElementById("checkAll");
    if (checkAll) {
        checkAll.onclick = function () {
            var checkboxes = document.querySelectorAll(
                '.form-check-all input[type="checkbox"]'
            );
            console.log("checkboxes = ");
            console.log(checkboxes);
            if (checkAll.checked == true) {
                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = true;
                    checkbox.closest("tr").classList.add("table-active");
                });
            } else {
                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = false;
                    checkbox.closest("tr").classList.remove("table-active");
                });
            }
        };
    }
}

function getSubscribers() {
    $("#table-location-list-content").html(
        `<div id="table-location-list" class="table-card gridjs-border-none table-responsive mb-4"></div>`
    );
    new gridjs.Grid({
        columns: [
            {
                name: gridjs.html(`<div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                        </div>`),
                width: "40px",
                sort: {
                    enabled: false,
                },
                formatter: function (e) {
                    return gridjs.html(`<div class="form-check">
                            <input class="form-check-input" type="checkbox" name="chk_child" value="option${e}">
                        </div>`);
                },
            },
            {
                name: "SUBSCRIBER NAME",
                formatter: function (e) {
                    return gridjs.html(
                        '<span class="fw-semibold">' + e + "</span>"
                    );
                },
            },
            "CONTACT NUMBER",
            "ACTIVE PACKAGE",
            {
                name: "PACKAGE STATUS",
                formatter: function (e) {
                    if (e == 0) {
                        return gridjs.html(
                            '<span class="badge badge-pill badge-soft-warning font-size-12">Offine</span>'
                        );
                    } else {
                        return gridjs.html(
                            '<span class="badge badge-pill badge-soft-success font-size-12">Online</span>'
                        );
                    }
                },
            },
            "DATA CONSUME",
            "DURATION",
            "CONNECTED DEVICES",
            "LOCATION",
            "EXPIRED AT",
            "LAST RECHARGED",
            {
                name: "ACTION",
                sort: { enabled: false },
                formatter: function (e) {
                    return gridjs.html(
                        `<div class="dropdown">
                            <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ri-more-fill align-middle"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><button class="dropdown-item" href="javascript:void(0);" onclick="ViewInvoice(this);" data-id="${e}" ><i class="ri-eye-fill align-bottom me-2 text-muted"></i>
                                        View</button></li>
                                <li><button class="dropdown-item" href="javascript:void(0);" onclick="EditSubscriber(${e})" data-id="${e}" data-bs-toggle="modal"
                                        data-bs-target="#SubscriberModal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                        Edit</button></li>
                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-line align-bottom me-2 text-muted"></i>
                                        Download</a></li>
                                <li class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteModal">
                                        <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>`
                    );
                },
            },
        ],
        pagination: { limit: 10 },
        sort: true,
        search: true,
        className: {
            th: "text-muted",
            tbody: "form-check-all",
        },
        data: () => {
            return new Promise((resolve) => {
                $.ajax({
                    type: "get",
                    url: `${api.url}role/get_role/${currentUser.role}`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        if (response.data.Location) {
                            $.ajax({
                                type: "get",
                                url: `${api.url}subscriber/get_all_subscribers`,
                                headers: {
                                    Authorization:
                                        localStorage.getItem("token"),
                                },
                                success: function (response) {
                                    let data = [];
                                    response.data.map((ele, index) => {
                                        let data_ = [];
                                        data_.push(index);
                                        data_.push(
                                            ele.first_name + " " + ele.last_name
                                            );
                                        data_.push(ele.phone);
                                        data_.push(ele.active_package);
                                        data_.push(ele.package_status);
                                        data_.push(ele.data_consume);
                                        data_.push(ele.duration);
                                        data_.push(ele.connected_devices);
                                        data_.push(
                                            ele.address +
                                                ", " +
                                                ele.city +
                                                ", " +
                                                arr_state[ele.state] +
                                                ", " +
                                                ele.country +
                                                ", " +
                                                ele.postal_code
                                        );
                                        data_.push(ele.expired_at);
                                        data_.push(ele.last_recharged);
                                        data_.push(ele.id);
                                        data.push(data_);
                                        subscriberList.push(ele);
                                        setCheckAllScript();
                                        resolve(data);
                                    });
                                },
                            });
                        } else {
                            ClearSession();
                        }
                    },
                    error: function (error) {
                        error.status == 401 && ClearSession();
                    },
                });
            });
        },
    }).render(document.getElementById("table-location-list"));
}

function EditSubscriber(e) {
    subscriberList.map((ele) => {
        if (ele.id == e) {
            $("#firstname").val(ele.first_name);
            $("#lastname").val(ele.last_name);
            $("#phone_no").val(ele.phone);
            $("#address").val(ele.address);
            $("#city").val(ele.city);
            $("#state").val(ele.state);
            $("#country").val(ele.country);
            $("#postal_code").val(ele.postal_code);

            $("#active_package").val(ele.active_package);
            $("#package_status").val(ele.package_status);
            $("#data_consume").val(ele.data_consume);
            $("#duration").val(ele.duration);
            $("#connected_devices").val(ele.connected_devices);
            $("#expired_at").val(ele.expired_at);
            $("#last_recharged").val(ele.last_recharged);
            
            subscriberId = e;
        }
    });
}

function DeleteLocation(e) {
    deleteId = e;
    $("#deleteModalTitle").html("Delete Location");
    $("#deleteModalBody").html(
        "This action will completely delete this Location."
    );
}

function AddWifi(id) {
    $.ajax({
        type: "get",
        url: `${api.url}wifi_router/update_router_with_location/${subscriberId}/${id}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            wifiRouterScreen();
        },
        error: function (error) {
            error.status == 401 && ClearSession();
        },
    });
}

function RemoveWifi(id) {
    $.ajax({
        type: "get",
        url: `${api.url}wifi_router/update_router_with_location/0/${id}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            wifiRouterScreen();
        },
        error: function (error) {
            error.status == 401 && ClearSession();
        },
    });
}

function wifiRouterScreen() {
    let routerCount = 0;
    $.ajax({
        type: "get",
        url: `${api.url}wifi_router/get_location_router/${subscriberId}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            if (response.success) {
                let content = "";
                $("#wifiList").html("");
                response.data.map((ele, i) => {
                    routerCount++;
                    let image_str = "";
                    let indicator_str = "";
                    let backend_path = api.domain;

                    modelList.map((model) => {
                        if (ele.model_id == model.id) {
                            if (model.images == "" || model.images == null) {
                                image_str = `<div class="carousel-item active">
                                <img class="d-block img-fluid mx-auto" src="${backend_path}default_wifi_router.jpg">
                            </div>`;
                            } else {
                                let img_path = model.images.replaceAll(
                                    "public",
                                    "storage"
                                );
                                img_path = img_path.split(",");
                                img_path.map((e, index) => {
                                    if (index == 0) {
                                        indicator_str = `<li data-bs-target="#carousel_${i}" data-bs-slide-to="${index}" class="active"></li>`;
                                        image_str = `<div class="carousel-item active">
                                <img class="d-block img-fluid mx-auto" src="${
                                    backend_path + e
                                }">
                            </div>`;
                                    } else {
                                        indicator_str += `<li data-bs-target="#carousel_${i}" data-bs-slide-to="${index}"></li>`;
                                        image_str += `<div class="carousel-item">
                                <img class="d-block img-fluid mx-auto" src="${
                                    backend_path + e
                                }">
                            </div>`;
                                    }
                                });
                            }

                            content += `<div class="col-xl-2 col-md-3">
                  <div class="card">
                    <div class="card-body">
                        <div id="carousel_${i}" class="carousel slide" data-bs-ride="carousel">
                            <ol class="carousel-indicators">
                                ${indicator_str}
                            </ol>
                            <div class="carousel-inner" role="listbox">
                                ${image_str}
                            </div>
                            <a class="carousel-control-prev" href="#carousel_${i}" role="button" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carousel_${i}" role="button" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div><!-- end carousel -->
                    </div><!-- end card-body -->
                    <div class="card-header">
                        <div>
                          <div><h4 class="card-title">${model.name}</h4></div>
                          <div>${ele.name}</div>
                          <div>${ele.mac_address}</div>
                          <div class="location-wifi-description">
                            ${
                                ele.online_status
                                    ? '<span class="badge badge-pill badge-soft-success font-size-12 wifi-status">Enabled</span>'
                                    : '<span class="badge badge-pill badge-soft-warning font-size-12 wifi-status">Disabled</span>'
                            }
                            <div><a href="#" style="color: red" onClick="RemoveWifi('${
                                ele.id
                            }')">Remove</a></div>
                          </div>
                        </div>
                    </div><!-- end card header -->
                </div>
              </div>`;
                        }
                    });
                });

                $("#wifiList").html(content);

                $.ajax({
                    type: "get",
                    url: `${api.url}wifi_router/get_no_location_router/${currentUser.id}`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        if (response.success) {
                            let content = "";
                            $("#wifiList_").html("");
                            response.data.map((ele, i) => {
                                let image_str = "";
                                let indicator_str = "";
                                let backend_path = api.domain;

                                modelList.map((model) => {
                                    if (ele.model_id == model.id) {
                                        if (
                                            model.images == "" ||
                                            model.images == null
                                        ) {
                                            image_str = `<div class="carousel-item active">
                                <img class="d-block img-fluid mx-auto" src="${backend_path}default_wifi_router.jpg">
                            </div>`;
                                        } else {
                                            let img_path =
                                                model.images.replaceAll(
                                                    "public",
                                                    "storage"
                                                );
                                            img_path = img_path.split(",");
                                            img_path.map((e, index) => {
                                                if (index == 0) {
                                                    indicator_str = `<li data-bs-target="#carousel_${i}" data-bs-slide-to="${index}" class="active"></li>`;
                                                    image_str = `<div class="carousel-item active">
                                <img class="d-block img-fluid mx-auto" src="${
                                    backend_path + e
                                }">
                            </div>`;
                                                } else {
                                                    indicator_str += `<li data-bs-target="#carousel_${i}" data-bs-slide-to="${index}"></li>`;
                                                    image_str += `<div class="carousel-item">
                                <img class="d-block img-fluid mx-auto" src="${
                                    backend_path + e
                                }">
                            </div>`;
                                                }
                                            });
                                        }

                                        content += `<div class="col-xl-2 col-md-3">
                  <div class="card">
                    <div class="card-body">
                        <div id="carousel_${i}" class="carousel slide" data-bs-ride="carousel">
                            <ol class="carousel-indicators">
                                ${indicator_str}
                            </ol>
                            <div class="carousel-inner" role="listbox">
                                ${image_str}
                            </div>
                            <a class="carousel-control-prev" href="#carousel_${i}" role="button" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carousel_${i}" role="button" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div><!-- end carousel -->
                    </div><!-- end card-body -->
                    <div class="card-header">
                        <div>
                          <div><h4 class="card-title">${model.name}</h4></div>
                          <div>${ele.name}</div>
                          <div>${ele.mac_address}</div>
                          <div class="location-wifi-description">
                            ${
                                ele.online_status
                                    ? '<span class="badge badge-pill badge-soft-success font-size-12 wifi-status">Enabled</span>'
                                    : '<span class="badge badge-pill badge-soft-warning font-size-12 wifi-status">Disabled</span>'
                            }
                            ${
                                routerCount == 0
                                    ? `<div><a href="#" onClick="AddWifi('${ele.id}')">Add</a></div>`
                                    : ""
                            }
                          </div>
                        </div>
                    </div><!-- end card header -->
                </div>
              </div>`;
                                    }
                                });
                            });

                            $("#wifiList_").html(content);
                        }
                    },
                    error: function (error) {
                        error.status == 401 && ClearSession();
                    },
                });
            }
        },
        error: function (error) {
            error.status == 401 && ClearSession();
        },
    });
}

function nextPrev(currentTab) {
    let str_note = "";
    switch (currentTab) {
        case "oq-1":
            if ($("#firstname").val() == "") {
                str_note = "First Name field is required.";
            }
            if ($("#lastname").val() == "") {
                str_note = "Last Name field is required.";
            }
            if ($("#phone_no").val() == "") {
                str_note = "Phone Number field is required.";
            }
            if ($("#address").val() == "") {
                str_note =
                    str_note == ""
                        ? "Address field is required."
                        : str_note + "<br />" + "Address field is required.";
            }

            if ($("#city").val() == "") {
                str_note =
                    str_note == ""
                        ? "City field is required."
                        : str_note + "<br />" + "City field is required.";
            }

            if ($("#state").val() == "") {
                str_note =
                    str_note == ""
                        ? "State field is required."
                        : str_note + "<br />" + "State field is required.";
            }
            if ($("#country").val() == "") {
                str_note =
                    str_note == ""
                        ? "Country field is required."
                        : str_note + "<br />" + "Country field is required.";
            }
            if ($("#postal_code").val() == "") {
                str_note =
                    str_note == ""
                        ? "Postal Code field is required."
                        : str_note +
                          "<br />" +
                          "Postal Code field is required.";
            }

            break;
        case "oq-2":
            
            break;

        default:
            break;
    }

    return str_note;
}

function fixStepIndicator(e) {
    let t = document.getElementsByClassName("list-item");
    for (n = 0; n < t.length; n++)
        t[n].className = t[n].className.replace(" active", "");
    t[e].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
    getSubscribers();

    $("#btnAddLocationModal").on("click", () => {
        subscriberId = 0;
        $("#firstname").val("");
        $("#lastname").val("");
        $("#phone_no").val("");
        $("#address").val("");
        $("#city").val("");
        $("#state").val("");
        $("#country").val("");
        $("#postal_code").val("");

        $("#active_package").val("");
        $("#package_status").val("");
        $("#data_consume").val("");
        $("#duration").val("");
        $("#connected_devices").val("");
        $("#expired_at").val("");
        $("#last_recharged").val("");
    });

    $("#btnDelete").on("click", () => {
        $.ajax({
            type: "get",
            url: `${api.url}subscriber/delete/${deleteId}`,
            headers: { Authorization: localStorage.getItem("token") },
            success: function (response) {
                $(".btn-close").trigger("click");
                window.scrollTo(0, 0);
                $("#success_message_").text(response.message);
                $("#success_message_").fadeIn("slow");
                setTimeout(function () {
                    $("#success_message_").fadeOut("slow");
                    location.reload();
                }, 1000);
            },
            error: function (error) {
                error.status == 401 && ClearSession();
            },
        });
    });
});

function submitSubscriberDetail() {
    let formData = new FormData();

    formData.append("first_name", $("#firstname").val());
    formData.append("last_name", $("#lastname").val());
    formData.append("phone", $("#phone_no").val());
    formData.append("address", $("#address").val());
    formData.append("city", $("#city").val());
    formData.append("state", $("#state").val());
    formData.append("country", $("#country").val());
    formData.append("postal_code", $("#postal_code").val());
    
    
    formData.append("active_package", $("#active_package").val());
    formData.append("package_status", $("#package_status").val());
    formData.append("data_consume", $("#data_consume").val());
    formData.append("duration", $("#duration").val());
    formData.append("connected_devices", $("#connected_devices").val());
    formData.append("expired_at", $("#expired_at").val());
    formData.append("last_recharged", $("#last_recharged").val());

    if (subscriberId) {
        $.ajax({
            type: "post",
            url: `${api.url}subscriber/update/${subscriberId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    document.getElementById("oq-2-tab").click();

                    $("#oq-2 .success_message").html(response.message);
                    $("#oq-2 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-2 .success_message").fadeOut("slow");
                        $("#SubscriberModal").modal("hide");
                        getSubscribers();
                    }, 1000);
                } else {
                    let str_note = "";
                    if (response.message == "ValidationError") {
                        if (response.data.name) {
                            str_note =
                                str_note == ""
                                    ? response.data.name[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.name[0];
                        }
                        if (response.data.address) {
                            str_note =
                                str_note == ""
                                    ? response.data.address[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.address[0];
                        }
                        if (response.data.city) {
                            str_note =
                                str_note == ""
                                    ? response.data.city[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.city[0];
                        }
                        if (response.data.postal_code) {
                            str_note =
                                str_note == ""
                                    ? response.data.postal_code[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.postal_code[0];
                        }

                        $("#oq-2 .error_message").html(str_note);

                        $("#oq-2 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-2 .error_message").fadeOut("slow");
                        }, 3000);
                    } else {
                        $("#oq-2 .error_message").text(response.message);

                        $("#oq-2 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-2 .error_message").fadeOut("slow");
                        }, 3000);
                    }
                }
            },
            error: function (error) {
                console.log(error.status);
                console.log(error);
            },
        });
    } else {
        $.ajax({
            type: "post",
            url: `${api.url}subscriber/add`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    document.getElementById("oq-2-tab").click();

                    $("#oq-2 .success_message").html(response.message);
                    $("#oq-2 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-2 .success_message").fadeOut("slow");
                        $("#SubscriberModal").modal("hide");
                        getSubscribers();
                    }, 1000);
                } else {
                    let str_note = "";
                    if (response.message == "ValidationError") {
                        if (response.data.name) {
                            str_note =
                                str_note == ""
                                    ? response.data.name[0]
                                    : str_note + "<br />" + response.data.name[0];
                        }
                        if (response.data.address) {
                            str_note =
                                str_note == ""
                                    ? response.data.address[0]
                                    : str_note + "<br />" + response.data.address[0];
                        }
                        if (response.data.city) {
                            str_note =
                                str_note == ""
                                    ? response.data.city[0]
                                    : str_note + "<br />" + response.data.city[0];
                        }
                        if (response.data.postal_code) {
                            str_note =
                                str_note == ""
                                    ? response.data.postal_code[0]
                                    : str_note +
                                    "<br />" +
                                    response.data.postal_code[0];
                        }

                        $("#oq-2 .error_message").html(str_note);

                        $("#oq-2 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-2 .error_message").fadeOut("slow");
                        }, 3000);
                    } else {
                        $("#oq-2 .error_message").text(response.message);

                        $("#oq-2 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-2 .error_message").fadeOut("slow");
                        }, 3000);
                    }
                }
            },
            error: function (error) {
                console.log(error.status);
                console.log(error);
            },
        });
    }
    
}

if (document.querySelectorAll(".checkout-tab"))
    document.querySelectorAll(".checkout-tab").forEach(function (form) {
        // next tab
        if (form.querySelectorAll(".nexttab"))
            form.querySelectorAll(".nexttab").forEach(function (nextButton) {
                var tabEl = form.querySelectorAll(
                    'button[data-bs-toggle="pill"]'
                );

                tabEl.forEach(function (item) {
                    item.addEventListener("show.bs.tab", function (event) {
                        event.target.classList.add("done");
                    });
                });
                nextButton.addEventListener("click", function () {
                    let currTab = nextButton.getAttribute("data-currtab");
                    let str_note = nextPrev(currTab);
                    if (str_note) {
                        $("#" + currTab + " .error_message").html(str_note);
                        $("#" + currTab + " .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#" + currTab + " .error_message").fadeOut(
                                "slow"
                            );
                        }, 3000);
                    } else {
                        if (currTab == "oq-2") {
                            submitSubscriberDetail();
                        } else {
                            var nextTab =
                                nextButton.getAttribute("data-nexttab");
                            document.getElementById(nextTab).click();
                        }
                    }
                });
            }); //Pervies tab

        if (form.querySelectorAll(".previestab"))
            form.querySelectorAll(".previestab").forEach(function (prevButton) {
                prevButton.addEventListener("click", function () {
                    var prevTab = prevButton.getAttribute("data-previous");
                    var totalDone = prevButton.closest("form");

                    for (var i = totalDone - 1; i < totalDone; i++) {
                        prevButton
                            .closest("form")
                            .querySelectorAll(".custom-nav .done")[i]
                            ? prevButton
                                  .closest("form")
                                  .querySelectorAll(".custom-nav .done")
                                  [i].classList.remove("done")
                            : "";
                    }

                    document.getElementById(prevTab).click();
                });
            }); // Step number click

        var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
        if (tabButtons)
            tabButtons.forEach(function (button, i) {
                button.setAttribute("data-position", i);
                button.addEventListener("click", function () {
                    form.querySelectorAll(".custom-nav .done").length > 0
                        ? form
                              .querySelectorAll(".custom-nav .done")
                              .forEach(function (doneTab) {
                                  doneTab.classList.remove("done");
                              })
                        : "";

                    for (var j = 0; j <= i; j++) {
                        tabButtons[j].classList.contains("active")
                            ? tabButtons[j].classList.remove("done")
                            : tabButtons[j].classList.add("done");
                    }
                });
            });
    }); // Dropzone

var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");

if (dropzonePreviewNode) {
    dropzonePreviewNode.id = "";
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
}

if (document.querySelector(".dropzone"))
    var dropzone = new Dropzone(".dropzone", {
        url: "https://httpbin.org/post",
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
