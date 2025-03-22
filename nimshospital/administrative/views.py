from django.shortcuts import render,redirect, get_object_or_404
from .forms import DoctorForm
from .models import Doctor
from .models import User,Appointments
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.db.models import Count


def administrative(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)  # Authenticate using email

        if user is not None:
            login(request, user)
            return redirect('doctor_list')  # Redirect to the doctor list page after login
        else:
            return render(request, 'admin-login.html', {'error': 'Invalid Credentials'})

    return render(request, 'admin-login.html')



@login_required
def appointments(request):
    # Get all doctors for the filter dropdown
    doctors = Doctor.objects.all()

    # Get filter parameters from the request
    filter_date = request.GET.get('filterDate')
    filter_doctor = request.GET.get('filterDoctor')

    # Apply filters if the parameters are present
    appointments = Appointments.objects.all()

    # Use the correct field name 'appointment_date' instead of 'date'
    if filter_date:
        appointments = appointments.filter(appointment_date=filter_date)

    if filter_doctor:
        appointments = appointments.filter(doctor_id=filter_doctor)

    return render(request, 'appointments.html', {
        'appointments': appointments,
        'doctors': doctors,  # Pass doctors list to the template
    })

@login_required
def doctor_list(request):
    doctors = Doctor.objects.all()
    print(doctors)
    return render(request, 'doctor_list.html', {'doctors': doctors})

def disable_doctor(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    doctor.is_active = False  # Set doctor as inactive  doctors = Doctor.objects.filter(is_active=True)
    doctor.save()
    return redirect('doctor_list') 

@login_required
def adddoctor(request):
    if request.method == "POST":
        form = DoctorForm(request.POST, request.FILES)  # Include request.FILES for file upload
        if form.is_valid():
            form.save()
            return redirect('doctor_list')  # Redirect to the doctor list page
    else:
        form = DoctorForm()

    return render(request, 'adddoctor.html', {'form': form})

@login_required
def doctor_details(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    print(doctor.Qualification, doctor.Experience) 
    return render(request, 'doctor_details.html', {'doctor': doctor})

def enable_doctor(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    doctor.is_active = True  # Enable the doctor
    doctor.save()
    return redirect('doctor_details', doctor_id=doctor.id) 

def edit_doctor(request, doctor_id):
    doctor = get_object_or_404(Doctor, id=doctor_id)
    
    if request.method == "POST":
        form = DoctorForm(request.POST, request.FILES, instance=doctor)  # Ensure request.FILES is included
        if form.is_valid():
            form.save()
            return redirect('doctor_list')
    else:
        form = DoctorForm(instance=doctor)
    
    return render(request, 'edit_doctor.html', {'form': form, 'doctor': doctor})


@login_required
def user_list(request):
    users = User.objects.all()  # Fetch all users from the database
    return render(request, 'user_list.html', {'users': users})

def user_details(request, id):
    user = get_object_or_404(User, id=id)
    appointments = Appointments.objects.filter(user=user)  
    return render(request, 'user_details.html', {'user': user, 'appointments': appointments})

def doctor_report(request):
    # Initialize variables for filtering
    visits_report = []

    # If a month is selected (POST request with the month field)
    if request.method == 'POST':
        month = request.POST.get('month')  # Get the selected month (e.g., '2025-02')
        if month:
            year, month = month.split('-')
            # Filter appointments by the selected month and count visits per doctor
            visits_report = (
                Appointments.objects.filter(appointment_date__year=year, appointment_date__month=month)
                .values('doctor__name', 'doctor__department')
                .annotate(total_visits=Count('id'))  # Count number of visits for each doctor
                .order_by('-total_visits')  # Order by total visits
            )
    
    return render(request, 'doctor_report.html', {'visits_report': visits_report})
def logout_page(request):
    if request.method == "POST":
        logout(request)
        return redirect('admin-login')  # Redirect to login page or home page after logout
    return render(request, 'logout.html')