
var Categories = [{
    id: '111',
    name: 'test1',
    unit: '123',
    tax_preference: '3333',
    hsn_code: "1232",
    tax_rate: 123,
    status: 'active',
}];


//ist form-check-all
Categories.forEach(function(raw) {
    let badge;
    switch (raw.status) {
        case 'active':
            badge = "success";
            break;
        case 'non-active':
            badge = "warning";
    }

    var tableRawData = `<tr>
                <th scope="row">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="chk_child" value="${raw.id}">
                    </div>
                </th>
                <td class="id"><a href="javascript:void(0);" onclick="ViewCategory(this);" data-id="` + raw.id + `" class="fw-medium link-primary">` + raw.name + `</a></td>
                <td class="customer_name">`+raw.unit+`</td>
                <td class="customer_name">`+raw.tax_preference+`</td>
                <td class="customer_name">`+raw.hsn_code+`</td>
                <td class="customer_name">`+raw.tax_rate+`</td>
                <td class="status"><span class="badge badge-soft-` + badge + ` text-uppercase">` + raw.status + `</span>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ri-more-fill align-middle"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><button class="dropdown-item" href="javascript:void(0);" onclick="EditCateogry(this);" data-id="` + raw.id + `"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                    Edit</button></li>
                            <li class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteCategory">
                                    <i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>`;

    document.getElementById('category-list-data').innerHTML += tableRawData;
});

document.addEventListener("DOMContentLoaded", function() {
    var genericExamples = document.querySelectorAll('[data-plugin="choices"]');
    genericExamples.forEach(function(genericExamp) {
        var element = genericExamp;
        new Choices(element, {
            placeholderValue: "This is a placeholder set in the config",
            searchPlaceholderValue: "Search results here",
        });
    });
});


var checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.onclick = function() {
        var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
        if (checkAll.checked == true) {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = true;
                checkbox.closest("tr").classList.add("table-active");
            });
        } else {
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
                checkbox.closest("tr").classList.remove("table-active");
            });
        }
    };
}


//Table
var options = {
    valueNames: [
        "name",
        "unit",
        "tax_preference",
        "hsn_code",
        "tax_rate",
        "status",
    ],
    page: 10,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2,
        }),
    ],
};

// Init list
var CategoryList = new List("CategoryList", options).on(
    "updated",
    function(list) {
        list.matchingItems.length == 0 ?
            (document.getElementsByClassName("noresult")[0].style.display = "block") :
            (document.getElementsByClassName("noresult")[0].style.display = "none");
        var isFirst = list.i == 1;
        var isLast = list.i > list.matchingItems.length - list.page;
        // make the Prev and Nex buttons disabled on first and last pages accordingly
        document.querySelector(".pagination-prev.disabled") ?
            document.querySelector(".pagination-prev.disabled").classList.remove("disabled") : "";
        document.querySelector(".pagination-next.disabled") ?
            document.querySelector(".pagination-next.disabled").classList.remove("disabled") : "";
        if (isFirst) {
            document.querySelector(".pagination-prev").classList.add("disabled");
        }
        if (isLast) {
            document.querySelector(".pagination-next").classList.add("disabled");
        }
        if (list.matchingItems.length <= perPage) {
            document.querySelector(".pagination-wrap").style.display = "none";
        } else {
            document.querySelector(".pagination-wrap").style.display = "flex";
        }
        if (list.matchingItems.length == perPage) {
            document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click();
        }
        if (list.matchingItems.length > 0) {
            document.getElementsByClassName("noresult")[0].style.display = "none";
        } else {
            document.getElementsByClassName("noresult")[0].style.display = "block";
        }
    }
);

// isCount = new DOMParser().parseFromString(
//     CategoryList.items.slice(-1)[0]._values.id,
//     "text/html"
// );

// var isValue = isCount.body.firstElementChild.innerHTML;

var idField = document.getElementById("orderId"),
    customerNameField = document.getElementById("customername-field"),
    emailField = document.getElementById("email-field"),
    dateField = document.getElementById("date-field"),
    countryField = document.getElementById("country-field"),
    statusField = document.getElementById("delivered-status"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn");
refreshCallbacks();
// filterContact("All");

// function filterContact(isValue) {
//     var values_status = isValue;
//     CategoryList.filter(function(data) {
//         var statusFilter = false;
//         matchData = new DOMParser().parseFromString(
//             data.values().status,
//             "text/html"
//         );
//         var status = matchData.body.firstElementChild.innerHTML;
//         if (status == "All" || values_status == "All") {
//             statusFilter = true;
//         } else {
//             statusFilter = status == values_status;
//         }
//         return statusFilter;
//     });

//     CategoryList.update();
// }

// function updateList() {
//     var values_status = document.querySelector("input[name=status]:checked").value;
//     data = userList.filter(function(item) {
//         var statusFilter = false;
//         if (values_status == "All") {
//             statusFilter = true;
//         } else {
//             statusFilter = item.values().sts == values_status;
//         }
//         return statusFilter;
//     });
//     userList.update();
// }

// var table = document.getElementById("CategoryTable");
// // save all tr
// var tr = table.getElementsByTagName("tr");
// var trlist = table.querySelectorAll(".list tr");

// function SearchData() {
//     var isstatus = document.getElementById("idStatus").value;
//     var pickerVal = document.getElementById("datepicker-range").value;

//     var date1 = pickerVal.split(" to ")[0];
//     var date2 = pickerVal.split(" to ")[1];

//     CategoryList.filter(function(data) {
//         matchData = new DOMParser().parseFromString(
//             data.values().status,
//             "text/html"
//         );
//         var status = matchData.body.firstElementChild.innerHTML;
//         var statusFilter = false;
//         var dateFilter = false;

//         if (status == "all" || isstatus == "all") {
//             statusFilter = true;
//         } else {
//             statusFilter = status == isstatus;
//         }

//         if (new Date(data.values().date.slice(0, 12)) >= new Date(date1) && new Date(data.values().date.slice(0, 12)) <= new Date(date2)) {
//             dateFilter = true;
//         } else {
//             dateFilter = false;
//         }

//         if (statusFilter && dateFilter) {
//             return statusFilter && dateFilter;
//         } else if (statusFilter && pickerVal == "") {
//             return statusFilter;
//         } else if (dateFilter && pickerVal == "") {
//             return dateFilter;
//         }
//     });
//     CategoryList.update();
// }

function ischeckboxcheck() {
    document.getElementsByName("checkAll").forEach(function(x) {
        x.addEventListener("click", function(e) {
            if (e.target.checked) {
                e.target.closest("tr").classList.add("table-active");
            } else {
                e.target.closest("tr").classList.remove("table-active");
            }
        });
    });
}

function refreshCallbacks() {
    removeBtns.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.target.closest("tr").children[1].innerText;
            itemId = e.target.closest("tr").children[1].innerText;
            var itemValues = CategoryList.get({
                id: itemId,
            });

            itemValues.forEach(function(x) {
                deleteid = new DOMParser().parseFromString(x._values.id, "text/html");

                var isElem = deleteid.body.firstElementChild;
                var isdeleteid = deleteid.body.firstElementChild.innerHTML;
                if (isdeleteid == itemId) {
                    document.getElementById("delete-record").addEventListener("click", function() {
                        CategoryList.remove("id", isElem.outerHTML);
                        document.getElementById("deleteCategory").click();
                    });
                }
            });
        });
    });
// }

document.querySelector("#CategoryList").addEventListener("click", function() {
    // refreshCallbacks();
    ischeckboxcheck();
});

// function clearFields() {
//     customerNameField.value = "";
//     emailField.value = "";
//     dateField.value = "";
//     countryField.value = "";
// }

// document.querySelector(".pagination-next").addEventListener("click", function() {
//     document.querySelector(".pagination.listjs-pagination") ?
//         document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
//         document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click() : "" : "";
// });

// document.querySelector(".pagination-prev").addEventListener("click", function() {
//     document.querySelector(".pagination.listjs-pagination") ?
//         document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
//         document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click() : "" : "";
// });

// function ViewCategory(data) {
//     var id = data.getAttribute('data-id');
//     localStorage.setItem("invoices-list", JSON.stringify(Invoices));
//     localStorage.setItem("option", "view-invoice");
//     localStorage.setItem("id", id);
//     window.location.assign("apps-invoices-details")
// }

// function EditCateogry(data) {
//     var id = data.getAttribute('data-id');
//     localStorage.setItem("invoices-list", JSON.stringify(Invoices));
//     localStorage.setItem("option", "edit-invoice");
//     localStorage.setItem("id", id);
//     window.location.assign("apps-invoices-create")
// }

// // Delete Multiple Records
// function deleteMultiple() {
//     ids_array = [];
//     var items = document.getElementsByName('chk_child');
//     items.forEach(function(ele) {
//         if (ele.checked == true) {
//             ids_array.push(ele.value);
//         }
//     });

//     if (typeof ids_array !== 'undefined' && ids_array.length > 0) {
//         if (confirm('Are you sure you want to delete this?')) {
//             ids_array.forEach(function(id) {
//                 CategoryList.remove("id", `<a href="javascript:void(0);" onclick="ViewCategory(this);" data-id="` + id.slice(3) + `" class="fw-medium link-primary">${id}</a>`);
//             });
//             document.getElementById('checkAll').checked = false;
//         } else {
//             return false;
//         }
//     } else {
//         Swal.fire({
//             title: 'Please select at least one checkbox',
//             confirmButtonClass: 'btn btn-info',
//             buttonsStyling: false,
//             showCloseButton: true
//         });
//     }
// }
