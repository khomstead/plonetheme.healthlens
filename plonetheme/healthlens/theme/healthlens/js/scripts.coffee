$ ->
  $('#drawer_tab').click ->
    drawerWidth = $("#drawer").outerWidth()

    if parseInt($('#drawer').css('left')) == 0 
      $('#wrap960').animate left: 0 
      $('#light').animate left: 0
      $('#drawer_tab').animate left: 0
      $('#drawer').animate left: -drawerWidth
    else
      $('#wrap960').animate left: drawerWidth 
      $('#light').animate left: drawerWidth/2
      $('#drawer_tab').animate left: drawerWidth
      $('#drawer').animate left: 0

  $('#quick-post input').tooltip 
    position: "center right"
    offset: [-2, 20]
    effect: "fade"
    opacity: 0.7

  $('#post-types').tabs('div.post-type-form', event: 'mouseover')
