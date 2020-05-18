
if (typeof jQuery != 'undefined') {
	var $ = jQuery.noConflict();
}

$(document).on('click', '#btn-bigger-cover', function(event) {
	event.preventDefault();

	var that = $(this);

	if( that.hasClass('loading') ){
		return false;
	}
	that.addClass('loading');

	var id = that.data('id');
	$.ajax({
		url: globals.ajax_url,
		type: 'POST',
		dataType: 'json',
		data: {action: 'create-bigger-image', id: id},
	})
	.done(function( data ) {

		if( data.status == 200 ){

			var popup = ncPopup( 'cover', data.html, 'background:rgba(0,0,0,0.5);');

			var colorThief = new ColorThief();
			colorThief.getColorAsync(data.head_image, function(color, element) {
				var colors = colorThief.getPalette(element, 2);
				var mainColor = 'rgba(' + colors[0][0] + ', '+ colors[0][1] +', ' + colors[0][2] + ', 1)';
				var subColor = 'rgba(' + colors[1][0] + ', '+ colors[1][1] +', ' + colors[1][2] + ', 1)';
				var thirdColor = 'rgba(' + colors[2][0] + ', '+ colors[2][1] +', ' + colors[2][2] + ', 1)';
				var style = {
					backgroundColor: mainColor,
					'background': 'linear-gradient( -20deg, '+ mainColor +' 0%, '+ subColor +'100%, '+ thirdColor +'100%)'
				}
				popup.find('.nice-tips-overlay').css(style);

	        });

			$('[data-toggle="tooltip"]').tooltip();
			
			console.log(data.src);
			
			$(".load_bigger_img").attr('src',data.src);

		}else{
			ncPopupTips(0, data.msg);
		}
		that.removeClass('loading');
	})
	.fail(function() {
		ncPopupTips(0, '网络错误，请稍后再试');
		that.removeClass('loading');
	});
});