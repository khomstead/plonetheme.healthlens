jQuery(document).ready( function($) {

    $("#personaltools-live_support a").on("click", function(e) {
        e.preventDefault();
        olark('api.box.expand');
    });
    //prepend span tag to H1
    $("#page-title h1").prepend("<span></span>");
    var theYear = new Date().getFullYear();
    $("#copyright").html(theYear);

    var element = document.querySelector('#portal-megamenu');
    if (element.offsetHeight < element.scrollHeight) {
        $(element).prepend("<img src='/++theme++plonetheme.healthlens/images/down-arrow.gif' style='position:absolute;right:1em;bottom:0;z-index:1;width:50px' id='downarrow'/><img src='/++theme++plonetheme.healthlens/images/down-arrow.gif' style='position:absolute;right:1em;top:0;z-index:1;width:50px;display:none' id='uparrow'/>"
            );
    }

    $("#downarrow").on("click", function() {
        $("#portal-megamenu").animate({
            scrollTop: "400px"
        }, 2000);
        $("#uparrow").fadeIn("2000");
        $(this).fadeOut("slow");
    });
    $("#uparrow").on("click", function() {
        $("#portal-megamenu").animate({
            scrollTop: "0px"
        }, 2000);
        $("#downarrow").fadeIn("2000");
        $(this).fadeOut("slow");
    });

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

