from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('employee', 'Employee'),
        ('employer', 'Employer'),
        ('contractor', 'Contractor'),
    )

    role = models.CharField(choices=ROLE_CHOICES, max_length=10)
