const franchiseList = [];
const locationList = [];
let modelList = [];
let locationId = 0;
let deleteId = -1;
let pdoaID = 0;
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

$("#owner_id").on("change", (e) => {
    franchiseID = e.target.value;
    franchiseList.map((ele) => {
        if (ele.id == franchiseID) {
            pdoaID = ele.pdoa.id;
        }
    });
});

function getLocation() {
    $.ajax({
        type: "get",
        url: `${api.url}role/get_role/${currentUser.role}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            if (response.data.Location) {
                let getFranchiseUrl = `${api.url}users/getAllFranchises/0/0`;
                $.ajax({
                    type: "get",
                    url: getFranchiseUrl,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        let str = "";
                        $("#owner_id").html("");
                        response.data.map((ele) => {
                            franchiseList.push(ele);
                            str += `<option value="${ele.id}">${
                                ele.firstname + " " + ele.lastname
                            }</option>`;
                        });
                        $("#owner_id").html(str);
                        if(franchiseList.length > 0) {
                            pdoaID = franchiseList[0].pdoa.id;
                        }

                        if (currentUser.role == 5) {
                            $("#owner_id").val(currentUser.id);
                            $("#owner_id").attr("disabled", "true");
                        }

                        $.ajax({
                            type: "get",
                            url: `${api.url}wifiRouterModel/get`,
                            headers: {
                                Authorization: localStorage.getItem("token"),
                            },
                            success: function (response) {
                                modelList = [];
                                response.data.map((ele) => {
                                    modelList.push(ele);
                                });
                            },
                            error: function (error) {
                                error.status == 401 && ClearSession();
                            },
                        });
                    },
                    error: function (error) {
                        error.status == 401 && ClearSession();
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
        url: `${api.url}wifi_router/update_router_with_location/${locationId}/${id}`,
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
        url: `${api.url}wifi_router/get_location_router/${locationId}`,
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
            if ($("#pdoName").val() == "") {
                str_note = "Location field is required.";
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
            if ($("#owner_id").val() == "") {
                str_note =
                    str_note == ""
                        ? "Owner field is required."
                        : str_note + "<br />" + "Owner field is required.";
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
    getLocation();

    $("#pdoName").val("");
    $("#address").val("");
    $("#city").val("");
    $("#state").val("Andhra Pradesh");
    $("#country").val("India");
    $("#postal_code").val("");
    $("#btnLocation").html("Add Location");
});

function submitLocationDetail() {
    let formData = new FormData();

    formData.append("franchiseName", $("#pdoName").val());
    formData.append("name", $("#pdoName").val());
    formData.append("owner_id", $("#owner_id").val());
    formData.append("address", $("#address").val());
    formData.append("city", $("#city").val());
    formData.append("state", $("#state").val());
    formData.append("country", $("#country").val());
    formData.append("postal_code", $("#postal_code").val());

    if (locationId) {
        $.ajax({
            type: "post",
            url: `${api.url}location/update/${locationId}`,
            headers: { Authorization: localStorage.getItem("token") },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    locationId = response.data.id;
                    document.getElementById("oq-2-tab").click();
                    $("#oq-2 .success_message").text(response.message);
                    $("#oq-2 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-2 .success_message").fadeOut("slow");
                    }, 2000);
                    wifiRouterScreen();
                } else {
                    ValidationError(response);
                }
            },
            error: function (error) {
                error.status == 401 && ClearSession();
            },
        });
    } else {
        $.ajax({
            type: "post",
            url: `${api.url}location/add/${pdoaID}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    locationId = response.data.id;
                    document.getElementById("oq-2-tab").click();
                    $("#oq-2 .success_message").text(response.message);
                    $("#oq-2 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-2 .success_message").fadeOut("slow");
                    }, 2000);
                    wifiRouterScreen();
                } else {
                    ValidationError(response);
                }
            },
            error: function (error) {
                error.status == 401 && ClearSession();
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
                        if (currTab == "oq-1") {
                            submitLocationDetail();
                        } else {
                            window.location.href = "/service/pdo/manage-pdo";
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
