"""
File: ontologies/models.py
Written By: Jerry Turcios
Purpose: Contains the models for the ontologies app.
Version: Python 3.7
"""
from django.db import models

from knoogle.profiles.models import Profile


class Ontology(models.Model):
    """
    The Ontology class holds information about the entire ontology created by
    the user.
    """
    domain_name = models.CharField(max_length=150)
    domain_description = models.TextField()
    ontology_json = models.CharField(max_length=3000)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    profile = models.ForeignKey(Profile, related_name='ontologies',
                                on_delete=models.CASCADE)

    def __str__(self):
        """
        The __str__ method returns an instance of the Ontology class using the
        name of the ontology created by the user.

        :return: Name of the ontology
        """
        return "{} - {}".format(self.domain_name, self.profile.user.email)

    class Meta:
        """
        The Meta class contains extra meta data for the Ontology class.
        """
        verbose_name_plural = "ontologies"
