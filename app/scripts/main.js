$slider_sections = {
	'__sections': [],
	'__actual_slide': [],
	'slider': null,
	'init': function(el){
		// ID of the slider
		this.slider = el;
		this.__actual_slide = [0,0];
		// Asigns value to __sections
		for (i=0; i < $(this.slider).find('.sections-row').length; i++){
			var $actual_row = $(this.slider).find('.sections-row')[i];
			this.__sections.push($($actual_row).find('.section').length);
		}
		// .section-row's width
		this.resize_adjust();

	},
	'resize_adjust': function(){
		var sections_width = Math.max.apply(null, this.__sections);
		$(this.slider).css({
			'width': $(window).width(),
			'height': $(window).height()
		});
		$(this.slider).find('.section').css({
			'width': $(window).width(),
			'height': $(window).height()
		});
		$(this.slider).find('.sections-row').css({
			'width': $(window).width() * sections_width,
			'height': $(window).height()
		});
	},
	'slide': function(){
		var $slide_to_row = $(this.slider).find('.sections-row')[this.__actual_slide[0]];
		var $slide_to_section = $($slide_to_row).find('.section')[this.__actual_slide[1]];
		$(this.slider).scrollTo($($slide_to_section),300);
	},
	'slide_next': function(){
		
		var actual_row = this.__actual_slide[0];
		var actual_section = this.__actual_slide[1];
		var scroll_status = false;

		if(actual_section >= ( this.__sections[actual_row] - 1 ) ){
			if( (this.__actual_slide[0]+1) < this.__sections.length ){
				this.__actual_slide[0]++;
				this.__actual_slide[1]=0;
				scroll_status = true;
			} else {
				scroll_status = false;
			}

		} else {
			this.__actual_slide[1]++;
			scroll_status = true;
		}

		if(scroll_status)
			this.slide();
	},
	'slide_prev': function(){
		var actual_row = this.__actual_slide[0];
		var actual_section = this.__actual_slide[1];
		var scroll_status = false;

		if(actual_section <= 0 ){
			if( (this.__actual_slide[0]-1) >= 0  ){
				this.__actual_slide[0]--;
				if( !isNaN(this.__sections[this.__actual_slide[0]] - 1 ) ){
					this.__actual_slide[1]=( this.__sections[this.__actual_slide[0]] ) - 1;
				}
				scroll_status = true;
			} else {
				scroll_status = false;
			}

		} else {
			this.__actual_slide[1]--;
			scroll_status = true;
		}

		if (scroll_status)
			this.slide();
	}
};

var $slider_about_us = $slider_sections;

$slider_about_us.init( $('#sections') );

$(window).on('resize', function(){
	$slider_about_us.resize_adjust();
});

$('#menu').on('click', '.next-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_next();
});
$('#menu').on('click', '.prev-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_prev();
});