$(document).ready( function() {

	$('.newsImageContainer a')
	    .prepOverlay({
	        subtype:'image',
	        urlmatch:'/image_view_fullscreen$',
	        urlreplace:'_preview',
            config: {
                mask: {
                    color: '#000',
                    opacity: 0.7,
                },
            }
	    });

    $('.overlay-profile').prepOverlay({
        subtype: 'ajax',
        filter: '#content > *',
        config: { 
            mask: {
                color: '#000',
                opacity: 0.7,
            },
        }
    });
 
    //move the image in pixel
    var move = -15;
     
    //zoom percentage, 1.2 =120%
    var zoom = 1.2;
 
    //On mouse over those thumbnail
    $('.item').hover(function() {
         
        //Set the width and height according to the zoom percentage
        width = $('.item').width() * zoom;
        height = $('.item').height() * zoom;
         
        //Move and zoom the image
        $(this).find('img').stop(false,true).animate({'width':width, 'height':height, 'top':move, 'left':move}, {duration:200});
         
        //Display the caption
        $(this).find('div.caption').stop(false,true).fadeIn(200);
    },
    function() {
        //Reset the image
        $(this).find('img').stop(false,true).animate({'width':$('.item').width(), 'height':$('.item').height(), 'top':'0', 'left':'0'}, {duration:100});    
 
        //Hide the caption
        $(this).find('div.caption').stop(false,true).fadeOut(200);
    });
 
});

