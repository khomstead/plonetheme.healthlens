
Introduction
============

The ``plonetheme.healthlens`` package uses the **theming** and **packaging** features
available in `plone.app.theming`_ to make the theme `Healthlens`_ easily
available in `Plone 4.1`_.

Installation
------------

Add Plone site
~~~~~~~~~~~~~~

Install Plone 4.1 with `plone.app.theming`_ and create a Plone site (if you have not already)
with Diazo theming configured.


Buildout
~~~~~~~~

If you are a developer, you might enjoy installation via buildout.

Add ``plonetheme.healthlens`` to your ``plone.recipe.zope2instance`` section's *eggs* parameter e.g.::

    [instance]
    eggs =
        Plone
        …
        plonetheme.healthlens

Select theme
~~~~~~~~~~~~

Select and enable the theme from the Diazo control panel.


That's it!

You should see (without the calendar):


Help
----

Obviously there is more work to be done. If you want to help, pull requests accepted! Some ideas:

* Add a diazo rule to import Plone editing styles
* Configure styles to use portal_css
* Add quick installer support
* Improve styles 

.. _`plone.app.theming`: http://pypi.python.org/pypi/plone.app.theming
.. _`Plone 4.1`: http://pypi.python.org/pypi/Plone/4.1rc2

