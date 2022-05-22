
var Categories = [{
    id: 5,
    name: 'test1',
    unit: '123',
    tax_preference: '1',
    hsn_code: "1232",
    tax_rate: 123,
    status: '0',
}];
function UpdateCategoryList () {
    $.ajax({
        type: "post",
        url: api.url + "inventory/get_category",
        success: function(response) {
            const data = response.data;
            console.log(data)
            if (response.success) {
               document.getElementById('category-list-data').innerHTML = '';
               Categories = response.data;
                Categories.forEach(function(raw) {
                    let badge;
                    switch (raw.status) {
                        case 1:
                            badge = "success";
                            break;
                        case 0:
                            badge = "warning";
                    }

                    var tableRawData = `<tr>
                                <th scope="row">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="chk_child" value="${raw.id}">
                                    </div>
                                </th>
                                <td class="id"  style="display: none;">`+raw.id+`</td>
                                <td class="name">` + raw.name + `</td>
                                <td class="unit">`+raw.unit+`</td>
                                <td class="tax_preference">`+(raw.tax_preference?'Taxable':'None-Taxable')+`</td>
                                <td class="hsn_code">`+raw.hsn_code+`</td>
                                <td class="tax_rate">`+raw.tax_rate+`%</td>
                                <td class="status"><span class="badge badge-soft-` + badge + ` text-uppercase">` + (raw.status?'Active':'Inactive') + `</span>
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
                initTable()
            }

        },
        error: function(error) {
            
        }
    })

}
UpdateCategoryList();
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
        "status"
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
let CategoryList = {};
function initTable() {
    console.log('init')
        CategoryList = new List("CategoryList", options).on(
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
    
}

$('#search-status').change(function() {
    console.log($(this))
    const searchstatus = $(this).val();
    CategoryList.filter(function(data) {
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        const filter = true;
        let status = matchData.body.firstElementChild.innerHTML;
        status = status==='Active'?1:0;
        if (searchstatus !== '' && searchstatus*1 !== status) {
            return false
        }
        return true;
    });
    CategoryList.update();
})
$('#new-category-tax_rate').keyup(function() {
    if ($(this).val() > 100) $(this).val(100);
})
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


document.querySelector("#CategoryList").addEventListener("click", function() {
    ischeckboxcheck();
});


document.querySelector(".pagination-next").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click() : "" : "";
});

document.querySelector(".pagination-prev").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click() : "" : "";
});

let deleteIds = [];

function DeleteCategory(data, multi = false) {
    deleteIds = multi?data:[data.getAttribute('data-id')];
    $('#deleteCategory').modal('show');
}
$('#delete-category-btn').click(function() {
    if (deleteIds.length > 0) {
      $.ajax({
        type: "post",
        url: api.url + "inventory/delete-category",
        data: {ids:deleteIds},
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: function(response) {
          if (response.success) {
            $('#deleteCategory').modal('hide');
            if (response.success) {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'O K'
                })

                deleteIds.forEach(function(id) {
                    CategoryList.remove("id", id);
                });
                deleteIds = [];
                document.getElementById('checkAll').checked = false;
                UpdateCategoryList(true);
            } else {
                Swal.fire({
                    title: 'Failure!',
                    text: 'Failure the delete category.',
                    icon: 'error',
                    confirmButtonText: 'O K'
                })
            }
          }
        },
        error: function(error) {
            // error.status == 0 && (window.location.href = "/login");
            // error.status == 404 && (window.location.href = "/auth-404-basic");
        }
      })
    }
})

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
    $('#new-category-save').html('Update');
    $('#category-modal-title').html('Update Category');
    $('#add-category-modal').modal('toggle');
}

function newCategory() {
  $('#new-category-name').val('');
  $('#new-category-unit').val('');
  $('#new-category-hsn_code').val('');
  $('#new-category-tax_rate').val('');
  $('#new-category-id').val('new');
    $('#new-category-save').html('Add');
    $('#category-modal-title').html('New Category');
  $('#add-category-modal').modal('toggle')
}
$('#new-category-close').click(function() {
    $('#add-category-modal').modal('hide');
})
$('#new-category-form')[0].addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    if ($('#new-category-form')[0].checkValidity() === true) {
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
                    Swal.fire({
                      title: 'Success!',
                      text: response.message,
                      icon: 'success',
                      confirmButtonText: 'O K'
                    })
                    UpdateCategoryList();
                }
                $('#new-category-form')[0].classList.remove('was-validated');
                $('#add-category-modal').modal('hide')
              },
              error: function(error) {
                  error.status == 0 && (window.location.href = "/login");
                  error.status == 404 && (window.location.href = "/auth-404-basic");
              }
        })


    }
    $('#new-category-form')[0].classList.add('was-validated');

}, false);
// $('#new-category-save').click(function() {
//     if ($('#new-category-form').checkValidity() === false) {
//         event.stopPropagation();
//         event.preventDefault();
//     }
//     $('#new-category-form').classList.add('was-validated');
// })
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
        DeleteCategory(ids_array, true);
    } else {
        Swal.fire({
            title: 'Please select at least one checkbox',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false,
            showCloseButton: true
        });
    }
}
