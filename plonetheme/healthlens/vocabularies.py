from zope.interface import implements
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleVocabulary
from zope.schema.vocabulary import SimpleTerm

class KnowledgeBaseVocabulary(object):
    """Vocabulary factory for knowledge base categories.
    """
    implements(IVocabularyFactory)

    def __call__(self, context):
        """ See IVocabularyFactory interface
        """

        items = [ 
            "Billing",
            "Clinical", 
            "Practice Management",
            "Reception",
            "Quality",
            "Workflow",
            ]
        items = [SimpleTerm(i, i, i) for i in items]
        return SimpleVocabulary(items)

KnowledgeBaseVocabularyFactory = KnowledgeBaseVocabulary()
