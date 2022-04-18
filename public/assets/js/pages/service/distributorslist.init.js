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
var Distributors = [];

document.addEventListener("DOMContentLoaded", function () {
    var genericExamples = document.querySelectorAll('[data-plugin="choices"]');
    genericExamples.forEach(function (genericExamp) {
        var element = genericExamp;
        new Choices(element, {
            placeholderValue: "This is a placeholder set in the config",
            searchPlaceholderValue: "Search results here",
        });
    });
    setDistributorsWidgetsData();
    $.ajax({
        type: "get",
        url: `${api.url}role/get_role/${currentUser.role}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            if (response.data.Distributor) {
                $.ajax({
                    type: "get",
                    url: `${api.url}users/getDistributors/${currentUser.id}`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        Distributors = response.data;
                        setDistributorsListHtml(response.data);
                    },
                    error: function (error) {
                        error.status == 0 && (window.location.href = "/login");
                        error.status == 404 &&
                            (window.location.href = "/auth-404-basic");
                    },
                });
            } else {
                ClearSession();
            }
        },
        error: function (error) {
            error.status == 0 && (window.location.href = "/login");
            error.status == 404 && (window.location.href = "/auth-404-basic");
        },
    });

   
});

const SearchData = () => {
    let searchKey = $("#searchKey").val();
    // let datepickerRange = $("#datepicker-range").val();
    let idStatus = $("#idStatus").val();
    let idStatusList = ['All', 'Enable', 'Disable'];
    let filterDistributors = [];
    let searchString = "";
    filterDistributors = Distributors.filter((distributor) => {
        searchString =
            distributor.firstname +
            " " +
            distributor.lastname +
            " " +
            distributor.email +
            " " +
            distributor.id;
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
        filterDistributors = filterDistributors.filter(
            (distributor) => distributor.enabled == sStat
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

    setDistributorsListHtml(filterDistributors);
};

const setDistributorsWidgetsData = () => {
    // $.ajax({
    //     type: "get",
    //     url: api.url + "pdoa/get_wifi_users_status/" + currentUser.pdoa_id,
    //     headers: {
    //         Authorization: localStorage.getItem("token"),
    //     },
    //     success: function (response) {
    //         console.log("response.data = ");
    //         console.log(response.data);
    //         // cur_week_users, expired_users, online_today, online_yesterday, prev_week_users, total_users
    //         $("#total-widget .me-1").html(response.data.total_users);
    //         $("#total-widget .counter-value").html(response.data.total_users);
    //         $("#total-widget .counter-value").attr(
    //             "data-target",
    //             response.data.total_users
    //         );

    //         $("#active-widget .me-1").html(response.data.cur_week_users);
    //         $("#active-widget .counter-value").html(
    //             response.data.cur_week_users
    //         );
    //         $("#active-widget .counter-value").attr(
    //             "data-target",
    //             response.data.cur_week_users
    //         );

    //         $("#limit-widget .me-1").html(response.data.expired_users);
    //         $("#limit-widget .counter-value").html(response.data.expired_users);
    //         $("#limit-widget .counter-value").attr(
    //             "data-target",
    //             response.data.expired_users
    //         );
    //     },
    // });
};

const setDistributorsListHtml = (data) => {
    $html = "";
    if (data.length) {
        $.each(data, (index, row) => {
            $html += `<tr>
                    <th scope="row">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="chk_child" value="option${index}">
                        </div>
                    </th>
                    <td class="id">${row.firstname} ${row.lastname}</td>
                    <td class="id">${row.pdoa.firstname} ${row.pdoa.lastname}</td>
                    <td class="id">${row.total_franchise}</td>
                    <td class="project_name">${row.total_online}</td>`;
            if (row.enabled) {
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
                                <li><button class="dropdown-item" href="javascript:void(0);" onclick="EditDistributors(this);" data-id="` +
                row.id +
                `" data-bs-toggle="modal"
                                        data-bs-target="#editDistributorModal"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
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
        $("#distributors-list").html($html);
    } else {
        $html = `<tr>
                <td colspan="9" style="text-align: center;">No data</td>
            </tr>`;
        $("#distributors-list").html($html);
    }
};

// flatpickr("#datepicker-range", {
//     mode: "range",
//     dateFormat: "d M, Y",
// });

// flatpickr("#date-field", {
//     dateFormat: "d M, Y",
// });

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
    // var pdoa_no = data.getAttribute("data-id");
    // localStorage.setItem("pdoas-list", JSON.stringify(Pdoas));
    // localStorage.setItem("option", "view-pdoa");
    // localStorage.setItem("pdoa_no", pdoa_no);
    // window.location.assign("apps-pdoas-details");
}

function EditDistributors(data) {
    let distributor_no = data.getAttribute("data-id");
    localStorage.setItem("distributor-list", JSON.stringify(Distributors));
    localStorage.setItem("distributor_no", distributor_no);
    let filterDistributors = Distributors.filter((distributor) => distributor.id == distributor_no);
    let distributor = {};
    let idProofs = ["Aadhaar", "Voter", "PAN"];
    if (filterDistributors.length > 0) {
        distributor = filterDistributors[0];
        console.log(distributor);
        $("#firstName").val(distributor.firstname);
        $("#lastName").val(distributor.lastname);
        $("#emailID").val(distributor.email);
        $("#phoneNumber").val(distributor.phone_no);
        $("#company_name").val(distributor.company_name);
        $("#designation").val(distributor.designation);
        let idProofHtml = `<option value="">Select ID Proof</option>`;
        idProofs.forEach(function (idProof) {
            if (idProof == distributor.id_proof) {
                idProofHtml += `<option value="${idProof}" selected="selected">${idProof}</option>`;
            } else {
                idProofHtml += `<option value="${idProof}">${idProof}</option>`;
            }
        });
        $("#id_proof").html(idProofHtml);
        $("#id_proof_no").val(distributor.id_proof_no);
        $("#address").val(distributor.address);
        $("#city").val(distributor.city);
        $("#state").val(distributor.state);
        $("#country").val(distributor.country);
        $("#postal_code").val(distributor.postal_code);
        $("#gst_no").val(distributor.gst_no);
        $("#revenue_model").val(distributor.revenue_model);
        $("#revenue_sharing_ratio").val(distributor.revenue_sharing_ratio);
        $("#beneficiary_name").val(distributor.beneficiary_name);
        $("#ifsc_code").val(distributor.ifsc_code);
        $("#ac_no").val(distributor.ac_no);

        let backend_path = api.domain;

        $("#preview_passbook_cheque").html("");
        let arr_exe_ = distributor.passbook_cheque.split(".");
        if (
            arr_exe_[arr_exe_.length - 1] == "pdf" ||
            arr_exe_[arr_exe_.length - 1] == "PDF"
        ) {
            $("#preview_passbook_cheque").append(
                `<img src="${backend_path}default_pdf.png" width="200px;" height="200px" style="padding: 10px">`
            );
        } else {
            $("#preview_passbook_cheque").append(
                `<img src="${
                    backend_path +
                    distributor.passbook_cheque.replaceAll("public", "storage")
                }" width="200px;" height="200px" style="padding: 10px">`
            );
        }
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
            if ($("#id_proof_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "ID Proof Number field is required."
                        : str_note +
                          "<br />" +
                          "ID Proof Number field is required.";
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
            if ($("#beneficiary_name").val() == "") {
                str_note = "Beneficiary name field is required.";
            }
            if ($("#ifsc_code").val() == "") {
                str_note =
                    str_note == ""
                        ? "IFSC Code field is required."
                        : str_note + "<br />" + "IFSC Code field is required.";
            }
            if ($("#ac_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "A/C No field is required."
                        : str_note + "<br />" + "A/C No field is required.";
            }

            break;
        default:
            break;
    }

    return str_note;
}

function submitDistributorDetail() {
    let formData = new FormData();

    $("#passbook_cheque").prop("files")[0] &&
        formData.append(
            "passbook_cheque",
            $("#passbook_cheque").prop("files")[0]
        );
    formData.append("firstname", $("#firstName").val());
    formData.append("lastname", $("#lastName").val());
    formData.append("username", $("#emailID").val());
    formData.append("email", $("#emailID").val());
    formData.append("phone_no", $("#phoneNumber").val());
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
    formData.append("revenue_model", $("#revenue_model").val());
    formData.append("revenue_sharing_ratio", $("#revenue_sharing_ratio").val());
    formData.append("beneficiary_name", $("#beneficiary_name").val());
    formData.append("ifsc_code", $("#ifsc_code").val());
    formData.append("ac_no", $("#ac_no").val());

    let distributorID = localStorage.getItem("distributor_no");

    if (distributorID != -1 && localStorage.getItem("distributor_no")) {
        $.ajax({
            type: "post",
            url: `${api.url}users/updateuser/${distributorID}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    distributorID = response.data.id;
                    $("#oq-4 .success_message").html(response.message);
                    $("#oq-4 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-4 .success_message").fadeOut("slow");
                        $("#editDistributorModal").modal().hide();
                        window.location.href = "/service/distributor/manage-distributors";
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
                        if (response.data.username) {
                            str_note =
                                str_note == ""
                                    ? response.data.username[0]
                                    : str_note +
                                      "<br />" +
                                      response.data.username[0];
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
                            submitDistributorDetail();
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
