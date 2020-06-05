"""
File: ontologies/views.py
Written By: Jerry Turcios
Purpose: Contains the views for the ontologies app.
Version: Python 3.7
"""
from rest_framework import permissions, viewsets

from .serializers import *


class OntologyViewSet(viewsets.ModelViewSet):
    """
    The OntologyViewSet class provides read and write operations for any
    instance of the Ontology class.
    """
    queryset = Ontology.objects.all()
    serializer_class = OntologySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        """
        The perform_create method overrides a method in the CreateModelMixin
        class in Django REST Framework.

        :param serializer: The serializer for the model
        """
        serializer.save()
