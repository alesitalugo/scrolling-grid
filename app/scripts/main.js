Slider = ( function( options ) {
    'use strict';
    var sections        = [];
    var actual_slide    = { 'row': 0, 'section': 0 };
    var slider          = null;
    var transition      = 'scrollto'; //Default transition.
    var prev_slide      = null;
    var slide_direction = null;

    if( options.transition != null)     // Set the transition efect | To Do: More transitions
        transition = options.transition;

    return {
        'init' : function( el ){
            this.slider = el;
            // Asigns value to __rows
            for ( var i=0; i < $(this.slider).children('.sections-row').length; i++){
                var $actual_row = $(this.slider).children('.sections-row')[i];
                sections.push( $($actual_row).children('.section').length );
                $( $($actual_row).children('.section')  ).each(function(j){
                    this.setAttribute('data-row', i);
                    this.setAttribute('data-section', j);
                });
            }

            // .section-row's width
            this.resize_adjust();
        },
        'resize_adjust' : function(){
            var sections_width = Math.max.apply(null, sections);
            var slider_rows = $(this.slider).children('.sections-row');
            var css_section = {}

            $(this.slider).css({
                'width': $(window).width(),
                'height': $(window).height()
            });

            $(slider_rows).children('.section').css({
                'width': $(window).width(),
                'height': $(window).height()
            });

            $(this.slider).children('.sections-row').css({
                'width': $(window).width() * sections_width,
                'height': $(window).height()
            });

        },
        'slide' : function(row, section){
            var $slide_to_row = null;
            var $slide_to_section = null;

            if( typeof( $(this.slider).children('.sections-row')[row] ) !== 'undefined' ){
                $slide_to_row = $(this.slider).children('.sections-row')[row];
                if( typeof( $($slide_to_row).children('.section')[section] ) !== 'undefined' ){
                    actual_slide.row = row;
                    actual_slide.section = section;
                    $slide_to_section = $($slide_to_row).children('.section')[actual_slide.section];
                    slide_direction = 'left';
                    if( transition == 'scrollto' ){
                        $(this.slider).stop().scrollTo( $($slide_to_section), 300);
                    } else {
                        console.log( actual_slide );
                        $(this.slider).find('.section').removeClass('hold-on actual').addClass('back');
                        $(prev_slide).addClass('hold-on');
                        $( $slide_to_section ).removeClass('back').addClass('actual');
                        prev_slide = $slide_to_section;

                    }
                }
            }

        },
        'slide_next' : function(){
            var actual_row = actual_slide.row;
            var actual_section = actual_slide.section;
            var scroll_status = false;


             if(actual_section >= ( sections[actual_row] - 1 ) ){
                if( ( actual_slide.row+1 ) < sections.length ){
                    actual_slide.row++;
                    actual_slide.section=0;
                    scroll_status = true;
                }

            } else {
                actual_slide.section++;
                scroll_status = true;
            }
            if(scroll_status)
                this.slide( actual_slide.row, actual_slide.section );

        },
        'slide_prev' : function(){
            var actual_row = actual_slide.row;
            var actual_section = actual_slide.section;
            var scroll_status = false;

            if(actual_section <= 0 ){
                if( (actual_slide.row-1) >= 0  ){
                    actual_slide.row--;
                    if( !isNaN( sections[actual_slide.row] - 1 ) ){
                        actual_slide.section=( sections[actual_slide.row] ) - 1;
                        scroll_status = true;
                    }
                }

            } else {
                actual_slide.section--;
                scroll_status = true;
            }
            if (scroll_status)
                this.slide( actual_slide.row, actual_slide.section );
        },
        'slide_up' : function(){
            var actual_row = actual_slide.row;
            var actual_section = actual_slide.section;
            var scroll_status = false;

            if( (actual_row-1) >= 0 ){
                actual_slide.row--;
                actual_slide.section = 0;
                scroll_status = true;
            }

            if(scroll_status)
                this.slide( actual_slide.row, actual_slide.section );

        },
        'slide_down' : function(){
            var actual_row = actual_slide.row;
            var actual_section = actual_slide.section;
            var scroll_status = false;

            if( (actual_row+1) < sections.length ){
                actual_slide.row++;
                actual_slide.section = 0;
                scroll_status = true;
            }

            if(scroll_status)
                this.slide( actual_slide.row, actual_slide.section );
        }
    }
});


var $slider_about_us = new Slider( { transition: 'scrollto' } );
var $slider_inception = new Slider( { transition: 'pageflip' } );

$slider_about_us_el = document.getElementById('sections');
$slider_inception_el = document.getElementById('sections2');

$slider_about_us.init( $slider_about_us_el );
$slider_about_us.slide(0,2);

$slider_inception.init( $slider_inception_el );


$(window).on('resize', function(){
    $slider_about_us.resize_adjust();
    //$slider_inception.resize_adjust();
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
        },

    };
    if( typeof( keycode_function[e.keyCode] ) === 'function'){
        keycode_function[e.keyCode]();
    }
});

$('#menu-numeros').on('click', '.number', function(e){
    e.preventDefault();
    if( ( typeof(this.dataset.row) && typeof(this.dataset.section) ) !== 'undefined' ){
        $slider_about_us.slide(this.dataset.row, this.dataset.section);
    }
});

/**** Eventos Slider 1 */
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


/**** Eventos Slider 2 */
$('#menu2').on('click', '.next-slide', function(e){
    e.preventDefault();
    $slider_inception.slide_next();
});

$('#menu2').on('click', '.prev-slide', function(e){
    e.preventDefault();
    $slider_inception.slide_prev();
});

$('#menu2').on('click', '.up-slide', function(e){
    e.preventDefault();
    $slider_inception.slide_up();
});

$('#menu2').on('click', '.down-slide', function(e){
    e.preventDefault();
    $slider_inception.slide_down();
});
