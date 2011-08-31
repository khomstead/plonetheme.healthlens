(function() {
  var $;
  $ = jQuery;
  $(function() {
    $('#drawer_tab').click(function() {
      var drawerWidth;
      drawerWidth = $("#drawer").outerWidth();
      if (parseInt($('#drawer').css('left')) === 0) {
        $('#page').animate({
          left: 0
        });
        $('#light').animate({
          left: 0
        });
        $('#drawer_tab').animate({
          left: 0
        });
        $('#drawer').animate({
          left: -drawerWidth
        });
        return $('#foot-base').animate({
          left: 0
        });
      } else {
        $('#page').animate({
          left: drawerWidth
        });
        $('#light').animate({
          left: drawerWidth / 2
        });
        $('#drawer_tab').animate({
          left: drawerWidth
        });
        $('#drawer').animate({
          left: 0
        });
        return $('#foot-base').animate({
          left: drawerWidth
        });
      }
    });
    $('#quick-post input').tooltip({
      position: "center right",
      offset: [-2, 20],
      effect: "fade",
      opacity: 0.7
    });
    $('#post-types').tabs('div.post-type-form', {
      event: 'mouseover'
    });
    $('#drawer_nav ul').tabs("#panes > dl");
    return $('a.overlayLink').prepOverlay({
      subtype: 'ajax',
      filter: common_content_filter,
      config: {
        top: 130,
        mask: {
          color: '#000000',
          opacity: 0.5
        }
      }
    });
  });
}).call(this);
