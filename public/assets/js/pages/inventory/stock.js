$(document).ready(function() {
	const ckeditorClassic = document.querySelector('#stock-description');
	let descriptionEditor = '';
	if (ckeditorClassic) {
	  ClassicEditor.create(document.querySelector('#stock-description')).then(function (editor) {
	    descriptionEditor = editor;
	    editor.ui.view.editable.element.style.height = '200px';
	  })["catch"](function (error) {
	    console.error(error);
	  });
	} // Dropzone
})