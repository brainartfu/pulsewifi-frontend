$(document).ready(function() {
	const ckeditorClassic = document.querySelector('#device-description');
	let alterid = ''
	let descriptionEditor = '';
	if (ckeditorClassic) {
	  ClassicEditor.create(document.querySelector('#device-description')).then(function (editor) {
	    descriptionEditor = editor;
	    editor.ui.view.editable.element.style.height = '200px';
	  })["catch"](function (error) {
	    console.error(error);
	  });
	} // Dropzone
	function initpage() {
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/get_category_brand_model",
	        success: function(response) {
	        	const data = response.data;
	        	console.log(data)
	        	if (response.success) {
					let categoryhtml = '';
					for (var i = 0; i < data['category'].length; i++) {
						categoryhtml +=`<option value="${data['category'][i]['id']}">${data['category'][i]['name']}</option> `
					}
					$("#device-category-input").html(categoryhtml);
					let brandhtml = '';
					for (var i = 0; i < data['brand'].length; i++) {
						brandhtml +=`<option value="${data['brand'][i]['id']}">${data['brand'][i]['name']}</option> `
					}
					$("#device-brand-input").html(brandhtml);
					brandhtml = "<option value='new'>New Brand</option>" + brandhtml;
					$("#add-brand-id").html(brandhtml);
	        	}

	        },
	        error: function(error) {
	            
	        }
		})
	};
	initpage();
	if (window.location.href.split('?').length > 1) {
		alterid = window.location.href.split('?')[1].split('=')[1];
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/get_item_by_id",
	        data: {id: alterid},
	        headers: {
	            Authorization: localStorage.getItem("token"),
	        },
	        success: function(response) {
	        	const data = response.data[0];
	        	if (response.success) {
					$("#device-name-input").val(data.name);
					// $("#device-photo-input").val(data.images);
					descriptionEditor.setData(data.description);
					$("#device-brand-input").val(data.brand);
					$("#device-model-input").val(data.model);
					$("#device-version-input").val(data.hardware_version);
					$("#device-category-input").val(data.category);
					$("#device-ean-input").val(data.ean);
					$("#device-package-input").val(data.package_info);
					$("#device-price-input").val(data.price);
					$("#device-shipping-input").val(data.shipping);
	        	}

	        },
	        error: function(error) {
	            error.status == 0 && (window.location.href = "/login");
	            error.status == 404 && (window.location.href = "/auth-404-basic");
	        }
		})

	}
	$('.device-create-btn').click(function() {
		console.log(descriptionEditor.getData())
		let formdata = new FormData();
		if (!alterid && !$("#device-photo-input")[0].files[0]) {
			window.alert('Select the Images.');
			return false;
		} else {
			formdata.append('model_images', $("#device-photo-input")[0].files[0]);
		}
		let data = {
			name: $("#device-name-input").val() || '',
			description: descriptionEditor.getData() || '',
			brand: $("#device-brand-input").val() || '',
			model: $("#device-model-input").val() || '',
			hardware_version: $("#device-version-input").val() || '',
			ean: $("#device-ean-input").val() || '',
			package_info: $("#device-package-input").val() || '',
			category: $("#device-category-input").val() || '',
			price: $("#device-price-input").val() || '',
			shipping: $("#device-shipping-input").val() || '',
		}
		for (let key in data) {
			formdata.append(key, data[key]);
		}
		if (alterid) {
			formdata.append('id', alterid);
		}
		// console.log(formdata.get('images'));
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/add_device",
	        data: formdata,
			processData: false,
			contentType: false,
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

	        },
	        error: function(error) {
	            error.status == 0 && (window.location.href = "/login");
	            error.status == 404 && (window.location.href = "/auth-404-basic");
	        }
		})
	})
	$('#add-brand-id').change(function(ele) {
		if ($("#add-brand-id").val() === 'new') {
			$('#add-brand-name').val('');
		} else {
			$('#add-brand-name').val($("#add-brand-id :selected").text());
		}
	})
	$('#add-brand').click(function() {
		$('#new-brand-id').val('new');
		$('#new-brand-name').val('');
		$('#add-brand-modal').modal('toggle')
	})

	$('#add-brand-save').click(function() {
		if ($('#add-brand-name').val() == '') {
			window.alert('name require.');
			return true;
		}
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/add-brand",
	        data: {
	        	name: $('#add-brand-name').val(),
	        	id: $('#add-brand-id').val()
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
				$('#add-brand-modal').modal('hide')

	        },
	        error: function(error) {
	            error.status == 0 && (window.location.href = "/login");
	            error.status == 404 && (window.location.href = "/auth-404-basic");
	        }
		})
	})
})