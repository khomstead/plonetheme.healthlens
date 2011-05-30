from setuptools import setup, find_packages
import os


setup(
    name='plonetheme.healthlens',
    version='0.1.1',
    description='An installable Diazo theme for Plone 4.1',
    long_description=open("README.rst", "rb").read() +
        open(os.path.join("docs", "HISTORY.txt"), "rb").read(),
    author='Kyle Homstead',
    author_email='khomstead@healthlens.org',
    url='https://github.com/khomstead/plonetheme.healthlens',
    classifiers=[
        'Framework :: Plone',
        'Programming Language :: Python',
    ],
    keywords='web zope plone theme diazo',
    packages=find_packages(),
    include_package_data=True,
    namespace_packages=[
        'plonetheme',
    ],
    install_requires=[
        'setuptools',
        'plone.app.theming',
    ],
    entry_points={
        'z3c.autoinclude.plugin': 'target = plone',
    },
)
