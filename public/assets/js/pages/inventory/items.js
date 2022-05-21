
function UpdateItemsList () {
    $.ajax({
        type: "post",
        url: api.url + "inventory/get_items",
        success: function(response) {
            const data = response.data;
            console.log(data)
            if (response.success) {
               document.getElementById('category-list-data').innerHTML = '';
               Items = response.data;
                Items.forEach(function(raw) {
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
                                <td class="category">`+raw.cName+`</td>
                                <td class="name">` + raw.name + `</td>
                                <td class="brand_logo" style="padding: 2px"><img src="${api.domain+raw.brand_logo}" height="45" alt="logo" /></td>
                                <td class="model">`+raw.model+`</td>
                                <td class="hardware_version">`+raw.hardware_version+`</td>
                                <td class="stocks">`+raw.stocks+`</td>
                                <td class="created_at">`+raw.created_at.split('T')[0]+`</td>
                                <td class="status"><span class="badge badge-soft-` + badge + ` text-uppercase">` + (raw.status?'Published':'Hidden') + `</span>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="ri-more-fill align-middle"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li><a  href="/inventory/new-item?id=`+raw.id+`"><button class="dropdown-item"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                                                    Edit</button></a></li>
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
UpdateItemsList();
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
        "id",
        "category",
        "name",
        "brand_logo",
        "model",
        "hardware_version",
        "stocks",
        "created_at",
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
let ItemList = {};
function initTable() {
    console.log('init')
        ItemList = new List("ItemList", options).on(
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
    const searchmodel = $('#search-model').val();
    const searchstatus = $('#search-status').val();

    ItemList.filter(function(data) {
        console.log(data.values())
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        const filter = true;
        let status = matchData.body.firstElementChild.innerHTML;
        status = status==='Published'?1:0;
        if (searchname && searchname !== data.values().name) {
            return false
        }   
        if (searchmodel && searchmodel !== data.values().model) {
            return false
        }
        if (searchstatus !== '' && searchstatus*1 !== status) {
            return false
        }
        return true;
    });
    ItemList.update();
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


document.querySelector("#ItemList").addEventListener("click", function() {
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


function DeleteCategory(data, multi = false) {
    const ids = multi?data:[data.getAttribute('data-id')];
    if (confirm('Are you sure you want to delete this?')) {
      $.ajax({
        type: "post",
        url: api.url + "inventory/delete-item",
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
                    ItemList.remove("id", id);
                });
                document.getElementById('checkAll').checked = false;
                UpdateItemsList(true);
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

// $(document).ready(function() {
// 	const deleteDevice = (id) => {
// 		console.log(id)
// 	}
// 	function getDevice() {
// 		$.ajax({
// 	        type: "post",
// 	        url: api.url + "inventory/get_device",
// 	        data: {
// 	        	page: 0,
// 	        	count: 10,
// 	        	order: 'date',
// 	        	search: {
// 	        		name: 'device'
// 	        	}
// 	        },
// 	        headers: {
// 	            Authorization: localStorage.getItem("token"),
// 	        },
// 	        success: function(response) {
// 	        	console.log(response.data)
// 	        	const data = response.data;
// 	        	let html = '';
// 	        	if (data.length > 0) {
// 		        	for (var i = 0; i < data.length; i++) {
// 		        		html +=  `<tr>
// 	                                <td class="order_date">${data[i]['created_at'].split('T')[0]}</td>
// 	                                <td class="id" style="display:none;"><a href="javascript:void(0);" class="fw-medium link-primary">#VZ001</a></td>
// 	                                <td> ${data[i]['name']} </td>
// 	                                <td> ${data[i]['cName']} </td>
// 	                                <td> ${data[i]['model']} </td>
// 	                                <td> ${data[i]['price']} </td>
// 	                                <td> ${data[i]['brand']} </td>
// 	                                <td class="status">
// 	                                	<button class="btn btn-sm btn-outline-danger" onclick="deleteDevice(${data[i]['id']})">Delete</button>
// 	                                	<a href="/inventory/devices?id=${data[i]['id']}"><button class="btn btn-sm btn-outline-info">Modify</button>
// 	                                </td>
// 	                            </tr>`
// 		        	}
// 	        	} else {
// 	        		html +=  '<td colspan="7" style="text-align: center;"> Data don\'t exist.</td>'
// 	        	}
// 	        	$('.device-list').html(html);
// 	        },
// 	        error: function(error) {
// 	            error.status == 0 && (window.location.href = "/login");
// 	            error.status == 404 && (window.location.href = "/auth-404-basic");
// 	        }
// 		})
// 	}
// 	getDevice();
// })