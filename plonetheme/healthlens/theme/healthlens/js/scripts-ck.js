$=jQuery_1_7_1;$(function(){jQuery(".overlay-profile").prepOverlay({subtype:"ajax",filter:"#content > *",config:{mask:{color:"#000",opacity:.7}}});var e=-15,t=1.2;$(".item").hover(function(){width=$(".item").width()*t;height=$(".item").height()*t;$(this).find("img").stop(!1,!0).animate({width:width,height:height,top:e,left:e},{duration:200});$(this).find("div.caption").stop(!1,!0).fadeIn(200)},function(){$(this).find("img").stop(!1,!0).animate({width:$(".item").width(),height:$(".item").height(),top:"0",left:"0"},{duration:100});$(this).find("div.caption").stop(!1,!0).fadeOut(200)})});