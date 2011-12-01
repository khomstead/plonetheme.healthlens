(function() {
  var $;
  $ = jQuery;
  $.noConflict();
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

     $.getJSON(portal_url + '/@@xmpp-loader', function (data) {
        jarnxmpp.BOSH_SERVICE = data.BOSH_SERVICE;
        jarnxmpp.pubsub_jid = data.pubsub_jid;
        jarnxmpp.jid = data.jid;
        jarnxmpp.connection = new Strophe.Connection(jarnxmpp.BOSH_SERVICE);
        if (('rid' in data) && ('sid' in data))
          jarnxmpp.connection.attach(jarnxmpp.jid, data.sid, data.rid, jarnxmpp.onConnect);
        else
          jarnxmpp.connection.connect(jarnxmpp.jid, data.password, jarnxmpp.onConnect);
      });
 

    jarn.i18n.loadCatalog('jarn.xmpp.core.js');
    jarnxmpp.UI._ = jarn.i18n.MessageFactory('jarn.xmpp.core.js');

    $('.sendXMPPMessage').live('submit', function (e) {
        var $field = $('input[name="message"]', this),
            text = $field.val(),
            recipient = $field.attr('data-recipient'),
            message;
            $(this).parents('.user-details-form')
                   .parent()
                   .children('.user-details-toggle')
                   .removeClass('expanded');
            var gritter_id = $(this).attr('data-gritter-id');
            if (typeof(gritter_id) !== 'undefined')
                $.gritter.remove(gritter_id);
            $("ul#online-users").removeClass('activated');
            $field.val('');
        $.getJSON(portal_url + '/content-transform?', {text: text}, function (data) {
            message = $msg({to: recipient, type: 'chat'}).c('body').t(data.text);
            jarnxmpp.connection.send(message);
        });
        e.preventDefault();
    });

    $('a#toggle-online-users').bind('click', function (e) {
        if ($("ul#online-users").hasClass('activated')) {
            $("ul#online-users").removeClass('activated');
            $('a.user-details-toggle').removeClass('expanded');
        }
        else {
            $("ul#online-users").addClass('activated');
        }
        e.preventDefault();
    });

    $('a.user-details-toggle').live('click', function (e) {
        $('a.user-details-toggle').removeClass('expanded');
        $(this).toggleClass('expanded');
        $(this).next().find('input[name="message"]').focus();
        e.preventDefault();
    });

    $('#pubsub-form input[name="share-location"]').change(function () {
        if ($(this).attr('checked')) {
            var $checkbox = $(this);
            $('div.discreet', $checkbox.parent()).remove();
            navigator.geolocation.getCurrentPosition(
                function(success) {},
                function(error) {
                    $checkbox.attr('checked', false);
                    $checkbox.parent().append(
                        $('<div>').text(jarnxmpp.UI._('Cannot determine your location. Please allow this site to track your location in your browser settings.')).addClass('discreet'));
                }, {maximumAge:600000});
        }
    });

    $('#pubsub-form').bind('submit', function (e) {
        var $field = $('input[name="message"]', this),
            text = $field.attr('value'),
            node = $field.attr('data-node'),
            share_location = $('input[name="share-location"]', this).attr('checked');

        if (share_location && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(geolocation) {
                    jarnxmpp.PubSub.publishToPersonalNode(node, text, geolocation);
                    $field.attr('value', '');
                },
                function(error) {});
        } else {
            jarnxmpp.PubSub.publishToPersonalNode(node, text, null);
            $field.attr('value', '');
        }
        return false;
    });

    $('.replyForm').find('> a').live('click', function (e) {
        $(this).hide();
        $(this).next('form.sendXMPPMessage').fadeIn('medium');
        $(this).next('form.sendXMPPMessage').find('input[name="message"]').focus();
        e.preventDefault();
    });

    $('.pubsubNode').magicLinks();
    jarnxmpp.UI.updatePrettyDates();

    $('.location').live('click', function (e) {
        $locelem = $(this);
        var map_id = $locelem.parent().find('.map').attr('id');
        if ($('#' + map_id).is(':hidden')) {
            jarnxmpp.UI._loadGoogleMapsAPI(function () {
                var latitude = $locelem.attr('data-latitude'),
                    longitude = $locelem.attr('data-longitude');
                jarnxmpp.UI.reverseGeocode(latitude, longitude, function(city) {
                    $locelem.text(city);
                });
                jarnxmpp.UI.showGoogleMap(map_id, latitude, longitude);
            });
        } else {
            $('#' + map_id).hide();
            $locelem.text('');
        }
    });

    $('#share-geolocation').each(function () {
        if (navigator.geolocation)
            $(this).show();
    });

    if (jarnxmpp.Storage.storage !==null) {
        var count = jarnxmpp.Storage.get('online-count');
        if (count !== null) {
            $('#online-count').text(count);
        }
    }
    // Load the site stream into the drawer
    $('#pane3').load('/@@pubsub-feed?node=people');

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
