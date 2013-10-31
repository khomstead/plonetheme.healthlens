from zope.interface import implements, Interface
from Products.Five import BrowserView
from plone import api
from zope.component import getUtility
from plone.registry.interfaces import IRegistry
import requests
import json



class ITicketsView(Interface):
    """
    Freshdesk tickets view interface
    """

class ticketsView(BrowserView):
    """
    Freshdesk tickets browser view
    """
    implements(ITicketsView)

    def open_tickets(self):
        # Get open tickets for the current user.
        current = api.user.get_current()
        email = current.getProperty('email')
        payload = {'email': email,
                   'filter': 'new_and_my_open',
                  }
        registry = getUtility(IRegistry)
        freshdesk_domain_name = registry['collective.freshdesk.domain_name']
        url = '%s/helpdesk/tickets/user_tickets' % freshdesk_domain_name
        username = registry['collective.freshdesk.username']
        password = registry['collective.freshdesk.password']
        r = requests.get(url, params=payload, auth=(username, password))
        
        tickets = []
        try:
            tickets = json.loads(r.text)
        except:
            pass
        
        return tickets

