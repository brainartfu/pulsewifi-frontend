$(document).ready(function() {
	const deleteDevice = (id) => {
		console.log(id)
	}
	function getDevice() {
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/get_device",
	        data: {
	        	page: 0,
	        	count: 10,
	        	order: 'date',
	        	search: {
	        		name: 'device'
	        	}
	        },
	        headers: {
	            Authorization: localStorage.getItem("token"),
	        },
	        success: function(response) {
	        	console.log(response.data)
	        	const data = response.data;
	        	let html = '';
	        	if (data.length > 0) {
		        	for (var i = 0; i < data.length; i++) {
		        		html +=  `<tr>
	                                <td class="order_date">${data[i]['created_at'].split('T')[0]}</td>
	                                <td class="id" style="display:none;"><a href="javascript:void(0);" class="fw-medium link-primary">#VZ001</a></td>
	                                <td> ${data[i]['name']} </td>
	                                <td> ${data[i]['cName']} </td>
	                                <td> ${data[i]['model']} </td>
	                                <td> ${data[i]['price']} </td>
	                                <td> ${data[i]['brand']} </td>
	                                <td class="status">
	                                	<button class="btn btn-sm btn-outline-danger" onclick="deleteDevice(${data[i]['id']})">Delete</button>
	                                	<a href="/inventory/devices?id=${data[i]['id']}"><button class="btn btn-sm btn-outline-info">Modify</button>
	                                </td>
	                            </tr>`      	
		        	}
	        	} else {
	        		html +=  '<td colspan="7" style="text-align: center;"> Data don\'t exist.</td>'
	        	}
	        	$('.device-list').html(html);
	        },
	        error: function(error) {
	            error.status == 0 && (window.location.href = "/login");
	            error.status == 404 && (window.location.href = "/auth-404-basic");
	        }
		})
	}
	getDevice();
})