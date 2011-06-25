$(document).ready(function() {
  $("#drawer_tab").click(function(){
    var drawerWidth = $("#drawer").outerWidth();

    $("#wrap960").animate({
      left: parseInt($("#wrap960").css('left'),10) == drawerWidth ? 
        0 : drawerWidth
    });
    $("#light").animate({
      left: parseInt($("#light").css('left'),10) == drawerWidth/2 ? 
        0 : drawerWidth/2
    });
    $("#drawer").animate({
      left: parseInt($("#drawer").css('left'),10) == 0 ? 
        -drawerWidth : 0
    });
    $("#drawer_tab").animate({
      left: parseInt($("#drawer_tab").css('left'),10) == 0 ?
        drawerWidth : 0
    });
  });
  $("#quick-post input").tooltip({
    // place tooltip on the right edge
    position: "center right",
    // a little tweaking of the position
    offset: [-2, 10],
    
    // use the built-in fadeIn/fadeOut effect
    effect: "fade",
   
    // custom opacity setting
    opacity: 0.7
  });
  $("#post-types").tabs("div.post-type-form", {event:'mouseover'});
});
