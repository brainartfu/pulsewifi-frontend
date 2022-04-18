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

let distributorID = -1;
let distributorFee = 0;
let inventoryID = -1;
let inventoryList = [];
let invoiceList = [];
let Pdoas = [];
let pdoaInfo = {};

function getInventoryAndUserFees() {
    $.ajax({
        type: "get",
        url: `${api.url}role/get_role/${currentUser.role}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            if (response.data.Distributor) {
                $.ajax({
                    type: "get",
                    url: `${api.url}products/get_inventory/${
                        JSON.parse(localStorage.getItem("pdoaInfo")).id
                    }`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        let str = "";
                        $("#inventory_list").html("");
                        response.data.map((ele) => {
                            inventoryList.push(ele);
                            str += `<option value="${ele.id}">${ele.name}</option>`;
                        });
                        $("#inventory_list").html(str);
                    },
                    error: function (error) {
                        error.status == 401 && ClearSession();
                    },
                });

                // setInterval(function () {
                //     $.ajax({
                //         type: "get",
                //         url: `${api.url}products/get_inventory/${
                //             JSON.parse(localStorage.getItem("pdoaInfo")).id
                //         }`,
                //         headers: {
                //             Authorization: localStorage.getItem("token"),
                //         },
                //         success: function (response) {
                //             inventoryList = [];
                //             response.data.map((ele) => {
                //                 inventoryList.push(ele);
                //             });
                //             inventoryList.map((ele) => {
                //                 if (ele.id == inventoryID) {
                //                     $("#price").val("₹" + ele.price);
                //                     $("#max_quantity").val(ele.left_inventory);
                //                 }
                //             });
                //         },
                //         error: function (error) {
                //             error.status == 401 && ClearSession();
                //         },
                //     });
                // }, 3000);

                $.ajax({
                    type: "get",
                    url: `${api.url}users/get_user_fees/${
                        JSON.parse(localStorage.getItem("pdoaInfo")).id
                    }`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        distributorFee = response.data.distributor_fee;
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

$("#pdoa_id").on("change", (e) => {
    pdoaID = e.target.value;
    Pdoas.map((ele) => {
        if (ele.id == pdoaID) {
            pdoaInfo = ele;
            localStorage.setItem("pdoaInfo", JSON.stringify(ele));
            getInventoryAndUserFees();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    distributorID = -1;

    $.ajax({
        type: "get",
        url: api.url + "pdoa/get",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function (response) {
            Pdoas = response.data;
            let str = `<option value="">Select Pdoa</option>`;
            response.data.map((ele) => {
                str += `<option value="${ele.id}">${ele.firstname} ${ele.lastname} [${ele.id}]</option>`;
            });
            $("#pdoa_id").html(str);
        },
        error: function (error) {
            error.status == 0 && (window.location.href = "/login");
            error.status == 404 && (window.location.href = "/auth-404-basic");
        },
    });

    $("#btn_addInventory").on("click", () => {
        let max_quantity = Number($("#max_quantity").val());
        let quantity = Number($("#quantity").val());
        if (quantity > 0 && quantity < max_quantity + 1) {
            inventoryList.map((ele) => {
                if (ele.id == inventoryID) {
                    let data = [];
                    data.push(ele.name);
                    data.push(ele.price);
                    data.push(Number(quantity));
                    data.push(ele.price * Number(quantity));
                    data.push(ele.id);
                    if (invoiceList.length == 0) {
                        $.ajax({
                            type: "get",
                            url: `${api.url}cart/add_cart/${distributorID}/${
                                ele.id
                            }/${Number(quantity)}`,
                            headers: {
                                Authorization: localStorage.getItem("token"),
                            },
                            success: function (response) {
                                if (response.success) {
                                    data.push(response.data[0].id);
                                    invoiceList.push(data);
                                    ele.left_inventory -= Number(quantity);
                                    $("#max_quantity").val(ele.left_inventory);
                                    makeInvoiceList();
                                    $("#success_message").html(
                                        response.message
                                    );

                                    $("#success_message").fadeIn("slow");
                                    setTimeout(function () {
                                        $("#success_message").fadeOut("slow");
                                    }, 1000);
                                } else {
                                    $("#error_message").html(response.message);

                                    $("#error_message").fadeIn("slow");
                                    setTimeout(function () {
                                        $("#error_message").fadeOut("slow");
                                    }, 1000);
                                }
                            },
                            error: function (error) {
                                error.status == 401 && ClearSession();
                            },
                        });
                    } else {
                        let addFlag = true;
                        invoiceList.map((e) => {
                            if (e[4] == inventoryID) {
                                addFlag = false;
                                e[2] += Number(quantity);
                                e[3] = ele.price * e[2];
                                $.ajax({
                                    type: "get",
                                    url: `${api.url}cart/update_cart/${e[5]}/${e[2]}`,
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("token"),
                                    },
                                    success: function (response) {
                                        if (response.success) {
                                            ele.left_inventory -=
                                                Number(quantity);
                                            $("#max_quantity").val(
                                                ele.left_inventory
                                            );
                                            makeInvoiceList();
                                            $("#success_message").html(
                                                response.message
                                            );

                                            $("#success_message").fadeIn(
                                                "slow"
                                            );
                                            setTimeout(function () {
                                                $("#success_message").fadeOut(
                                                    "slow"
                                                );
                                            }, 1000);
                                        } else {
                                            $("#error_message").html(
                                                response.message
                                            );

                                            $("#error_message").fadeIn("slow");
                                            setTimeout(function () {
                                                $("#error_message").fadeOut(
                                                    "slow"
                                                );
                                            }, 1000);
                                        }
                                    },
                                    error: function (error) {
                                        error.status == 401 && ClearSession();
                                    },
                                });
                            }
                        });
                        if (addFlag) {
                            $.ajax({
                                type: "get",
                                url: `${
                                    api.url
                                }cart/add_cart/${distributorID}/${
                                    ele.id
                                }/${Number(quantity)}`,
                                headers: {
                                    Authorization:
                                        localStorage.getItem("token"),
                                },
                                success: function (response) {
                                    if (response.success) {
                                        data.push(
                                            response.data[
                                                response.data.length - 1
                                            ].id
                                        );
                                        invoiceList.push(data);
                                        ele.left_inventory -= Number(quantity);
                                        $("#max_quantity").val(
                                            ele.left_inventory
                                        );
                                        makeInvoiceList();
                                        $("#success_message").html(
                                            response.message
                                        );

                                        $("#success_message").fadeIn("slow");
                                        setTimeout(function () {
                                            $("#success_message").fadeOut(
                                                "slow"
                                            );
                                        }, 1000);
                                    } else {
                                        $("#error_message").html(
                                            response.message
                                        );

                                        $("#error_message").fadeIn("slow");
                                        setTimeout(function () {
                                            $("#error_message").fadeOut("slow");
                                        }, 1000);
                                    }
                                },
                                error: function (error) {
                                    error.status == 401 && ClearSession();
                                },
                            });
                        }
                    }
                }
            });
        }
    });

    $("#inventory_list").on("change", (e) => {
        inventoryID = e.target.value;
        inventoryList.map((ele) => {
            if (ele.id == inventoryID) {
                $("#price").val("₹" + ele.price);
                $("#max_quantity").val(ele.left_inventory);
                $("#quantity").val(0);
            }
        });
    });

    $("#passbook_cheque").on("change", function () {
        $("#preview_passbook_cheque").html("");
        let arr_exe = document
            .getElementById("passbook_cheque")
            .value.split(".");
        if (
            arr_exe[arr_exe.length - 1] == "pdf" ||
            arr_exe[arr_exe.length - 1] == "PDF"
        ) {
            let backend_path = api.domain;
            $("#preview_passbook_cheque").append(
                `<img src="${backend_path}default_pdf.png" width="200px;" height="200px" style="padding: 10px">`
            );
        } else {
            $("#preview_passbook_cheque").append(
                '<img src="' +
                    URL.createObjectURL(
                        document.getElementById("passbook_cheque").files[0]
                    ) +
                    '" width="200px;" height="200px" style="padding: 10px">'
            );
        }
    });
});

function getPDOA() {
    $.ajax({
        type: "get",
        url: `${api.url}role/get_role/${currentUser.role}`,
        headers: { Authorization: localStorage.getItem("token") },
        success: function (response) {
            if (response.data.Add_PDOA) {
                $.ajax({
                    type: "get",
                    url: `${api.url}pdoa_plan/get_pdoa_plans`,
                    headers: { Authorization: localStorage.getItem("token") },
                    success: function (response) {
                        let str = "";
                        $("#pdoa_plan").html("");
                        response.data.map((ele) => {
                            pdoaPlanList.push(ele);
                            str += `<option value="${ele.id}">${ele.plan_name}</option>`;
                        });
                        $("#pdoa_plan").html(str);
                        setCartPdoaPlan();
                    },
                });
            } else {
                error.status == 0 && (window.location.href = "/login");
            }
        },
        error: function (error) {
            error.status == 0 && (window.location.href = "/login");
        },
    });
}

function setCartPdoaPlan(pdoaPlanId = 0) {
    if (pdoaPlanList.length > 0) {
        let selectedPdoaPlan = {};
        if (pdoaPlanId) {
            pdoaPlanList.map((ele) => {
                if (ele.id == pdoaPlanId) {
                    selectedPdoaPlan = ele;
                }
            });
        } else {
            selectedPdoaPlan = pdoaPlanList[0];
        }
        if (selectedPdoaPlan?.id) {
            $("#pdoa-cart-detail").html("");
            let str = "";
            str = `<li class="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 class="my-0">PDOA Plan</h6>
                                        <small class="text-muted">${selectedPdoaPlan.plan_name} : Max. WiFi Router is ${selectedPdoaPlan.max_wifi_router_count}</small>
                                    </div>
                                    <span class="text-muted">Rs. ${selectedPdoaPlan.price}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between bg-light">
                                    <div class="text-success">
                                        <h6 class="my-0">Discount code</h6>
                                        <small>Rs. 0 Discount</small>
                                    </div>
                                    <span class="text-success">Rs. 0</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total (INR)</span>
                                    <strong>Rs.  ${selectedPdoaPlan.price}</strong>
                                </li>`;
            $("#pdoa-cart-detail").html(str);
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
            if ($("#firstname").val() == "") {
                str_note = "First Name field is required.";
            }
            if ($("#lastname").val() == "") {
                str_note =
                    str_note == ""
                        ? "Last Name field is required."
                        : str_note + "<br />" + "Last Name field is required.";
            }
            if ($("#email").val() == "") {
                str_note =
                    str_note == ""
                        ? "Email field is required."
                        : str_note + "<br />" + "Email field is required.";
            } else {
                if (!ValidateEmail($("#email").val())) {
                    str_note =
                        str_note == ""
                            ? "You have entered an invalid email address."
                            : str_note +
                              "<br />" +
                              "You have entered an invalid email address.";
                }
            }
            if ($("#phone_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "Phone Number field is required."
                        : str_note +
                          "<br />" +
                          "Phone Number field is required.";
            } else if ($("#phone_no").val().length != 10) {
                str_note =
                    str_note == ""
                        ? "Phone number must be 10 characters."
                        : str_note +
                          "<br />" +
                          "Phone number must be 10 characters.";
            }
            if ($("#cin_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "CIN No field is required."
                        : str_note + "<br />" + "CIN No field is required.";
            }
            if ($("#upload_certificate").val() == "") {
                str_note =
                    str_note == ""
                        ? "Upload Incorporation Certificate field is required."
                        : str_note +
                          "<br />" +
                          "Upload Incorporation Certificate field is required.";
            }
            if ($("#id_proof_no").val() == "") {
                str_note =
                    str_note == ""
                        ? "ID Proof Number field is required."
                        : str_note +
                          "<br />" +
                          "ID Proof Number field is required.";
            }
            if ($("#pdoa_id").val() == "") {
                str_note =
                    str_note == ""
                        ? "PDOA field is required."
                        : str_note + "<br />" + "PDOA field is required.";
            }
            if ($("#password").val() == "") {
                str_note =
                    str_note == ""
                        ? "Password field is required."
                        : str_note + "<br />" + "Password field is required.";
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
                str_note =
                    str_note == ""
                        ? "Confirm Password field is required."
                        : str_note +
                          "<br />" +
                          "Confirm Password field is required.";
            } else {
                if (
                    $("#password").val() != "" &&
                    $("#password").val() != $("#password_confirmation").val()
                ) {
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
        case "oq-3":
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
            if ($("#passbook_cheque").val() == "") {
                str_note =
                    str_note == ""
                        ? "Upload Passbook / Cancelled Cheque field is required."
                        : str_note +
                          "<br />" +
                          "Upload Passbook / Cancelled Cheque field is required.";
            }
            break;
        case "oq-4":
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
    formData.append("firstname", $("#firstname").val());
    formData.append("lastname", $("#lastname").val());
    formData.append("username", $("#email").val());
    formData.append("email", $("#email").val());
    formData.append("phone_no", $("#phone_no").val());
    formData.append("company_name", $("#company_name").val());
    formData.append("designation", $("#designation").val());
    formData.append("id_proof", $("#id_proof").val());
    formData.append("id_proof_no", $("#id_proof_no").val());
    formData.append("password", $("#password").val());
    formData.append("password_confirmation", $("#password_confirmation").val());
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

    $("#billed_name").html($("#firstname").val() + " " + $("#lastname").val());
    $("#billed_address").html(
        $("#address").val() + " " + $("#city").val() + " " + $("#state").val()
    );
    $("#billed_email").html($("#email").val());
    $("#billed_phone").html($("#phone_no").val());

    if (distributorID == -1) {
        $.ajax({
            type: "post",
            url: `${api.url}users/add_distributor/${
                JSON.parse(localStorage.getItem("pdoaInfo")).id
            }`,
            headers: { Authorization: localStorage.getItem("token") },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    document.getElementById("oq-4-tab").click();

                    distributorID = response.data.id;

                    $.ajax({
                        type: "get",
                        url: `${api.url}cart/add_cart/${distributorID}/distributor_fee/${distributorFee}`,
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                        success: function (response) {
                            if (response.success) {
                                if (inventoryList.length != 0) {
                                    $("#price").val(
                                        "₹" + inventoryList[0].price
                                    );
                                    $("#max_quantity").val(
                                        inventoryList[0].left_inventory
                                    );
                                    $("#quantity").val(0);
                                    inventoryID = inventoryList[0].id;
                                }
                                makeInvoiceList();
                            }
                        },
                        error: function (error) {
                            error.status == 401 && ClearSession();
                        },
                    });

                    $("#oq-4 .success_message").html(response.message);

                    $("#oq-4 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-4 .success_message").fadeOut("slow");
                    }, 3000);
                } else {
                    next_flag = false;
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

                        $("#oq-3 .error_message").html(str_note);

                        $("#oq-3 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-3 .error_message").fadeOut("slow");
                        }, 3000);
                    } else {
                        $("#oq-3 .error_message").text(response.message);

                        $("#oq-3 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-3 .error_message").fadeOut("slow");
                        }, 3000);
                    }
                }
            },
            error: function (error) {
                error.status == 401 && ClearSession();
            },
        });
    } else {
        $.ajax({
            type: "post",
            url: `${api.url}users/updateuser/${distributorID}`,
            headers: { Authorization: localStorage.getItem("token") },
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.success) {
                    document.getElementById("oq-4-tab").click();

                    distributorID = response.data.id;

                    $("#oq-4 .success_message").html(response.message);

                    $("#oq-4 .success_message").fadeIn("slow");
                    setTimeout(function () {
                        $("#oq-4 .success_message").fadeOut("slow");
                    }, 3000);
                } else {
                    next_flag = false;
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

                        $("#oq-3 .error_message").html(str_note);

                        $("#oq-3 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-3 .error_message").fadeOut("slow");
                        }, 3000);
                    } else {
                        $("#oq-3 .error_message").text(response.message);

                        $("#oq-3 .error_message").fadeIn("slow");
                        setTimeout(function () {
                            $("#oq-3 .error_message").fadeOut("slow");
                        }, 3000);
                    }
                }
            },
            error: function (error) {
                error.status == 401 && ClearSession();
            },
        });
    }
}

function submitOrderCreation() {
    $.ajax({
        type: "post",
        url: `${api.url}order/make_order`,
        headers: { Authorization: localStorage.getItem("token") },
        data: {
            user_id: distributorID,
            pdoa_id: JSON.parse(localStorage.getItem("pdoaInfo")).id,
        },
        success: function (response) {
            window.scrollTo(0, 0);
            $("#oq-4 .success_message").text(response.message);
            $("#oq-4 .success_message").fadeIn("slow");
            setTimeout(function () {
                $("#oq-4 .success_message").fadeOut("slow");
                window.location.href =
                    "/service/distributor/manage-distributors";
            }, 1000);
        },
        error: function (error) {
            error.status == 401 && ClearSession();
        },
    });
}

function makeInvoiceList() {
    $("#invoice_content").html("");
    let str = "";
    let str_ = "";
    let total_price = 0;
    invoiceList.map((ele, i) => {
        total_price += ele[3];
        str_ += `<tr>
                <td>
                    <h5 class="text-truncate font-size-14">${ele[0]}</h5>
                </td>
                <td>₹ ${ele[1]}</td>
                <td>${ele[2]}</td>
                <td class="text-end">₹ ${ele[3]}</td>
                <td class="text-end"><div class="btn btn-danger" onClick="deleteInventory(${i})"> x </div></td>
            </tr>`;
    });
    str = `<table class="table align-middle table-nowrap table-centered mb-0">
              <thead>
                  <tr>
                      <th class="fw-bold">Item</th>
                      <th class="fw-bold">Price</th>
                      <th class="fw-bold">Quantity</th>
                      <th class="text-end fw-bold" style="width: 120px;">Total</th>
                      <th class="text-end fw-bold" style="width: 120px;">Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>
                          <h5 class="text-truncate font-size-14">Distributor Fee</h5>
                      </td>
                      <td>₹ ${distributorFee}</td>
                      <td>1</td>
                      <td class="text-end">₹ ${distributorFee}</td>
                      <td></td>
                  </tr>
                  ${str_}
                  <tr>
                      <th scope="row" colspan="4" class="border-0 text-end fw-bold">Total</th>
                      <td class="border-0 text-end">
                          <h4 class="m-0 fw-semibold" id="total_price"></h4>
                      </td>
                  </tr>
              </tbody>
          </table>`;
    $("#invoice_content").html(str);
    total_price += distributorFee;
    $("#total_price").html("₹ " + total_price);
}

if (document.querySelectorAll(".form-steps"))
    document.querySelectorAll(".form-steps").forEach(function (form) {
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
                        if (currTab == "oq-3") {
                            submitDistributorDetail();
                        } else if (currTab == "oq-4") {
                            submitOrderCreation();
                        } else {
                            var nextTab =
                                nextButton.getAttribute("data-nexttab");
                            document.getElementById(nextTab).click();
                        }
                    }
                });
            });

        //Pervies tab
        if (form.querySelectorAll(".previestab"))
            form.querySelectorAll(".previestab").forEach(function (prevButton) {
                prevButton.addEventListener("click", function () {
                    var prevTab = prevButton.getAttribute("data-previous");
                    var totalDone = prevButton
                        .closest("form")
                        .querySelectorAll(".custom-nav .done").length;
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
            });

        // Step number click
        var tabButtons = form.querySelectorAll('button[data-bs-toggle="pill"]');
        if (tabButtons)
            tabButtons.forEach(function (button, i) {
                button.setAttribute("data-position", i);
                button.addEventListener("click", function () {
                    var getProgressBar =
                        button.getAttribute("data-progressbar");
                    if (getProgressBar) {
                        var totalLength =
                            document
                                .getElementById("custom-progress-bar")
                                .querySelectorAll("li").length - 1;
                        var current = i;
                        var percent = (current / totalLength) * 100;
                        document
                            .getElementById("custom-progress-bar")
                            .querySelector(".progress-bar").style.width =
                            percent + "%";
                    }
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
    });
