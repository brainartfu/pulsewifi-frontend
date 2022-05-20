
var Categories = [{
    id: 5,
    name: 'test1',
    unit: '123',
    tax_preference: '1',
    hsn_code: "1232",
    tax_rate: 123,
    status: '0',
}];
function init() {
	$.ajax({
	    type: "post",
	    url: api.url + "inventory/get_category_brand_model",
	    success: function(response) {
	    	const data = response.data;
	    	console.log(data)
	    	if (response.success) {
				let categoryhtml = '';
				for (var i = 0; i < data.category.length; i++) {
					categoryhtml +=`<option value="${data.category[i]['id']}">${data.category[i]['name']}</option> `
				}
				$("#new-stock-category").html(categoryhtml);
				let modelhtml = '';
				for (var i = 0; i < data.model.length; i++) {
					modelhtml +=`<option value="${data.model[i]['id']}">${data.model[i]['name']}</option> `
				}
				$("#new-stock-model").html(modelhtml);
                let brandhtml = '';
                for (var i = 0; i < data.brand.length; i++) {
                    brandhtml +=`<option value="${data.brand[i]['id']}">${data.brand[i]['name']}</option> `
                }
                $("#new-stock-brand").html(brandhtml);
	    	}

	    },
	    error: function(error) {
	        
	    }
	})
}
function UpdateStockList () {
    $.ajax({
        type: "post",
        url: api.url + "inventory/get-stock",
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
                        case 2:
                            badge = "info";
                            break;
                        case 3:
                            badge = "warning";
                            break;
                        case 4:
                            badge = "danger";
                            break;
                    }

                    var tableRawData = `<tr>
                                <th scope="row">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="chk_child" value="${raw.id}">
                                    </div>
                                </th>
                                <td class="id"  style="display: none;">`+raw.id+`</td>
                                <td class="name">`+raw.name+`</td>
                                <td class="category_name">`+raw.category_name+`</td>
                                <td class="brand_name">` + raw.brand_name + `</td>
                                <td class="model_name">`+raw.model_name+`</td>
                                <td class="mac_address">`+raw.mac_address+`</td>
                                <td class="serial_num">`+raw.serial_num+`</td>
                                <td class="wlan0">`+raw.wlan0+`</td>
                                <td class="wlan1">`+raw.wlan1+`</td>
                                <td class="user_name">`+raw.user_name+`</td>
                                <td class="location">`+raw.location_id+`</td>
                                <td class="status"><span class="badge badge-soft-` + badge + ` text-uppercase">` + (raw.status?'Active':'Non Active') + `</span>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="ri-more-fill align-middle"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li><button class="dropdown-item" href="javascript:void(0);" onclick="EditStock(this);" data-id="` + raw.id + `"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                    Edit</button></li>
                                            <li class="dropdown-divider"></li>
                                            <li>
                                                <a class="dropdown-item remove-item-btn" data-bs-toggle="modal"  href="javascript:void(0);" onclick="DeleteStock(this)" data-id="`+raw.id+`">
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
UpdateStockList();
init();
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
let StockList = {};
function initTable() {
    console.log('init')
        StockList = new List("StockList", options).on(
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

function SearchData() {
    const searchname = $('#search-name').val();
    const searchhsn = $('#search-hsn').val();
    const searchstatus = $('#search-status').val();

    StockList.filter(function(data) {
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        const filter = true;
        let status = matchData.body.firstElementChild.innerHTML;
        status = status==='Active'?1:0;
        if (searchname && searchname !== data.values().name) {
            return false
        }   
        if (searchhsn && searchhsn !== data.values().hsn_code) {
            return false
        }
        if (searchstatus !== '' && searchstatus*1 !== status) {
            return false
        }
        return true;
    });
    StockList.update();
}

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


document.querySelector("#StockList").addEventListener("click", function() {
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


function DeleteStock(data, multi = false) {
    const ids = multi?data:[data.getAttribute('data-id')];
    if (confirm('Are you sure you want to delete this?')) {
      $.ajax({
        type: "post",
        url: api.url + "inventory/delete-stock",
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
                    StockList.remove("id", id);
                });
                document.getElementById('checkAll').checked = false;
                UpdateStockList(true);
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
function EditStock(data) {
    const id = data.getAttribute('data-id');
    const editData = Categories.filter((obj)=>obj.id==id);
    console.log(editData)
    $('#new-stock-id').val(id);
    $('#new-stock-category').val(editData[0]['category']);
    $('#new-stock-brand').val(editData[0]['brand']);
    $('#new-stock-model').val(editData[0]['model_id']);
    $('#new-stock-mac').val(editData[0]['mac']);
    $('#new-stock-serial').val(editData[0]['serial_num']);
    $('#new-stock-wlan0').val(editData[0]['wlan0']);
    $('#new-stock-wlan1').val(editData[0]['wlan1']);
    $('#new-stock-configure').val(editData[0]['configure']);
    $('#new-stock-status').val(editData[0]['status']);
    $("#new-stock-modal").modal('show');
}

function newStock() {
  $('#new-stock-id').val('');
  // $('#new-stock-category').val('');
  // $('#new-stock-brand').val('');
  // $('#new-stock-model').val('');
  $('#new-stock-mac').val('');
  $('#new-stock-serial').val('');
  $('#new-stock-wlan0').val('');
  $('#new-stock-wlan1').val('');
  $('#new-stock-configure').val('1');
  $('#new-stock-status').val('1');
  $("#new-stock-modal").modal('show');
}
$('#new-stock-save').click(function() {
    $.ajax({
          type: "post",
          url: api.url + "inventory/new-stock",
          data: {
            id: $('#new-stock-id').val(),
            category: $('#new-stock-category').val(),
            brand: $('#new-stock-brand').val(),
            model_id: $('#new-stock-model').val(),
            mac_address: $('#new-stock-mac').val(),
            serial: $('#new-stock-serial').val(),
            wlan0: $('#new-stock-wlan0').val(),
            wlan1: $('#new-stock-wlan1').val(),
            configure: $('#new-stock-configure').val(),
            status: $('#new-stock-status').val()
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
                UpdateStockList();
            }
            $('#add-stock-modal').modal('hide')
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
            DeleteStock(ids_array, true);
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
