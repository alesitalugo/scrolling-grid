Slider = ( function( options ) {
    var __sections = [];
    var __actual_slide = [0,0]; // 0: row, 1: section
    var slider = null;
    var transition = 'scrollto';
    var prev_slide = null;
    if( options.transition != null)
        transition = options.transition; /* To DO: More transitions */

    return {
        'init': function( el ){
            this.slider = el;
            // Asigns value to __rows
            for (i=0; i < $(this.slider).children('.sections-row').length; i++){
                var $actual_row = $(this.slider).children('.sections-row')[i];

                __sections.push( $($actual_row).children('.section').length );
                $( $actual_row.querySelectorAll('.section')  ).each(function(j){
                   $(this)[0].setAttribute("data-row", i);
                   $(this)[0].setAttribute("data-section", j);
               });
            }
            
            // .section-row's width
            this.resize_adjust();
        },

        'resize_adjust': function(){
            var sections_width = Math.max.apply(null, __sections);
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
        'slide':function(row, section){
            __actual_slide[0] = row;
            __actual_slide[1] = section;
            var $slide_to_row = $(this.slider).children('.sections-row')[__actual_slide[0]];
            var $slide_to_section = $($slide_to_row).children('.section')[__actual_slide[1]];

            if(transition == 'scrollto'){
                $(this.slider).stop().scrollTo( $($slide_to_section), 300);
            } else {
                console.log( __actual_slide );
                $(this.slider).find('.section').removeClass('hold-on actual').addClass('back');
                $(prev_slide).addClass('hold-on');
                $( $slide_to_section ).removeClass('back').addClass('actual');
                prev_slide = $slide_to_section;
            }

        },
        'slide_number': function(){
            var actual_row = __actual_slide[0];
            var actual_section = __actual_slide[1];

            var $slide_to_row = this.dataset.row;
            var $slide_to_section = this.dataset.section;
            
            this.slide( __actual_slide[0], __actual_slide[1] );

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
            if(scroll_status)
                this.slide( __actual_slide[0], __actual_slide[1] );

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

$('#menu-numeros').on('click', '.number', function(){
       
    if( ( typeof(this.dataset.row) && typeof(this.dataset.section) ) !== 'undefined' ){
        this.dataset.row;
        this.dataset.section; 
    }
    $slider_about_us.slide(this.dataset.row, this.dataset.section);

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
