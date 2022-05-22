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
					let categoryhtml = '<option value="" selected disabled>Select Category</option>';
					for (var i = 0; i < data['category'].length; i++) {
						categoryhtml +=`<option value="${data['category'][i]['id']}">${data['category'][i]['name']}</option> `
					}
					$("#device-category-input").html(categoryhtml);
					let brandhtml = '';
					for (var i = 0; i < data['brand'].length; i++) {
						brandhtml +=`<option value="${data['brand'][i]['id']}">${data['brand'][i]['name']}</option> `
					}
					$("#device-brand-input").html('<option value="" selected disabled>Select Brand</option>' + brandhtml);
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
					$('#device-photo-input').attr('required', false);
					descriptionEditor.setData(data.description);
					$("#device-brand-input").val(data.brand);
					$("#device-model-input").val(data.model);
					$("#device-version-input").val(data.hardware_version);
					$("#device-category-input").val(data.category);
					$("#device-ean-input").val(data.ean);


					$("#device-weight-input").val(data.package_weight);
					$("#device-height-input").val(data.package_height);
					$("#device-width-input").val(data.package_width);
					$("#device-length-input").val(data.package_length);

					$("#device-price-mrp").val(data.price_mrp);
					$("#device-price-selling").val(data.price_selling);
					$("#device-status-input").val(data.status);

					$(".device-shipping-input[value="+data.shipping+"]").attr('checked', true);
					if (data.shipping === 'fixed') {
						console.log('asdfasd')
						$('#device-shipping-fixed-input')[0].style.display = 'block';
						$('#device-shipping-fixed-price').attr('required', true);
						$("#device-shipping-fixed-price").val(data.fixed_price);
					}
	        	}

	        },
	        error: function(error) {
	            error.status == 0 && (window.location.href = "/login");
	            error.status == 404 && (window.location.href = "/auth-404-basic");
	        }
		})

	}
	$('.device-create-btn').click(function() {
	    $('#new-item-form')[0].classList.add('was-validated');
		if ($('#new-item-form')[0].checkValidity() === false) {
			Swal.fire({
			  text: 'Please enter all inputs',
			  icon: 'error',
			  confirmButtonText: 'Ok'
			})
			return false;
		} else {
			let formdata = new FormData();
			if (!alterid && !$("#device-photo-input")[0].files[0]) {
				window.alert('Select the Images.');
				return false;
			}
			if ($("#device-photo-input")[0].files[0]) {
				formdata.append('model_images', $("#device-photo-input")[0].files[0]);
			}
			let data = {
				name: $("#device-name-input").val() || '',
				description: descriptionEditor.getData() || '',
				category: $("#device-category-input").val() || '',
				ean: $("#device-ean-input").val() || '',
				brand: $("#device-brand-input").val() || '',
				model: $("#device-model-input").val() || '',
				hardware_version: $("#device-version-input").val() || '',

				package_weight: $("#device-weight-input").val() || '',
				package_height: $("#device-height-input").val() || '',
				package_width: $("#device-width-input").val() || '',
				package_length: $("#device-length-input").val() || '',

				price_mrp: $("#device-price-mrp").val() || '',
				price_selling: $("#device-price-selling").val() || '',

				shipping: $(".device-shipping-input").val() || '',
				status: $(".device-status-input").val() || '',
			}
			if (data.shipping === 'fixed') {
				data.fixed_price = $("#device-shipping-fixed-price").val()
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
					    $('#new-item-form')[0].classList.remove('was-validated');
						$("#device-name-input").val('');
						$('#device-photo-input').val('');
						descriptionEditor.setData('');
						$("#device-brand-input").val('');
						$("#device-model-input").val('');
						$("#device-version-input").val('');
						$("#device-category-input").val('');
						$("#device-ean-input").val('');

						$("#device-weight-input").val('');
						$("#device-height-input").val('');
						$("#device-width-input").val('');
						$("#device-length-input").val('');

						$("#device-price-mrp").val('');
						$("#device-price-selling").val('');
						$("#device-status-input").val('');
						$("#device-shipping-fixed-price").val('');
		        	} else {
		        		let message = '';
		        		for (let key in response.data) {
		        			message += response.data[key].join(' \n ') + '\n'
		        		}
		        		Swal.fire({
						  title: 'Failure!',
						  text: message,
						  icon: 'error',
						  confirmButtonText: 'Ok'
						})
		        	}

		        },
		        error: function(error) {
		            // error.status == 0 && (window.location.href = "/login");
		            // error.status == 404 && (window.location.href = "/auth-404-basic");
		        }
			})
		}
		return false;
		console.log(descriptionEditor.getData())
	})
	$('.device-shipping-input').change(function() {
		if ($(this).val() === 'fixed') {
			$('#device-shipping-fixed-input')[0].style.display = 'block';
			$('#device-shipping-fixed-price').attr('required', true);
		} else {
			$('#device-shipping-fixed-input')[0].style.display = 'none';
			$('#device-shipping-fixed-price').attr('required', false);
		}
	})
	$('#add-brand-id').change(function(ele) {
		if ($("#add-brand-id").val() === 'new') {
			$('#add-brand-name').val('');
			$('#add-brand-logo').val('');
			$('#brand-delete')[0].style.display = 'none';
		} else {
			$('#add-brand-name').val($("#add-brand-id :selected").text());
			$('#brand-delete')[0].style.display = 'block';
		}
	})
	$('#brand-delete').click(function() {
		if ($('#add-brand-id').val() === 'new') return false;
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/delete-brand",
	        data: {id: $('#add-brand-id').val()},
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
	$('#add-brand').click(function() {
		$('#add-brand-id').val('new');
		$('#add-brand-name').val('');
		$('#add-brand-logo').val('');
		$('#add-brand-modal').modal('toggle')
	})

	$('#add-brand-save').click(function() {
		if ($('#add-brand-name').val() == '') {
    		Swal.fire({
			  text: 'Please enter the brand name.',
			  icon: 'error',
			  confirmButtonText: 'Ok'
			})
			return true;
		}
		if ($('#add-brand-id').val() === 'new' && !$("#add-brand-logo")[0].files[0]) {
    		Swal.fire({
			  text: 'Please select the brand logo.',
			  icon: 'error',
			  confirmButtonText: 'Ok'
			})
			return true;
		}
		let data = new FormData();
		data.append('name', $('#add-brand-name').val());
		data.append('id', $('#add-brand-id').val());
		if ($("#add-brand-logo")[0].files[0]) data.append('brand_logo', $("#add-brand-logo")[0].files[0])
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/add-brand",
	        data: data,				
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
						initpage();
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