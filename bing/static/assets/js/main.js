

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){function n(){var d=Date.now()-l;d<i&&d>=0?r=setTimeout(n,i-d):(r=null,t||(f=e.apply(u,o),u=null,o=null))}var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,t=arguments[2],r=void 0,o=void 0,u=void 0,l=void 0,f=void 0,d=function(){u=this;for(var d=arguments.length,a=Array(d),s=0;s<d;s++)a[s]=arguments[s];o=a,l=Date.now();var c=t&&!r;return r||(r=setTimeout(n,i)),c&&(f=e.apply(u,o),u=null,o=null),f};return d.clear=function(){r&&(clearTimeout(r),r=null)},d.flush=function(){r&&(f=e.apply(u,o),u=null,o=null,clearTimeout(r),r=null)},d}var n=window.jQuery;if(!n)throw new Error("resizeend require jQuery");n.event.special.resizeend={setup:function(){var i=n(this);i.on("resize.resizeend",e.call(null,function(e){e.type="resizeend",i.trigger("resizeend",e)},250))},teardown:function(){n(this).off("resize.resizeend")}}});

jQuery(document).ready(function($) {
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
    $(window).on('load', function()  {
        $(".main-preloader").length && (
            $(".main-preloader").addClass("window-is-loaded"),
            setTimeout(function() {
                $(".main-preloader").remove()
            },
        650))
    });
});

var $window,
    $html,
    $pageHeader,
    $pageHeader_height,
    $window_height,
    $window_width,
    $searchHeader,
    $search_down,
    $search_down_title,
    $html_overlay;

function variables() {
    $window              = $(window);
    $pageHeader          = $(".nice-header");
    $mobileuserHeader    = $(".mobile-usernav");
    $search_down         = $(".nice-search-inner-down");
    $search_down_title   = $(".featured-search-title");
    $html_overlay        = $('<div class="dialog_overlay"></div>');
    $window_height       = $window.height();
    $window_width        = $window.width();
    $pageHeader_height   = $pageHeader.outerHeight();
    $searchDown_height   = $search_down.outerHeight();
    $searchDown_title_height   = $search_down_title.outerHeight(true);
};


/*
	Sticky Menu
	----------------------------------------------------

*/
function scrollTop() {
    var scroll     = $window.scrollTop(),
        startPoint = $window_height / 2,
        scrTopBtn  = $(".scroll-to-top");
    if ( scroll >= startPoint && $window_width >= 1024  ) {
        scrTopBtn.addClass('active');

    } else {
        scrTopBtn.removeClass('active');
    }
    scrTopBtn.on("click", function () {
        $("html, body").stop().animate({
            scrollTop: 0
        },
        600);
    });
};
/*
    site search
    ----------------------------------------------------
*/
function showing_search() {
    if( $window_width < 768 ){
        jQuery($html_overlay).remove()
    }
    jQuery("body").removeClass("nt_second_menu_search_anims"),
    jQuery("body").removeClass("nt_second_menu_height_100"),
    jQuery(".featured-search").removeClass("hidden"),
    setTimeout(function() {
        jQuery("body").removeClass("nt_showing_search")
    },
    600)
};

function search_height() {
    var w_height = $(window).height();

    var $featured_cover_height = w_height * 0.67 * 0.66 - $searchDown_title_height ;
        if( w_height < 768 ){
            jQuery(".featured-search").addClass("hidden"),
            jQuery("body").addClass("nt_second_menu_height_100")
        }
        $(".featured-search .item .image").css("height", $featured_cover_height)
};

jQuery(document).ready(function($) {
    $(window).resize(function(){
        search_height();
    });

});
jQuery(".btn-search").off("click").on("click",
    function() {
        if( $window_width < 768 ){
            jQuery("body").append($html_overlay)
        }
        jQuery("body").addClass("nt_showing_search"),
        jQuery("body").addClass("nt_second_menu_search_anims"),
        jQuery(".top_searchform_wrapper input").focus(),
        search_height();

    }),

document.addEventListener("keyup",
    function(t) {
        27 === t.keyCode && (jQuery("body").hasClass("nt_second_menu_search_anims") && showing_search())
    }),
jQuery(".search_inner_close").on("click",
    function() {
        showing_search();
    });

/*
    post style03-04 cover height
    ----------------------------------------------------
*/
function postcoverHeight() {
    var $postcover_height = $window_height - $pageHeader_height;
    if ($("body").hasClass("post-style04") && $window_width < 768 ){
        $('.post-cover').height($postcover_height);
    }
};

function toggleCommentAuthorInfo() {
    var changeMsg = "<i>[ 资料修改 ]</i>";
    var closeMsg = "<i>[ 收起来 ]</i>";
    $('.comment-form-info').slideToggle('slow', function(){
        if ( $('.comment-form-info').css('display') == 'none' ) {
            $('#toggle-comment-author-info').html(changeMsg);
        } else {
            $('#toggle-comment-author-info').html(closeMsg);
        }
    });
};

jQuery(document).scroll(function ($) {
    // scrollTop()
});

jQuery(document).ready(function($) {

	variables();
    postcoverHeight();

    var header = new Headroom(document.querySelector(".nice-header"), {
        offset : 70,
        // scroll tolerance in px before state changes
        tolerance : 0,
        // 对于每个状态都可以自定义css classes
        classes: {
            initial   : "headroom",
            pinned    : "headroom--pinned",
            unpinned  : "headroom--unpinned"
        }
    });
    // header.init();
    var postdock = new Headroom(document.querySelector(".nice-footer-post-dock"), {
        offset : 0,
        // scroll tolerance in px before state changes
        tolerance : 0,
        // 对于每个状态都可以自定义css classes
        classes: {
            initial    : "postdock-inner",
            pinned     : "postdock-pinned",
            unpinned   : "postdock-unpinned",
            top        : "postdock-top",
            notTop     : "postdock-not-top",
            bottom     : "postdock-bottom",
            notBottom  : "postdock-not-bottom"
        }
    });
    if( globals.single != 0 && $('.nice-footer-post-dock').length > 0 ){
        postdock.init();
    }

	if( globals.silide != 0 ){
	    $('.nice-slider .owl-carousel').owlCarousel({
	        items:1,
	        loop:true,
	        nav:true,
	        smartSpeed:1200,
	        autoplay:true,
	        autoplayTimeout:5000,
            margin:10,
            autoplayHoverPause:true,
	        navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
	        responsive:{
                320:{
                    nav:false,

                },
                992:{
                    nav:true,

                }
            }
	    });
        var featuredowl = $('.nice-featured-posts .owl-carousel');
        featuredowl.owlCarousel({
	        margin:10,
            loop:true,
            nav:false,
            dots:false,
            responsiveClass:true,
            responsive:{
                320:{
                    items:3,
                    loop:true,
                    margin:10,

                },
                768:{
                    items:5,
                    center: false,
                    margin:20,
                    loop:false

                },
                992:{
                    items:6,
                    center: true,
                    margin:20,
                    loop:true

                },
                1024:{
                    items:8,
                    margin:20,
                    loop:true,
                    nav:true,
                    navText: ['<i class="icon icon-arrow-left"></i>', '<i class="icon icon-arrow-right"></i>'],
                }

            }
	    });
        featuredowl.on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY<0) {
                featuredowl.trigger('next.owl');
            } else {
                featuredowl.trigger('prev.owl');
            }
            e.preventDefault();
        });
	}
    if( globals.single != 0 && globals.post_style == 'five' ){
        var owl = $('.post-gallery');
        owl.owlCarousel({
            items:1,
            smartSpeed:1050,
            loop:false,
            dots:true,
            nav:true,
            margin:20,
            videoHeight:true,
            navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>']

        });
        owl.on('mousewheel', '.owl-stage', function (e) {
            if (e.deltaY<0) {
                owl.trigger('next.owl');
            } else {
                owl.trigger('prev.owl');
            }
            e.preventDefault();
        });
    }

    if( globals.single != 0 && globals.post_style == 'one' || globals.post_style == 'two' || globals.post_style == 'three' || globals.post_style == 'six' || globals.post_style == 'seven'){

        /*
            Sticky Sidebar
            -------------------------------------------------------
        */
        $('.nice-sidebar').theiaStickySidebar({
            additionalMarginTop: 80,
            additionalMarginBottom: 80
        });
    }

	/*
		navbar-nav
		----------------------------------------------------
	*/
	/*$(".navbar-nav li:has(>ul)").addClass("has-children");*/

	if ($(".navbar-nav li").hasClass("has-children")){
	    $(".navbar-nav li.has-children").prepend('<span class="fal fa-angle-down"></span>')
	}

	$('#mobile-menu-icon').on('click touchstart', function (e){
        e.preventDefault();
        $('#nice-mobile-overlay').addClass('open');
        $('body').addClass('mobile-open');

    });
    $('#mobile-close-icon').on('click touchstart', function (e) {
        e.preventDefault();
        $('#nice-mobile-overlay').removeClass('open');
        $('body').removeClass('mobile-open');

    });

    /*
        mobile-bigger-cover
        ----------------------------------------------------
    */

    if( $window_width < 768 ){

        $(".btn-open-share").on('click touchstart', function (e) {
            e.preventDefault();
            $('.bigger-share').addClass('open');
            $('.btn-open-share').hide();
            $('.btn-close').hide();
            $('.btn-close-share').show();
        });
    	$(".btn-close-share").on('click touchstart', function (e) {
            e.preventDefault();
            $('.btn-close-share').hide();
            $('.bigger-share').removeClass('open');
            $('.bigger-share').addClass('close');
            $('.btn-open-share').show();
            $('.btn-close').show();
            setTimeout(function(){
                $('.bigger-share').removeClass('close');
            },200);

        });
    }

    $('#navbar-search-submit').click(function() {
        if (!$('body').hasClass('search-opened-removing')) {
            $('body').addClass('search-opened');
            $(this).parent().children('input').focus();
        }
    });
    $('.searchform.header-search').focusout(function(){
        $('body').removeClass('search-opened').addClass('search-opened-removing');
            setTimeout(function () {
                $('body').removeClass('search-opened-removing');
                $('#navbar-search-submit').removeClass('icon-wd-close');

        }, 300);
    });


    /*
        comment
        ----------------------------------------------------
    */
    $(document).ready(function(){
        $('#comment').focus(function(){
            $('.form-captcha').addClass('d-flex');
        });
        $('.comment-form-info').hide();
    });
    $(document).ready(function(){

        if( $('#author').val() == '' ){
            $('.comment-form-info').show();
        }else{
            $('.comment-form-info').hide();
        }
    });

    /*
        tooltip
        ----------------------------------------------------
    */

    $('[data-toggle="tooltip"]').tooltip();

});

/*
-------------------------
LIKE
-------------------------
*/

var $ = jQuery.noConflict();

$.fn.postLike = function() {
	if ($(this).hasClass('current')) {
		mi_prompt( 'error', '您已点过喜欢啦:-)' );
		return false;
	} else {
		$('.post-like').addClass('current');
		var count = $(this).find('.count').text() * 1;
		$('.post-like').find('.count').text(count + 1);
		var id = $(this).data("id"),
		action = $(this).data('action'),
		rateHolder = $(this).children('.count');
		var ajax_data = {
			action: action,
			id: id,
		};
		// $.post(globals.ajax_url, ajax_data,
		// function(data) {
		// 	if( data == 'false' ){
		// 		mi_prompt( 'error', '您已点过喜欢啦:-)' );
		// 	}else{
		// 		$(rateHolder).html(data);
		// 	}
		// });
		return false;
	}
};
$(document).on("click", ".post-like",function() {
	$(this).postLike();
});

(function( $ ){
    $.fn.miPopup = function() {

    	this.bind('click touchstart', function(event) {
    		// event.preventDefault();

    		var html = $('<div class="dialog_overlay"></div>');

    		var selector = $(this).data('selector');

    		var close_icon = $(selector).find('.btn-close');

    		$(selector).addClass('open').find('.btn-close').on('click touchstart', function(event) {
    			event.preventDefault();
    			$(html).remove();
    			$(selector).removeClass('open');
				$(selector).addClass('close');
				$('body').removeClass('modal-open');
    			setTimeout(function(){
					$(selector).removeClass('close');
				},200);
				close_icon.unbind();
    		});
    		$('body').addClass('modal-open');
    		$('body').append(html);

    		$('body').on("keyup", function (e) {
		        if (e.keyCode === 27) close_icon.click();
		    });

    	});

    };
	$('[data-module="miPopup"]').miPopup();
})( jQuery );

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
}
function givenElementInViewport (el, fn) {
    return function () {
        if (isElementInViewport(el)) {
            fn.call();
        }
    }
}
function addViewportEvent (el, fn) {
    if (window.addEventListener) {
        addEventListener('DOMContentLoaded', givenElementInViewport(el, fn), false);
        addEventListener('load', givenElementInViewport(el, fn), false);
        // addEventListener('scroll', givenElementInViewport(el, fn), false);
        addEventListener('resize', givenElementInViewport(el, fn), false);
    } else if (window.attachEvent)  {
        attachEvent('DOMContentLoaded', givenElementInViewport(el, fn));
        attachEvent('load', givenElementInViewport(el, fn));
        // attachEvent('scroll', givenElementInViewport(el, fn));
        attachEvent('resize', givenElementInViewport(el, fn));
    }
}

if( $('.posts-ajax-load').length > 0 ) {
	addViewportEvent( document.querySelector('.posts-ajax-load') ,function(){
		if( $('.dposts-ajax-load').data('comments') == 'comments' ){
			return false;
		}

	    if( $('.dposts-ajax-load').hasClass('loading') === false ){
			var data = $('.dposts-ajax-load').data();
	    	if( $('.dposts-ajax-load').data('page') <= 10 ){
				$('.dposts-ajax-load').addClass('loading');
				//console.log($('.dposts-ajax-load').data());
				// ajax_load_posts($('.dposts-ajax-load').data());
	    	}

	    }

	});
}

$(document).on('click', '.dposts-ajax-load', function(event) {
	event.preventDefault();
	if( $('.dposts-ajax-load').hasClass('loading') === false ){
    	$('.dposts-ajax-load').addClass('loading');
		// ajax_load_posts($('.dposts-ajax-load').data());
	}
});

function initplayer(param){

let player = new Player({
    id: 'player',
	url:param.data.video,
	crossOrigin: true,
	enterLogo:{ 
    url: '/logo.png',
    width: 231,
    height: 42
   },
   enterBg:{ 
    color: 'rgba(0,0,0,0.87)'
   },
   enterTips:{
    background: 'linear-gradient(to right, rgba(0,0,0,0.87), #3D96FD, rgba(86,195,248), #3D96FD, rgba(0,0,0,0.87))'
   },
	videoInit: true,
    fluid: true,
    volume: 0.3,
    autoplay: true,
    poster:param.data.poster,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    rotate: {   
        innerRotate: true, 
        clockwise: false 
    },
	airplay: false,
	playsinline: true,
	'x5-video-player-type': 'h5',
});

$(".smartideo").hide();

if(param.data.videos){
	
player.emit('resourceReady',param.data.videos);	

}
		
}

$(document).on('click', '.captcha-image img', function(event) {
	event.preventDefault();
	var src = $(this).attr('src');

	if( src.indexOf('&') > 0 ){
		var new_src = src.substring(0, src.indexOf('&'))+'&time='+Date.parse(new Date());
	}else{
		var new_src = src+'&time='+Date.parse(new Date());
	}

	$(this).attr('src',new_src);

});

function mi_prompt( type, msg ){

	if( type == 'error' ){
		var html = '<div id="sometips" class="sitetips tips-error tips-open">';
	}else{
		var html = '<div id="sometips" class="sitetips tips-success tips-open">';
	}
    	html += '<div class="tips_overlay"></div>';
    	html += '<div class="tips_content">';
    if( type == 'error' ){
    	html += '<i class="icon icon-exclamation"></i>';
    }else{
    	html += '<i class="icon icon-check"></i>';
    }
        html += '<p>'+msg+'</p>';
    	html += '</div>';
		html += '</div> ';

	$('body').append(html);
	setTimeout(function(){
		$('#sometips').removeClass('tips-open');
		$('#sometips').addClass('tips-close');
		setTimeout("$('#sometips').remove()", 200);
	},1500);

}

$(document).on('click', '#sometips', function(event) {
	event.preventDefault();
	$('#sometips').removeClass('tips-open');
	$('#sometips').addClass('tips-close');
	setTimeout(function(){
		$('#sometips').remove();
	},200);
});

function popupImage() {
	
    $('.suxing-popup-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeMarkup: '<button title="%title%" type="button" class="mfp-close suxing-mfp-close-button"></button>',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        removalDelay: 300,
        image: {
	        titleSrc: function(item) {
				return  item.el.find('img').attr('alt');
				//return  item.el.find('img').attr('alt') + item.el.attr('title');
			}
	      },
        mainClass: 'suxing-popup-slide-in',
	        callbacks: {
	          	beforeOpen: function() {
	            this.container.data('scrollTop', parseInt($(window).scrollTop()));
	        },
          	afterClose: function(){
            	$('html, body').scrollTop(this.container.data('scrollTop'));
          	},
        }
  	});
}

function popupGallery( gclass, aclass ) {
	var gclass = gclass ? gclass : '.suxing-popup-gallery',
		aclass = aclass ? aclass : 'a.suxing-popup-gallery-item';
  	$(gclass).each(function() {
        $(this).magnificPopup({
          	delegate: aclass,
          	type: 'image',
          	gallery: {
            	enabled: true,
		        navigateByImgClick: true,
		        arrowMarkup: '<button title="%title%" type="button" class="suxing-mfp-arrow suxing-mfp-arrow-%dir%"></button>',
		        tPrev: 'Previous',
		        tNext: 'Next',
		        tCounter: '<span>%curr% / %total%</span>'
		    },
		    image: {
	          	titleSrc: function(item) {
				    return  item.el.find('img').attr('alt');
				    //return  item.el.find('img').attr('alt') + item.el.attr('title');
				}
	        },
          	closeMarkup: '<button title="%title%" type="button" class="mfp-close suxing-mfp-close-button"></button>',
          	fixedContentPos: true,
          	fixedBgPos: true,
          	overflowY: 'auto',
          	removalDelay: 300,
          	mainClass: 'suxing-popup-slide-in',
          	callbacks: {
	            beforeOpen: function() {
	              	this.container.data('scrollTop', parseInt($(window).scrollTop()));
	            },
	            afterClose: function(){
	              	$('html, body').scrollTop(this.container.data('scrollTop'));
	            },
	        }
        });
  	});
}

jQuery(document).ready(function($){

	if( globals.image_popup !== 'null' && globals.image_popup !== 'disable' ){

		if( globals.image_popup == 'image' ){
			var aclass = 'suxing-popup-image';
		}else if( globals.image_popup == 'gallery' ){
			var aclass = 'suxing-popup-gallery-item';
		}
		var matching = new RegExp("\[.](?:gif|png|jpg|jpeg|webp)($|[?])"),
			image_popup;
		$(".suxing-popup-gallery a").each(function(){

			if( matching.test( $(this).attr('href') ) && $(this).children('img').length == 1 ){
				$(this).addClass(aclass);
				image_popup = true;
			}

		});

		if( image_popup ){
			if( globals.image_popup == 'image' ){
				popupImage();
			}else if( globals.image_popup == 'gallery'  ){
				popupGallery();
			}
		    //popupIframe();
		}

	}

	if( $('.nice-post-popup-gallery').length > 0 ){
		popupGallery('.nice-post-popup-gallery', 'a.popup-link');
	}

});

$(document).on('click', '.comment-reply-link', function(event) {
	event.preventDefault();
});

$(document).on('click', '.add_image', function(event) {
	event.preventDefault();
	$('#comment').insertAtCaret(" [img src='图片地址' alt='图片描述'] ");
});

$(document).on('click', '.add_code', function(event) {
	event.preventDefault();
	$('#comment').insertAtCaret("[code]\nCode\n[/code]");
});

$(document).on('click', '.filter-menu button', function(event) {
	event.preventDefault();
	var t = $(this);
	if( !t.hasClass('active') ){
		$('.filter-menu button').removeClass('active');
		t.addClass('active');
		
		var action = t.data('action');
		if( action ){
			$('.dposts-ajax-load').data('action', action);
		}else{
			$('.dposts-ajax-load').removeData('action');
		}

		var cid = t.data('cid');
		if( cid ){
			$('.dposts-ajax-load').data('type', cid);
		}else{
			$('.dposts-ajax-load').removeData('type');
		}
		
		
		//$('.dposts-ajax-load').data('paged', 1);
		$('.home-list').html('');
		$('.dposts-ajax-load').addClass('loading').text('没有更多了');
		// ajax_load_posts($('.dposts-ajax-load').data());
	}


});

$(document).on('click', '.page-break-ajax', function(event) {
	event.preventDefault();

	var that = $(this);
	var href = $(this).data('href');

	$('.page-break-ajax-load .post-loading').show();
	$('.page-break-ajax-load button').hide();

	$.get(href, function(data) {

		var html = $(data).find('article.post-content').html();

		$(html).insertBefore('div.page-break-ajax-load');

		if( typeof page_break[cursor_page] != 'undefined' ){
			that.data( 'href', page_break[cursor_page] );
			cursor_page++;
			$('.page-break-ajax-load .post-loading').hide();
			$('.page-break-ajax-load button').show();
		}else{
			$('.page-break-ajax-load .post-loading').hide();
			$('.page-break-ajax-load').hide();
		}

		if( globals.image_popup !== 'null' && globals.image_popup !== 'disable' ){

			if( globals.image_popup == 'image' ){
				var aclass = 'suxing-popup-image';
			}else if( globals.image_popup == 'gallery' ){
				var aclass = 'suxing-popup-gallery-item';
			}
			var matching = new RegExp("\[.](?:gif|png|jpg|jpeg|webp)($|[?])"),
				image_popup;
			$(".suxing-popup-gallery a").each(function(){

				if( matching.test( $(this).attr('href') ) && $(this).children('img').length == 1 ){
					$(this).addClass(aclass);
					image_popup = true;
				}

			});

			if( image_popup ){
				if( globals.image_popup == 'image' ){
					popupImage();
				}else if( globals.image_popup == 'gallery'  ){
					popupGallery();
				}
			    //popupIframe();
			}

		}

	});

});

function menu_item_hidden(){
	var navbarSite = jQuery('.navbar-site');
	//navbarSite.removeClass('invisible');
	var right = jQuery('.m-header').width() + jQuery('.m-header').offset().left;


	if( right < jQuery('.navbar-site > li:nth-last-child(-n+1)').offset().left + 150 ){

		var i = 1;
		while ( true ) {
			var hiddenMenus = jQuery('.navbar-site > li:nth-last-child(-n+'+i+')');

			if( hiddenMenus.offset().left + 150 <  right ){

				hiddenMenus.remove();
				break;
			}

			i++;
		}



		var collapseMenus = '<li class="menu-item menu-item-has-children has-children hidden-nav"><a href="#"><i class="far fa-ellipsis-h"></i></a>'
			+ '<ul class="sub-menu">'
			+ $("<div/>").append(hiddenMenus.clone()).html()
			+ '</ul>'
		+ '</li>';
		navbarSite.append(collapseMenus);
	}
}


jQuery(window).bind("load", function() {

	//menu_item_hidden();
	return true;

});

jQuery(window).on('resizeend', function(e) {

	var navbarSite = jQuery('.navbar-site');
	navbarSite.append(jQuery('.hidden-nav .sub-menu li').clone());
	jQuery('.hidden-nav').remove();

	menu_item_hidden();

});


