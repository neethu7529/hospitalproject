from rest_framework import serializers
from administrative.models import Doctor,User,Appointments

class DoctorSerializer(serializers.ModelSerializer):
    display_picture = serializers.SerializerMethodField()
    class Meta:
        model = Doctor
        fields = '__all__'
    def get_display_picture(self, obj):
        request = self.context.get('request')
        if obj.display_picture:
            return request.build_absolute_uri(obj.display_picture.url)
        return None

class UserSerializer(serializers.ModelSerializer):
    gender = serializers.ChoiceField(choices=["M", "F"])
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'age', 'gender', 'contactnumber', 'address']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            name=validated_data['name'],
            age=validated_data['age'],
            gender=validated_data['gender'],
            address=validated_data['address'],
            contactnumber=validated_data['contactnumber'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'    

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'age', 'gender', 'address', 'contactnumber']

class UpdateProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'age', 'gender', 'address', 'contactnumber', 'password', 'confirm_password']

    def validate(self, data):
        # Check if password and confirm password match
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def update(self, instance, validated_data):
        # Remove confirm_password as it's not part of the actual model
        validated_data.pop('confirm_password', None)

        # Update password if provided
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        # Update the rest of the fields
        return super().update(instance, validated_data)
    
# 
