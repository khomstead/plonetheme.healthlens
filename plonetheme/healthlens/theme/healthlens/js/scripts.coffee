$ ->
  $('#drawer_tab').click ->
    drawerWidth = $("#drawer").outerWidth()

    if parseInt($('#drawer').css('left')) == 0 
      $('#page').animate left: 0 
      $('#light').animate left: 0
      $('#drawer_tab').animate left: 0
      $('#drawer').animate left: -drawerWidth
    else
      $('#page').animate left: drawerWidth 
      $('#light').animate left: drawerWidth/2
      $('#drawer_tab').animate left: drawerWidth
      $('#drawer').animate left: 0

  $('#quick-post input').tooltip 
    position: "center right"
    offset: [-2, 20]
    effect: "fade"
    opacity: 0.7

  $('#post-types').tabs('div.post-type-form', event: 'mouseover')
  $('#drawer_nav ul').tabs("#panes > dl", 
    effect: 'fade'
    fadeOutSpeed: 400
  )

  $('a.overlayLink').prepOverlay
    subtype: 'ajax'
    filter: common_content_filter
    #// Add this to a link or button to make it close the overlay e.g.
    #// on cancel without reloading the page
    #//closeselector: '.overlayCloseAction',
    # formselector: 'form.overlayForm,form.edit-form',
    config: 
      top: 130
      mask: 
        color: '#000000'
        opacity: 0.8
   
