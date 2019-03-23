
$(function(){
    $(document).mousemove(function(event){
        window.mouseX =  event.pageX;
        window.mouseY =  event.pageY;
        $('.mouseXPos').text(window.mouseX);
        $('.mouseYPos').text(window.mouseY);

        window.W =  $(window).width();
        window.H =   $(window).height();
        $('.winW').text(window.W);
        $('.winH').text(window.H);




    });

 var mvx;
 var mvy;
    var taskMapMove = setInterval(function(){
        if (!window.isPaused) {
            if( (window.W-100) < window.mouseX ){
                $( '.map' ).css( 'right', '+=1px' );
                $( '.units' ).css( 'right', '+=1px' );
            }else if( 100 > window.mouseX ){
                $( '.map' ).css( 'right', '-=1px' );
                $( '.units' ).css( 'right', '-=1px' );
            }

            if( (window.H-100) < window.mouseY ){
                $( '.map' ).css( 'top', '-=1px' );
                $( '.units' ).css( 'top', '-=1px' );
            }else if( 100 > window.mouseY ){
                $( '.map' ).css( 'top', '+=1px' );
                $( '.units' ).css( 'top', '+=1px' );
            }
        }
    },10);
})
