from django.urls import path
from . import views

urlpatterns = [
   
     path('signup',views.signup,name='signup_api'),
     path('login', views.login, name='login_api'),
     path('doctors', views.doctors_list, name='doctors_list'),
     path('bookappointment', views. book_appointment, name='bookappointment'),
     path('appointment_history', views. appointment_history, name='appointment_history'),
     path('user_profile', views.user_profile, name='user_profile'),
     path('update_profile', views.update_profile, name='update_profile'),




]