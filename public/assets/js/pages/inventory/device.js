$(document).ready(function() {
	const ckeditorClassic = document.querySelector('#device-description');
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
	        url: api.url + "inventory/get_category",
	        success: function(response) {
	        	const data = response.data;
	        	console.log(data)
	        	if (response.success) {
					let modelhtml = '';
					let categoryhtml = '';
					for (var i = 0; i < data.model.length; i++) {
						modelhtml +=`<option value="${data.model[i]['id']}">${data.model[i]['name']}</option> `
					}
					for (var i = 0; i < data.category.length; i++) {
						categoryhtml +=`<option value="${data.category[i]['id']}">${data.category[i]['name']}</option> `
					}
					console.log()
	        		$("#device-model-input").html(modelhtml);
					$("#device-category-input").html(categoryhtml);
					// $("#device-name-input").val(data.name);
					// $("#device-photo-input").val(data.photo);
					// descriptionEditor.setData(data.description);
					// $("#device-brand-input").val(data.brand);
					// $("#device-model-input").val(data.model);
					// $("#device-version-input").val(data.version);
					// $("#device-category-input").val(data.category);
					// $("#device-price-input").val(data.price);
					// $("#device-shipping-input").val(data.shipping);
	        	}

	        },
	        error: function(error) {
	            
	        }
		})
	};
	initpage();
	if (window.location.href.split('?').length > 1) {
		const alterid = window.location.href.split('?')[1].split('=')[1];
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/get_device_by_id",
	        data: {id: alterid},
	        headers: {
	            Authorization: localStorage.getItem("token"),
	        },
	        success: function(response) {
	        	const data = response.data[0];
	        	if (response.success) {
					$("#device-name-input").val(data.name);
					$("#device-photo-input").val(data.photo);
					descriptionEditor.setData(data.description);
					$("#device-brand-input").val(data.brand);
					$("#device-model-input").val(data.model);
					$("#device-version-input").val(data.version);
					$("#device-category-input").val(data.category);
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
		$("#device-photo-input").prop('files')[0] && formdata.append('photo', $('#device-photo-input').prop('files')[0])

		let data = {
			name: $("#device-name-input").val() || '',
			photo: $("#device-photo-input").val() || '',
			description: descriptionEditor.getData() || '',
			brand: $("#device-brand-input").val() || '',
			model: $("#device-model-input").val() || '',
			version: $("#device-version-input").val() || '',
			category: $("#device-category-input").val() || '',
			price: $("#device-price-input").val() || '',
			shipping: $("#device-shipping-input").val() || '',
		}
		$.ajax({
	        type: "post",
	        url: api.url + "inventory/add_device",
	        data: data,
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

	$('#add-category').click(function() {
		$('#new-model-name').val('');
		$('#add-category-modal').modal('toggle')
	})
	$('#add-model').click(function() {
		$('#new-category-name').val('');
		$('#add-model-modal').modal('toggle')
	})
	$('#new-model-save').click(function() {
		if ($('#new-model-name').val() !== '') {
			$.ajax({
		        type: "post",
		        url: api.url + "inventory/new-model",
		        data: {name: $('#new-model-name').val()},
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
		        	}
					$('#add-model-modal').modal('hide')

		        },
		        error: function(error) {
		            error.status == 0 && (window.location.href = "/login");
		            error.status == 404 && (window.location.href = "/auth-404-basic");
		        }
			})

		}
	})
	$('#new-category-save').click(function() {
		if ($('#new-category-name').val() !== '') {
			$.ajax({
		        type: "post",
		        url: api.url + "inventory/new-category",
		        data: {name: $('#new-category-name').val()},
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
		}
	})
})