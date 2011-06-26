(function() {
  $(function() {
    $('#drawer_tab').click(function() {
      var drawerWidth;
      drawerWidth = $("#drawer").outerWidth();
      if (parseInt($('#drawer').css('left')) === 0) {
        open;
      }
      $('#wrap960').animate({
        left: open ? 0 : drawerWidth
      });
      $('#light').animate({
        left: open ? 0 : drawerWidth / 2
      });
      $('#drawer').animate({
        left: open ? -drawerWidth : 0
      });
      return $('#drawer_tab').animate({
        left: open ? drawerWidth : 0
      });
    });
    $('#quick-post input').tooltip(function() {
      return {
        position: "center right",
        offset: [-2, 20],
        effect: "fade",
        opacity: 0.7
      };
    });
    return $('#post-types').tabs('div.post-type-form', {
      event: 'mouseover'
    });
  });
}).call(this);
