Slider = (function(){
    var __sections = [];
    var __actual_slide = [0,0]; // 0: row, 1: section
    "use strict";
    var slider = null;
    var transition = 'scrollto'; /* To DO: More transitions */

    return {
        'init': function( el ){
            this.slider = el;
            // Asigns value to __rows
            for (i=0; i < $(this.slider).children('.sections-row').length; i++){
                var $actual_row = $(this.slider).children('.sections-row')[i];
                __sections.push( $($actual_row).children('.section').length );

                var $dottet = document.getElementById('section3');
                console.log($(this.slider).children('.sections-row').find('.section'));
                $dottet.setAttribute('data-item-slide', i++);

            }
            // .section-row's width
           /* console.log( this.slider );
            console.log( __sections );*/

            this.resize_adjust();
        },

        'resize_adjust': function(){
            var sections_width = Math.max.apply(null, __sections);
            var slider_rows = $(this.slider).children('.sections-row');

           /*console.log( slider_rows );*/

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
        'slide':function(row, section){
            __actual_slide[0] = row;
            __actual_slide[1] = section;
            var $slide_to_row = $(this.slider).children('.sections-row')[__actual_slide[0]];
            var $slide_to_section = $($slide_to_row).children('.section')[__actual_slide[1]];
            if(transition == 'scrollto'){
                $(this.slider).stop().scrollTo( $($slide_to_section), 300);
            }
            //console.log( __actual_slide  );

        },
        'slide_next': function(){
            var actual_row = __actual_slide[0];
            var actual_section = __actual_slide[1];
            var scroll_status = false;


             if(actual_section >= ( __sections[actual_row] - 1 ) ){
                if( ( __actual_slide[0]+1 ) < __sections.length ){
                    __actual_slide[0]++;
                    __actual_slide[1]=0;
                    scroll_status = true;
                }

            } else {
                __actual_slide[1]++;
                scroll_status = true;
            }
            if(scroll_status){
               /* console.log( __actual_slide );*/
                this.slide( __actual_slide[0], __actual_slide[1] );
            }

        },
        'slide_prev': function(){
            var actual_row = __actual_slide[0];
            var actual_section = __actual_slide[1];
            var scroll_status = false;

            if(actual_section <= 0 ){
                if( (__actual_slide[0]-1) >= 0  ){
                    __actual_slide[0]--;
                    if( !isNaN( __sections[__actual_slide[0]] - 1 ) ){
                        __actual_slide[1]=( __sections[__actual_slide[0]] ) - 1;
                        scroll_status = true;
                    }
                }

            } else {
                __actual_slide[1]--;
                scroll_status = true;
            }
            if (scroll_status)
                this.slide( __actual_slide[0], __actual_slide[1] );
        },
        'slide_up':function(){
            var actual_row = __actual_slide[0];
            var actual_section = __actual_slide[1];
            var scroll_status = false;

            if( (actual_row-1) >= 0 ){
                __actual_slide[0]--;
                __actual_slide[1] = 0;
                scroll_status = true;
            }

            if(scroll_status)
                this.slide( __actual_slide[0], __actual_slide[1] );

        },
        'slide_down':function(){
            var actual_row = __actual_slide[0];
            var actual_section = __actual_slide[1];
            var scroll_status = false;

            if( (actual_row+1) < __sections.length ){
                __actual_slide[0]++;
                __actual_slide[1] = 0;
                scroll_status = true;
            }

            if(scroll_status)
                this.slide( __actual_slide[0], __actual_slide[1] );
        }
    }
});


var $slider_about_us = new Slider();
var $slider_inception = new Slider();

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
$('#menu-numeros').on('click', '.number', function(){

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
