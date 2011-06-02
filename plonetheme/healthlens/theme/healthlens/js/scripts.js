$(document).ready(function() {
  $("#drawer_tab").click(function(){
    $("#wrap960").animate({
      left: parseInt($("#wrap960").css('left'),10) == 300 ? 
        0 : 300
    });
    $("#drawer").animate({
      left: parseInt($("#drawer").css('left'),10) == 0 ? 
        -$("#drawer").outerWidth() : 0
    });
  });
});
