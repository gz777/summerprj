"""
File: ontologies/serializers.py
Written By: Jerry Turcios
Purpose: Contains the serializers for the ontologies app. The serializers will
         convert the model data from the database into JSON.
Version: Python 3.7
"""
from rest_framework import serializers

from .models import Ontology
# from knoogle.profiles.models import Profile


class OntologySerializer(serializers.ModelSerializer):
    """
    The OntologySerializer class contains the code that serializes the data
    from the Ontology model.
    """
    owner = serializers.ReadOnlyField(source='owner.user.username')

    class Meta:
        """
        The Meta class contains data about the model and the fields for the
        Ontology model.
        """
        model = Ontology
        fields = ('id', 'domain_name', 'domain_description', 'ontology_json',
                  'created_on', 'updated_on', 'profile', 'owner')
        read_only_fields = ('id', 'created_on', 'updated_on')
