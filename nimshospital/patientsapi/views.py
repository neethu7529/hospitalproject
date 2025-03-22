from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
from .serializers import UserSerializer,DoctorSerializer,AppointmentSerializer
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from administrative.models import Doctor
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from administrative.models import Appointments
from .serializers import UserProfileSerializer,UpdateProfileSerializer
from .serializers import AppointmentSerializer
from datetime import date
from django.conf import settings
#api_register

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Account created successfully", status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#api_login
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
        status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(request, username=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)

#api_doctorlist
@api_view(['GET'])
@permission_classes([AllowAny])
def doctors_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True, context={'request': request})
    for doctor in serializer.data:
        if doctor.get('display_picture'):
            doctor['display_picture'] = settings.MEDIA_URL + doctor['display_picture']
    return Response(serializer.data)


#api_bookappointments
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def book_appointment(request):
    user = request.user
    print(user)  # Check if user is correctly fetched
    print(user.id)  # Print the user ID

    # Check if user is authenticated
    if not user.is_authenticated:
        return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    # Add the user to the appointment data
    appointment_data = request.data.copy()  # Create a mutable copy of request.data
    appointment_data['user'] = user.id  # Assign the logged-in user's ID 
    
    # Manually create the Booking object here
    appointment = Appointments.objects.create(

        doctor_id=appointment_data['doctor'],
        appointment_date=appointment_data['date'],  # Change 'date' to 'appointment_date'
        appointment_time=appointment_data['time'],
        user=user
    )

    # If the creation is successful, return a response
    return Response({"message": "Appointment booked successfully!"}, status=status.HTTP_201_CREATED)


#api_appointmenthistory
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def appointment_history(request):
    user = request.user
    today = date.today()

    # Ensure correct field names based on your model
    upcoming_appointments = Appointments.objects.filter(user=user, appointment_date__gte=today)
    past_appointments = Appointments.objects.filter(user=user, appointment_date__lt=today)

    response_data = {
        "upcoming_appointments": AppointmentSerializer(upcoming_appointments, many=True).data,
        "past_appointments": AppointmentSerializer(past_appointments, many=True).data
    }

    return Response(response_data)
# api-user-profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def user_profile(request):
    user = request.user 
    serializer = UserProfileSerializer(user)  
    return Response(serializer.data, status=status.HTTP_200_OK)



# api-update-user-profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user  # Get the logged-in user

        # Serialize the data with the user instance
    serializer = UpdateProfileSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
            # Save the updated data
        serializer.save()
        return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   