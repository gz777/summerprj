"""
File: profiles/serializers.py
Written By: Jerry Turcios
Purpose: Contains the serializers for the profiles app. The serializers will
         convert the model data from the database into JSON.
Version: Python 3.7
"""
from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Profile
from knoogle.ontologies.models import Ontology


class ProfileSerializer(serializers.ModelSerializer):
    """
    The ProfileSerializer class contains the code that serializes the data
    from the Profile model.
    """
    ontologies = serializers.PrimaryKeyRelatedField(many=True, queryset=Ontology.objects.all())

    class Meta:
        """
        The Meta class contains data about the model and the fields for the
        Profile model.
        """
        model = Profile
        fields = ('id', 'user', 'industry', 'position', 'ontologies')
        read_only_fields = ('id', 'ontologies')


class UserSerializer(serializers.ModelSerializer):
    """
    The UserSerializer class contains the code that serializes the data
    from the User model.
    """
    class Meta:
        """
        The Meta class contains data about the model and the fields for the
        User model.
        """
        model = User
        fields = ('id', 'username', 'email',)
        read_only_fields = ('id',)
