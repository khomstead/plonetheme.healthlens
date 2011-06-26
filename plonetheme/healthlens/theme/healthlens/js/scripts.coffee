$ ->
  $('#drawer_tab').click ->
    drawerWidth = $("#drawer").outerWidth()
    if parseInt($('#drawer').css('left')) == 0 then open

    $('#wrap960').animate
      left: if open then 0 else drawerWidth

    $('#light').animate
      left: if open then 0 else drawerWidth/2

    $('#drawer').animate
      left: if open then -drawerWidth else 0
    
    $('#drawer_tab').animate
      left: if open then drawerWidth else 0
    
    $('#drawer').animate
      left: if open then -drawerWidth else 0

  $('#quick-post input').tooltip ->
    position: "center right"
    offset: [-2, 20]
    effect: "fade"
    opacity: 0.7

  $('#post-types').tabs('div.post-type-form', event: 'mouseover')
