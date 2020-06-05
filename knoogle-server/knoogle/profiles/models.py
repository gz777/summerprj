"""
File: profiles/models.py
Written By: Jerry Turcios
Purpose: Contains the model for profiles.
Version: Python 3.7
"""
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    """
    The Profile class holds information about the user's profile.
    """
    user = models.OneToOneField('auth.User', related_name='profile',
                                on_delete=models.CASCADE)
    industry = models.CharField(max_length=30)
    position = models.CharField(max_length=30)

    def __str__(self):
        """
        The __str__ method returns a string representation of the profile
        instance with the user's ID along with their full name.

        :return: User's ID and their full name
        """
        return "{}".format(self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    The create_user_profile method extends the old method that creates a new
    instance of the User class. The method now allows an profile to be created
    in conjunction with the User model.

    :param sender: The User class
    :param instance: The current instance of the User class
    :param created: Checks to see if the profile was created
    :param kwargs: Extra arguments
    :return: Nothing
    """
    if created:
        # Creates a new profile using the passed in instance of User
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    The save_user_profile method extends the old method that saves any changes
    to an instance of the User class. The method now allows profile information
    to be saved after any changes are made to the data.

    :param sender: The User class
    :param instance: The current instance of the User class
    :param kwargs: Extra arguments
    :return: Nothing
    """
    instance.profile.save()
