from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    gender_choices = [('M', 'Male'), ('F', 'Female')]
    name = models.CharField(max_length=250)
    age = models.IntegerField(null=True)
    address = models.TextField(max_length=250)
    contactnumber = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=gender_choices, default='M')
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

class Doctor(models.Model):
    name = models.CharField(max_length=200)
    department = models.CharField(max_length=200)
    Qualification = models.CharField(max_length=500)
    Experience = models.IntegerField()
    display_picture  = models.FileField(upload_to='doctor_images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    

    def __str__(self):
        return self.name

class Appointments(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()

    def _str_(self):
        return f"{self.user} - {self.doctor}"