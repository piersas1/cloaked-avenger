
if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {
	var Slider = {
		//Make all of the options for the slider
		init : function(options, el){
			var base = this;
			base.$elm = $(el);
			base.options = $.extend({}, $.fn.capeSlider.options, options);

			base.userOptions = options;
			base.createSlider();
		},
		createSlider : function(){
			var base = this;
			base.$elm.wrap('<div class="slider-wrap" />');
			base.$elm.css({
				'width' : '999999px',
				'position' : 'relative',
				'padding' : 0
			});
			if(base.options.transition === 'slide'){
				base.slideStyles();
			}
			else if(base.options.transition === 'fade'){
				base.fadeStyles();
			}
		},
		slideStyles : function(){
			var base = this;
			base.$elm.children().css({
				'float' : 'left',
				'list-style' : 'none'
			});
			$('.slider-wrap').css({
				'width' : base.$elm.children().width(),
				'overflow' : 'hidden'
			});
			base.slideScript();
		},
		slideScript : function(){
			var base = this;
			setInterval(function(){
				base.$elm.animate({ 'left' : '-' + base.$elm.parent().width() }, base.options.speed, function(){
					base.$elm
						.css('left', 0)
						.children(':first')
						.appendTo(base.$elm);
				});
			}, base.options.pause);

		},
		fadeStyles : function(){
			var base = this;
			base.$elm.children().css({
				'width' : base.$elm.children().width(),
				'position' : 'absolute',
				'left' : 0
			});
			for( var i = base.$elm.children().length -1, y = 0; i >= 0; i--, y++){
				base.$elm.children().eq(y).css('zIndex', i + 9999999);
			}
			base.fadeScript();
		},
		fadeScript : function(){
			var base = this;
			setInterval(function(){
				base.$elm.children(':first').animate({ 'opacity' : 0 }, base.options.speed, function(){
					base.$elm
						.children(':first')
						.css('opacity', 1)
						.css('zIndex', base.$elm.children(':last').css('zIndex') -1 )
						.appendTo(base.$elm);
				})
			}, base.options.pause);
		}

	}

	$.fn.capeSlider = function (options) {
		var slider = Object.create(Slider);
		console.log(slider);
		slider.init(options, this);
	}
	$.fn.capeSlider.options = {
		speed : 1000,
		pause : 2000,
		transition : 'fade'
	};
})( jQuery, window, document );