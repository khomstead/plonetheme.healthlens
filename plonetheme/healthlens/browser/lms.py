from zope.interface import implements, Interface
from Products.Five import BrowserView
from plone import api
from zope.component import getUtility
from plone.registry.interfaces import IRegistry
import requests
import json


class ILMSView(Interface):
    """
    LMS view interface
    """

class LMSView(BrowserView):
    """
    LMS browser view
    """
    implements(ILMSView)

    def my_courses(self):
        # Get courses for the current user.
        current = api.user.get_current()
        email = current.getProperty('email')
        registry = getUtility(IRegistry)
        secret = registry['plonetheme.healthlens.lms_secret']
        payload = {'email': email,
                   'secret': secret, 
                  }
        r = requests.get('https://portal.healthlens.org/lms.php', params=payload)
        
        return r.text
