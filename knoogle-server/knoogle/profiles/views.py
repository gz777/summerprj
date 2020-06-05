"""
File: profiles/views.py
Written By: Jerry Turcios
Purpose: Contains the views for the profiles app.
Version: Python 3.7
"""
from rest_framework import permissions, viewsets

from .serializers import *


class ProfileViewSet(viewsets.ModelViewSet):
    """
    The ProfileViewSet class provides read and write operations for any
    instance of the Profile class.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        """
        The perform_create method overrides a method in the CreateModelMixin
        class in Django REST Framework.

        :param serializer: The serializer for the model
        """
        serializer.save()


class UserViewSet(viewsets.ModelViewSet):
    """
    The UserViewSet class provides read and write operations for any instance
    of the User class.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
