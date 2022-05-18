
var Categories = [{
    id: 5,
    name: 'test1',
    unit: '123',
    tax_preference: '1',
    hsn_code: "1232",
    tax_rate: 123,
    status: '0',
}];
$.ajax({
    type: "post",
    url: api.url + "inventory/get_category",
    success: function(response) {
        const data = response.data;
        console.log(data)
        if (response.success) {
           Categories = response.data;
            Categories.forEach(function(raw) {
                console.log(raw)
                let badge;
                switch (raw.status) {
                    case '1':
                        badge = "success";
                        break;
                    case '0':
                        badge = "warning";
                }

                var tableRawData = `<tr>
                            <th scope="row">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="chk_child" value="${raw.id}">
                                </div>
                            </th>
                            <td class="hidden"  style="display: none;"><a href="javascript:void(0);" data-id="` + raw.id + `" class="fw-medium link-primary">` + raw.id + `</a></td>
                            <td class="name">` + raw.name + `</td>
                            <td class="unit">`+raw.unit+`</td>
                            <td class="tax_preference">`+(raw.tax_preference?'Taxable':'None-Taxable')+`</td>
                            <td class="hsn_code">`+raw.hsn_code+`</td>
                            <td class="tax_rate">`+raw.tax_rate+`</td>
                            <td class="status"><span class="badge badge-soft-` + badge + ` text-uppercase">` + (raw.status?'Active':'Non Active') + `</span>
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
                                            <a class="dropdown-item remove-item-btn" data-bs-toggle="modal"  href="javascript:void(0);" onclick="DeleteCategory(this)" data-id="`+raw.id+`">
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
        }

    },
    error: function(error) {
        
    }
})

//ist form-check-all

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

const perPage = 10;
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
}

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

function DeleteCategory(data, multi = false) {
    const ids = multi?data:[data.getAttribute('data-id')];
    if (confirm('Are you sure you want to delete this?')) {
      $.ajax({
        type: "post",
        url: api.url + "inventory/delete-category",
        data: {ids:ids},
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function(response) {
          if (response.success) {
            if (response.success) {
              Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'O K'
              })

              ids.forEach(function(id) {
                // <td class="id"><a href="javascript:void(0);" data-id="` + raw.id + `" class="fw-medium link-primary">` + raw.name + `</a></td>
                  // CategoryList.remove("id", `<a href="javascript:void(0);" onclick="ViewCategory(this);" data-id="` + id.slice(3) + `" class="fw-medium link-primary">${id}</a>`);
              });
            }
          }
        },
        error: function(error) {
            // error.status == 0 && (window.location.href = "/login");
            // error.status == 404 && (window.location.href = "/auth-404-basic");
        }
      })
    } else {
      return false;
    }
}
function EditCateogry(data) {
    const id = data.getAttribute('data-id');
    const editData = Categories.filter((obj)=>obj.id==id);
    console.log(editData)
    $('#new-category-name').val(editData[0].name);
    $('#new-category-unit').val(editData[0].unit);
    $('#new-category-tax_preference').val(editData[0].tax_preference);
    $('#new-category-hsn_code').val(editData[0].hsn_code);
    $('#new-category-tax_rate').val(editData[0].tax_rate);
    $('#new-category-status').val(editData[0].status);
    $('#new-category-id').val(id);
    $('#add-category-modal').modal('toggle');
}

function newCategory() {
  $('#new-category-name').val('');
  $('#new-category-unit').val('');
  $('#new-category-hsn_code').val('');
  $('#new-category-tax_rate').val('');
  $('#new-category-id').val('new');
  $('#add-category-modal').modal('toggle')
}
$('#new-category-save').click(function() {
    $.ajax({
          type: "post",
          url: api.url + "inventory/new-category",
          data: {
            name: $('#new-category-name').val(),
            unit: $('#new-category-unit').val(),
            tax_preference: $('#new-category-tax_preference').val(),
            hsn_code: $('#new-category-hsn_code').val(),
            tax_rate: $('#new-category-tax_rate').val(),
            status: $('#new-category-status').val(),
            id: $('#new-category-id').val(),
          },
          headers: {
              Authorization: localStorage.getItem("token"),
          },
          success: function(response) {
            if (response.success) {
              if (response.success) {
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'O K'
            })
              }
            }
        $('#add-model-modal').modal('hide')

          },
          error: function(error) {
              error.status == 0 && (window.location.href = "/login");
              error.status == 404 && (window.location.href = "/auth-404-basic");
          }
    })
})
// Delete Multiple Records
function deleteMultiple() {
    ids_array = [];
    var items = document.getElementsByName('chk_child');
    items.forEach(function(ele) {
        if (ele.checked == true) {
            ids_array.push(ele.value);
        }
    });

    if (typeof ids_array !== 'undefined' && ids_array.length > 0) {
        if (confirm('Are you sure you want to delete this?')) {
            DeleteCategory(ids_array, true);
            ids_array.forEach(function(id) {
              // <td class="id"><a href="javascript:void(0);" data-id="` + raw.id + `" class="fw-medium link-primary">` + raw.name + `</a></td>
                CategoryList.remove("id", `<a href="javascript:void(0);" data-id="` + id + `" class="fw-medium link-primary">` + id + `</a>`);
            });

            document.getElementById('checkAll').checked = false;
        } else {
            return false;
        }
    } else {
        Swal.fire({
            title: 'Please select at least one checkbox',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false,
            showCloseButton: true
        });
    }
}
