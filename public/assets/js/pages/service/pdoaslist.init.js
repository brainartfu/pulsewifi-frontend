function getTime(params) {
    params = new Date(params);
    if (params.getHours() != null) {
        var hour = params.getHours();
        var minute = params.getMinutes() ? params.getMinutes() : 0;
        return hour + ":" + minute;
    }
}

function tConvert(time) {
    var d = new Date(time);
    time_s = d.getHours() + ":" + d.getMinutes();
    var t = time_s.split(":");
    var hours = t[0];
    var minutes = t[1];
    var newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + newformat;
}

var str_dt = function formatDate(date) {
    var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var d = new Date(date),
        month = "" + monthNames[d.getMonth()],
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day + " " + month, year].join(", ");
};

// new Date(y, m, d + 23, 20, 0),
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var qty = 0;
var rate = 0;
var Pdoas = [];

document.addEventListener("DOMContentLoaded", function () {
    var genericExamples = document.querySelectorAll('[data-plugin="choices"]');
    genericExamples.forEach(function (genericExamp) {
        var element = genericExamp;
        new Choices(element, {
            placeholderValue: "This is a placeholder set in the config",
            searchPlaceholderValue: "Search results here",
        });
    });
    setPdoaWidgetsData();
    $.ajax({
        type: "get",
        url: api.url + "pdoa/get",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function (response) {
            Pdoas = response.data;
            setPdoaListHtml(response.data);
        },
        error: function (error) {
            error.status == 0 && (window.location.href = "/login");
            error.status == 404 && (window.location.href = "/auth-404-basic");
        },
    });
    $.ajax({
        type: "get",
        url: `${api.url}pdoa_plan/get_pdoa_plans`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            let str = "";
            $("#pdoa_plan").html("");
            response.data.map((ele) => {
                str += `<option value="${ele.id}">${ele.plan_name}</option>`;
            });
            $("#pdoa_plan").html(str);
        },
    });
});

const SearchData = () => {
    let searchKey = $("#searchKey").val();
    // let datepickerRange = $("#datepicker-range").val();
    let idStatus = $("#idStatus").val();
    let idStatusList = ['All', 'Enable', 'Disable'];
    let filterPdoas = [];
    let searchString = "";
    filterPdoas = Pdoas.filter((pdoa) => {
        searchString = pdoa.firstname + " " + pdoa.lastname + " " + pdoa.email + " " + pdoa.id;
        return searchString.includes(searchKey);
    });

    if (idStatus && idStatus != "All") {
        let sStat = '';
        if (idStatus == "Enable") {
            sStat = 1;
        }
        if (idStatus == "Disable") {
            sStat = 0;
        }
        filterPdoas = filterPdoas.filter(
            (pdoa) => pdoa.pdoa_status == sStat
        );
        let idStatusListHtml = `<option value="">Status</option>`;
        idStatusList.forEach(function (status) {
            if (status == idStatus) {
                idStatusListHtml += `<option value="${idStatus}" selected="selected">${idStatus}</option>`;
            } else {
                idStatusListHtml += `<option value="${idStatus}">${idStatus}</option>`;
            }
        });
        $("#idStatus").html(idStatusListHtml);
    }

    setPdoaListHtml(filterPdoas);
};

const setPdoaWidgetsData = () => {
    $.ajax({
        type: "get",
        url: api.url + "pdoa/get_wifi_users_status/" + currentUser.pdoa_id,
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function (response) {
            console.log("response.data = ");
            console.log(response.data);
            // cur_week_users, expired_users, online_today, online_yesterday, prev_week_users, total_users
            $("#total-widget .me-1").html(response.data.total_users);
            $("#total-widget .counter-value").html(response.data.total_users);
            $("#total-widget .counter-value").attr(
                "data-target",
                response.data.total_users
            );

            $("#active-widget .me-1").html(response.data.cur_week_users);
            $("#active-widget .counter-value").html(
                response.data.cur_week_users
            );
            $("#active-widget .counter-value").attr(
                "data-target",
                response.data.cur_week_users
            );

            $("#limit-widget .me-1").html(response.data.expired_users);
            $("#limit-widget .counter-value").html(response.data.expired_users);
            $("#limit-widget .counter-value").attr(
                "data-target",
                response.data.expired_users
            );
        },
    });
};

const setPdoaListHtml = (data) => {
    $html = "";
    if (data.length) {
        $.each(data, (index, row) => {
            $html += `<tr>
                    <th scope="row">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="chk_child" value="option${index}">
                        </div>
                    </th>
                    <td class="id"><a href="{{URL::asset('/apps-tasks-details')}}" class="fw-medium link-primary">${row.id}</a></td>
                    <td class="id">${row.firstname} &nbsp;${row.lastname}</td>
                    <td class="id">${row.phone_no}</td>
                    <td class="id">${row.brand_name}</td>
                    <td class="project_name">${row.domain_name}</td>
                    <td class="client_name">${row.plan_name}</td>`;
            if (row.pdoa_status) {
                $html += `<td class="client_name"><span><span class="badge badge-pill badge-soft-success font-size-12 wifi-status">Enabled</span></span></td>`;
            } else {
                $html += `<td class="client_name"><span><span class="badge badge-pill badge-soft-warning font-size-12 wifi-status">Disabled</span></span></td>`;
            }
            $html +=
                `<td class="client_name">
                        <div class="dropdown">
                            <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ri-more-fill align-middle"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><button class="dropdown-item" href="javascript:void(0);" onclick="ViewInvoice(this);" data-id="` +
                row.id +
                `" ><i class="ri-eye-fill align-bottom me-2 text-muted"></i>
                                        View</button></li>
                                <li><button class="dropdown-item" href="javascript:void(0);" onclick="EditPdoa(this);" data-id="` +
                row.id +
                `" data-bs-toggle="modal"
                                        data-bs-target="#editPdoaModal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                        Edit</button></li>
                                <li><a class="dropdown-item" href="javascript:void(0);"><i class="ri-download-2-line align-bottom me-2 text-muted"></i>
                                        Download</a></li>
                                <li class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                        <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>`;
        });
        $("#pdos-list").html($html);
    } else {
        $html = `<tr>
                <td colspan="9" style="text-align: center;">No data</td>
            </tr>`;
        $("#pdos-list").html($html);
    }
};

flatpickr("#datepicker-range", {
    mode: "range",
    dateFormat: "d M, Y",
});

flatpickr("#date-field", {
    dateFormat: "d M, Y",
});

var checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.onclick = function () {
        var checkboxes = document.querySelectorAll(
            '.form-check-all input[type="checkbox"]'
        );
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

function ViewInvoice(data) {
    var pdoa_no = data.getAttribute("data-id");
    localStorage.setItem("pdoas-list", JSON.stringify(Pdoas));
    localStorage.setItem("option", "view-pdoa");
    localStorage.setItem("pdoa_no", pdoa_no);
    // window.location.assign("apps-pdoas-details");
}

function EditPdoa(data) {
    let pdoa_no = data.getAttribute("data-id");
    localStorage.setItem("pdoas-list", JSON.stringify(Pdoas));
    localStorage.setItem("pdoa_no", pdoa_no);
    let filterPdoa = Pdoas.filter((pdoa) => pdoa.id == pdoa_no);
    let pdoa = {};
    let idProofs = ["Aadhaar", "Voter", "PAN"];
    if (filterPdoa.length > 0) {
        pdoa = filterPdoa[0];
        console.log(pdoa);
        $("#editPdoaModal #firstName").val(pdoa.firstname);
        $("#editPdoaModal #lastName").val(pdoa.lastname);
        $("#editPdoaModal #phoneNumber").val(pdoa.phone_no);
        $("#editPdoaModal #emailID").val(pdoa.email);
        $("#editPdoaModal #cin_no").val(pdoa.cin_no);

        $("#preview_upload_certificate").html("");
        let arr_exe = pdoa.incorporation_cert.split(".");
        if (
            arr_exe[arr_exe.length - 1] == "pdf" ||
            arr_exe[arr_exe.length - 1] == "PDF"
        ) {
            $("#preview_upload_certificate").append(
                `<img src="${api.url}default_pdf.png" width="200px;" height="200px" style="padding: 10px">`
            );
        } else {
            $("#preview_upload_certificate").append(
                `<img src="${
                    api.domain +
                    pdoa.incorporation_cert.replaceAll("public", "storage")
                }" width="200px;" height="200px" style="padding: 10px">`
            );
        }

        $("#editPdoaModal #company_name").val(pdoa.company_name);
        $("#editPdoaModal #designation").val(pdoa.designation);
        let idProofHtml = `<option value="">Select ID Proof</option>`;
        idProofs.forEach(function (idProof) {
            if (idProof == pdoa.id_proof) {
                idProofHtml += `<option value="${idProof}" selected="selected">${idProof}</option>`;
            } else {
                idProofHtml += `<option value="${idProof}">${idProof}</option>`;
            }
        });
        $("#editPdoaModal #id_proof").html(idProofHtml);
        $("#editPdoaModal #id_proof").val(pdoa.id_proof);
        $("#editPdoaModal #id_proof_no").val(pdoa.id_proof_no);

        $("#editPdoaModal #address").val(pdoa.address);
        $("#editPdoaModal #city").val(pdoa.city);
        $("#editPdoaModal #state").val(pdoa.state);
        $("#editPdoaModal #country").val(pdoa.country);
        $("#editPdoaModal #postal_code").val(pdoa.postal_code);
        $("#editPdoaModal #gst_no").val(pdoa.gst_no);
        $("#editPdoaModal #brand_name").val(pdoa.brand_name);
        $("#editPdoaModal #domain_name").val(pdoa.domain_name);
        $("#editPdoaModal #pdoa_plan").val(pdoa.pdoa_plan_id);
        $("#editPdoaModal #franchise_fee").val(pdoa.franchise_fee);
        $("#editPdoaModal #distributor_fee").val(pdoa.distributor_fee);
        pdoa.pdoa_status
            ? $("#editPdoaModal #enabled").attr("checked", true)
            : $("#editPdoaModal #enabled").attr("checked", false);

        let backend_path = api.domain;

        $("#preview_logo").html("");
        if (pdoa.brand_logo == "" || pdoa.brand_logo == null) {
            $("#preview_logo").append(
                `<img src="${backend_path}default_logo.png" width="150px;" height="150px" style="padding: 50px">`
            );
        } else {
            $("#preview_logo").append(
                `<img src="${
                    backend_path +
                    pdoa.brand_logo.replaceAll("public", "storage")
                }" width="150px;" height="150px" style="padding: 50px">`
            );
        }

        $("#preview_bg").html("");
        if (pdoa.platform_bg == "" || pdoa.platform_bg == null) {
            $("#preview_bg").append(
                `<img src="${backend_path}default_bg.jpg" width="150px;" height="150px" style="padding: 20px">`
            );
        } else {
            $("#preview_bg").append(
                `<img src="${
                    backend_path +
                    pdoa.platform_bg.replaceAll("public", "storage")
                }" width="150px;" height="150px" style="padding: 20px">`
            );
        }

        $("#preview_favicon").html("");
        if (pdoa.favicon == "" || pdoa.favicon == null) {
            $("#preview_favicon").append(
                `<img src="${backend_path}favicon.ico" width="50px;" height="50px" style="padding: 5px">`
            );
        } else {
            $("#preview_favicon").append(
                `<img src="${
                    backend_path + pdoa.favicon.replaceAll("public", "storage")
                }" width="50px;" height="50px" style="padding: 5px">`
            );
        }

        $("#brand_logo").on("change", function () {
            $("#preview_logo").html("");
            $("#preview_logo").append(
                '<img src="' +
                    URL.createObjectURL(
                        document.getElementById("brand_logo").files[0]
                    ) +
                    '" width="150px;" height="150px" style="padding: 50px">'
            );
        });

        $("#brand_bg").on("change", function () {
            $("#preview_bg").html("");
            $("#preview_bg").append(
                '<img src="' +
                    URL.createObjectURL(
                        document.getElementById("brand_bg").files[0]
                    ) +
                    '" width="150px;" height="150px" style="padding: 20px">'
            );
        });

        $("#favicon").on("change", function () {
            $("#preview_favicon").html("");
            $("#preview_favicon").append(
                '<img src="' +
                    URL.createObjectURL(
                        document.getElementById("favicon").files[0]
                    ) +
                    '" width="50px;" height="50px" style="padding: 5px">'
            );
        });

        $("#upload_certificate").on("change", function () {
            $("#preview_upload_certificate").html("");
            let arr_exe = document
                .getElementById("upload_certificate")
                .value.split(".");
            if (
                arr_exe[arr_exe.length - 1] == "pdf" ||
                arr_exe[arr_exe.length - 1] == "PDF"
            ) {
                let backend_path = BACKEND_URL.split("api/")[0];
                $("#preview_upload_certificate").append(
                    `<img src="${backend_path}default_pdf.png" width="200px;" height="200px" style="padding: 10px">`
                );
            } else {
                $("#preview_upload_certificate").append(
                    '<img src="' +
                        URL.createObjectURL(
                            document.getElementById("upload_certificate")
                                .files[0]
                        ) +
                        '" width="200px;" height="200px" style="padding: 10px">'
                );
            }
        });
    }
}

function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function nextPrev(currentTab) {
    let str_note = "";
    switch (currentTab) {
        case "oq-1":
            if ($("#firstName").val() == "") {
                str_note = "First Name field is required.";
            }
            if ($("#lastName").val() == "") {
                str_note =
                    str_note == ""
                        ? "Last Name field is required."
                        : str_note + "<br />" + "Last Name field is required.";
            }
            if ($("#emailID").val() == "") {
                str_note =
                    str_note == ""
                        ? "Email field is required."
                        : str_note + "<br />" + "Email field is required.";
            } else {
                if (!ValidateEmail($("#emailID").val())) {
                    str_note =
                        str_note == ""
                            ? "You have entered an invalid email address."
                            : str_note +
                              "<br />" +
                              "You have entered an invalid email address.";
                }
            }
            if ($("#phoneNumber").val() == "") {
                str_note =
                    str_note == ""
                        ? "Phone Number field is required."
                        : str_note +
                          "<br />" +
                          "Phone Number field is required.";
            } else if ($("#phoneNumber").val().length != 10) {
                str_note =
                    str_note == ""
                        ? "Phone number must be 10 characters."
                        : str_note +
                          "<br />" +
                          "Phone number must be 10 characters.";
            }

            if ($("#id_proof_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "ID Proof Number field is required."
                        : str_note +
                          "<br />" +
                          "ID Proof Number field is required.";
            }
            if ($("#password").val() == "") {
                // str_note = str_note == "" ? "Password field is required." : str_note + "<br />" + "Password field is required.";
            } else {
                if ($("#password").val().length < 8) {
                    str_note =
                        str_note == ""
                            ? "The password must be at least 8 characters."
                            : str_note +
                              "<br />" +
                              "The password must be at least 8 characters.";
                }
            }
            if ($("#password_confirmation").val() == "") {
                // str_note =
                //   str_note == "" ? "Confirm Password field is required." : str_note + "<br />" + "Confirm Password field is required.";
            } else {
                if ($("#password").val() != $("#password_confirmation").val()) {
                    str_note =
                        str_note == ""
                            ? "Password confirmation does not match."
                            : str_note +
                              "<br />" +
                              "Password confirmation does not match.";
                }
            }
            $("#company_name_").val($("#company_name").val());

            break;
        case "oq-2":
            if ($("#cin_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "CIN No field is required."
                        : str_note + "<br />" + "CIN No field is required.";
            }

            break;
        case "oq-3":
            if ($("#address").val() == "") {
                str_note = "Address field is required.";
            }
            if ($("#city").val() == "") {
                str_note =
                    str_note == ""
                        ? "City field is required."
                        : str_note + "<br />" + "City field is required.";
            }
            if ($("#postal_code").val() == "") {
                str_note =
                    str_note == ""
                        ? "Postal Code field is required."
                        : str_note +
                          "<br />" +
                          "Postal Code field is required.";
            } else {
                if (
                    $("#postal_code").val() < 100000 ||
                    $("#postal_code").val() > 999999
                ) {
                    str_note =
                        str_note == ""
                            ? "Postal code should be 6 digit number."
                            : str_note +
                              "<br />" +
                              "Postal code should be 6 digit number.";
                }
            }
            if ($("#gst_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "GST No field is required."
                        : str_note + "<br />" + "GST No field is required.";
            }
            break;
        case "oq-4":
            if ($("#brand_name").val() == "") {
                str_note = "Brand Name field is required.";
            }
            if ($("#domain_name").val() == "") {
                str_note =
                    str_note == ""
                        ? "Domain Name field is required."
                        : str_note +
                          "<br />" +
                          "Domain Name field is required.";
            }
            if ($("#pdoa_plan").val() == "") {
                str_note =
                    str_note == ""
                        ? "PDOA Plan field is required."
                        : str_note + "<br />" + "PDOA Plan field is required.";
            }

            break;
        default:
            break;
    }

    return str_note;
}

function submitPdoDetail() {
    let formData = new FormData();

    $("#brand_logo").prop("files")[0] &&
        formData.append("brand_logo", $("#brand_logo").prop("files")[0]);
    $("#brand_bg").prop("files")[0] &&
        formData.append("platform_bg", $("#brand_bg").prop("files")[0]);
    $("#favicon").prop("files")[0] &&
        formData.append("favicon", $("#favicon").prop("files")[0]);
    $("#upload_certificate").prop("files")[0] &&
        formData.append(
            "incorporation_cert",
            $("#upload_certificate").prop("files")[0]
        );
    formData.append("firstname", $("#firstName").val());
    formData.append("lastname", $("#lastName").val());
    formData.append("username", $("#emailID").val());
    formData.append("email", $("#emailID").val());
    formData.append("phone_no", $("#phoneNumber").val());
    formData.append("cin_no", $("#cin_no").val());
    $("#company_name").val() != "" &&
        formData.append("company_name", $("#company_name").val());
    $("#designation").val() != "" &&
        formData.append("designation", $("#designation").val());
    formData.append("id_proof", $("#id_proof").val());
    formData.append("id_proof_no", $("#id_proof_no").val());
    $("#password").val() != "" &&
        (formData.append("password", $("#password").val()),
        formData.append(
            "password_confirmation",
            $("#password_confirmation").val()
        ));
    formData.append("address", $("#address").val());
    formData.append("city", $("#city").val());
    formData.append("state", $("#state").val());
    formData.append("country", $("#country").val());
    formData.append("postal_code", $("#postal_code").val());
    formData.append("gst_no", $("#gst_no").val());
    formData.append("brand_name", $("#brand_name").val());
    formData.append("pdoa_status", $("#enabled")[0].checked ? 1 : 0);
    formData.append("domain_name", $("#domain_name").val());
    formData.append("pdoa_plan_id", $("#pdoa_plan").val());

    let pdoaID = localStorage.getItem("pdoa_no");

    if (pdoaID != -1 && localStorage.getItem("pdoa_no")) {
        $.ajax({
            type: "post",
            url: `${api.url}pdoa/update/${pdoaID}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    pdoaID = response.data.id;
                    $("#oq-4 .success_message").html(response.message);
                    $("#oq-4 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-4 .success_message").fadeOut("slow");
                        $("#editPdoaModal").modal().hide();
                        window.location.href = "/service/pdoa/manage-pdoa";
                    }, 3000);
                } else {
                    let str_note = "";
                    if (response.message == "ValidationError") {
                        if (response.data.email) {
                            str_note =
                                str_note == ""
                                    ? response.data.email[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.email[0];
                        }
                        if (response.data.password) {
                            str_note =
                                str_note == ""
                                    ? response.data.password[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.password[0];
                        }

                        $("#oq-4 .error_message").html(str_note);

                        $("#oq-4 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-4 .error_message").fadeOut("slow");
                        }, 3000);
                    } else {
                        $("#oq-4 .error_message").text(response.message);

                        $("#oq-4 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-4 .error_message").fadeOut("slow");
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

// Delete Multiple Records
function deleteMultiple() {
    ids_array = [];
    var items = document.getElementsByName("chk_child");
    items.forEach(function (ele) {
        if (ele.checked == true) {
            ids_array.push(ele.value);
        }
    });

    if (typeof ids_array !== "undefined" && ids_array.length > 0) {
        if (confirm("Are you sure you want to delete this?")) {
            ids_array.forEach(function (id) {
                pdoaList.remove(
                    "id",
                    `<a href="javascript:void(0);" onclick="ViewInvoice(this);" data-id="` +
                        id.slice(3) +
                        `" class="fw-medium link-primary">${id}</a>`
                );
            });
            document.getElementById("checkAll").checked = false;
        } else {
            return false;
        }
    } else {
        Swal.fire({
            title: "Please select at least one checkbox",
            confirmButtonClass: "btn btn-info",
            buttonsStyling: false,
            showCloseButton: true,
        });
    }
}

// Checkout nav tab
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
                        if (currTab == "oq-4") {
                            submitPdoDetail();
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
