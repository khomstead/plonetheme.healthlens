$(document).ready( function() {

    //prepend span tag to H1
    $("#page-title h1").prepend("<span></span>");

    //Set copyright date to current year
    var theYear = new Date().getFullYear();
    $("#copyright").html(theYear);

    //Products.Collage initialization
    setupContentMenu();
    setupHandlers();                                                                 
    setupNavigation(); 

    //Bootstrap modal wants to be moved here:
    $('.modal').appendTo($("body"));

    //Get clarify-it documents
    var doc_id = $('#clarify_it_id').html();
    $('#clarify-it').load('/clarify/'+doc_id+' #content', function(){
        $("a[rel^='prettyPhoto']").prettyPhoto();
    });

    $('#new_helpdesk_note').on('submit',function(e){
        e.preventDefault();
        var action = '' + jquery(this).attr('action'); 
        var fd = new FormData(document.getElementById('new_helpdesk_note'));

        var note = $('textarea#portal_ticket_note').val();

        $.ajax({
            type     : "POST",
            url      : action,
            data     : fd,
            contentType : false,
            processData : false,
        })
        .done( function (data) {
            location.reload();
        })
        .fail( function (data) {
            alert('error');
        });
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

