(function($){
	$.fn.mySlider = function(options){
		var defaults = {
			speed : 1000,
			pause : 2000,
			transition : 'slide'
		},
		options = $.extend(defaults,options);

		this.each(function(){

			var $this = $(this);
			if(options.pause <= options.speed){
				options.pause = options.speed + 100;
			}
			$this.wrap('<div class="slider-wrap" />');

			$this.css({
				'width' : '999999px',
				'position' : 'relative',
				'padding' : 0
			});

			if(options.transition === 'slide'){
				$this.children().css({
					'float' : 'left',
					'list-style' : 'none'
				});
				$('.slider-wrap').css({
					'width' : $this.children().width(),
					'overflow' : 'hidden'
				});
				slide();
			}
			if(options.transition === 'fade'){
				$this.children().css({
					'width' : $this.children().width(),
					'position' : 'absolute',
					'left' : 0
				});
				for( var i = $this.children().length -1, y = 0; i >= 0; i--, y++){
					$this.children().eq(y).css('zIndex', i + 9999999);
				}
				fade();
			}
			function fade(){
				setInterval(function(){
					$this.children(':first').animate({ 'opacity' : 0 }, options.speed, function(){
						$this
							.children(':first')
							.css('opacity', 1)
							.css('zIndex', $this.children(':last').css('zIndex') -1 )
							.appendTo($this);
					})
				}, options.pause);
			} //End Fade Function			
			function slide(){
				setInterval(function(){
					$this.animate({ 'left' : '-' + $this.parent().width() }, options.speed, function(){
						$this
							.css('left', 0)
							.children(':first')
							.appendTo($this);
					});
				}, options.pause);
			}
		}); //End intit
	}//End Plugin
})(jQuery);