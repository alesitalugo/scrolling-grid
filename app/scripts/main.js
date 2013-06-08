$slider_sections = {
	'__sections': [],
	'__actual_slide': [], // 0: row, 1: section
	'slider': null,
	'init': function(el){
		// ID of the slider
		this.slider = el;
		this.__actual_slide = [2,0];
		// Asigns value to __rows
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
	'slide':function(row, section){
		row = this.__actual_slide[0];
		section = this.__actual_slide[1];
		var $slide_to_row = $(this.slider).find('.sections-row')[this.__actual_slide[0]];
		var $slide_to_section = $($slide_to_row).find('.section')[this.__actual_slide[1]];
		$(this.slider).stop().scrollTo($($slide_to_section), 300);
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
			} 

		} else { 
			this.__actual_slide[1]++;
			scroll_status = true;
		}
		
		if(scroll_status) {
			this.slide( this.__actual_slide[0], this.__actual_slide[0] );
			console.log( this.__actual_slide );
		}
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
					scroll_status = true;
				}
			} 

		} else {
			this.__actual_slide[1]--;
			scroll_status = true;
		}
		this.slide( this.__actual_slide[0], this.__actual_slide[0] );
	}, 
	'slide_up':function(){
		var actual_row = this.__actual_slide[0];
		var actual_section = this.__actual_slide[1];
		var scroll_status = false;

		if( (actual_row-1) >= 0 ){
			this.__actual_slide[0]--;
			this.__actual_slide[1] = 0;
			scroll_status = true;
		}

		if(scroll_status)
			this.slide( this.__actual_slide[0], this.__actual_slide[1] );

	}, 
	'slide_down':function(){
		var actual_row = this.__actual_slide[0];
		var actual_section = this.__actual_slide[1];

		if( (actual_row+1) < this.__sections.length ){
			this.__actual_slide[0]++;
			this.__actual_slide[1] = 0;
			scroll_status = true;
		}

		console.log(this.__actual_slide);
		this.slide( this.__actual_slide[0], this.__actual_slide[1] );
	}
};

var $slider_about_us = $slider_sections;

$slider_about_us_el = document.getElementById('sections');
$slider_about_us.init( $slider_about_us_el );
$slider_about_us.slide();

$(window).on('resize', function(){
	$slider_about_us.resize_adjust();
});
$(window).keydown(function(e){
	var keycode_function = {
		// Up
		'38' : function(){
			$slider_about_us.slide_up();
		},
		// Down
		'40' : function(){
			$slider_about_us.slide_down();
		},
		// Prev
		'37' : function(){
			$slider_about_us.slide_prev();
		},
		// Next
		'39' : function(){
			$slider_about_us.slide_next();
		}
	};
	keycode_function[e.keyCode]();
});


$('#menu').on('click', '.next-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_next();
});
Hammer($slider_about_us_el).on('swipeleft', function(e){
	e.preventDefault();
	$slider_about_us.slide_next();
});
$('#menu').on('click', '.prev-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_prev();
});
Hammer($slider_about_us_el).on('swiperight', function(e){
	e.preventDefault();
	$slider_about_us.slide_prev();
});
$('#menu').on('click', '.up-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_up();
});
Hammer($slider_about_us_el).on('swipeup', function(e){
	e.preventDefault();
	$slider_about_us.slide_up();
});
$('#menu').on('click', '.down-slide', function(e){
	e.preventDefault();
	$slider_about_us.slide_down();
});
Hammer($slider_about_us_el).on('swipedown', function(e){
	e.preventDefault();
	$slider_about_us.slide_down();
});