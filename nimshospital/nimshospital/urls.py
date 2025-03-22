"""
URL configuration for nimshospital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,include

from administrative import views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path('', views.administrative, name='admin-login'),  # Default route for root URL
    path('appointment-view/', views.appointments, name='appointments'),
    path('doctors/', views.doctor_list, name='doctor_list'),
    path('adddoctor/', views.adddoctor, name='adddoctor'),
    path('doctor_details/<int:doctor_id>/', views.doctor_details, name='doctor_details'),
    path('enable_doctor/<int:doctor_id>/', views.enable_doctor, name='enable_doctor'),
    path('edit_doctor/<int:doctor_id>/', views.edit_doctor, name='edit_doctor'),
     path('doctors/disable/<int:doctor_id>/',views.disable_doctor, name='disable_doctor'),
    path('user_list/', views.user_list, name='user_list'),
     path('user_details/<int:id>/', views.user_details, name='user_details'),
    path('doctor_report/', views.doctor_report, name='doctor_report'),
    path('logout/', views.logout_page, name='logout'),
    path('patientsapi/', include('patientsapi.urls')),
    
   
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # path('filter-by-date/', views.filter_by_date, name='filter-by-date'),
    # path('filter-by-doctor/', views.filter_by_doctor, name='filter-by-doctor'),
