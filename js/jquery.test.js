function pusshed(){
		console.log('pusshed')
}
$(document).ready(function() {
	$(function () { prettyPrint() })
	
	$('#portafolio').aFlickr('photosSearch',{api_key: '21a552a1bfed7c2551854410fba46f39',
												thumbnail_size: 'm',//'sq' square, 't' thumbnail, 's' small, 'm' medium, '' medium
												user_id: '97137858@N00', //user id (flickr)
												per_page: 10, // images per page (TODO: Pagination)
												tags:'', //tag separated with comas
												description: true, // if you want add the image description.
												template: 'first-images',//interspersed , continuous, first-description, first-images.
												tpl: '<div id="slider" class="mySlider span7">{images}</div><div class="span7">{description}</div>',
												callback_end:pusshed //Callback function after complete.
												});
});