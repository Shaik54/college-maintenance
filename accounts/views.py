from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({
            "id": request.user.id,
            "email": request.user.email,
            "role": request.user.role,
        })

class MaintenanceStaffView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        staff = User.objects.filter(
            role="staff",
            is_active=True
        )

        data = []

        for user in staff:
            data.append({
                "id": user.id,
                "email": user.email
            })

        return Response(data)
    
class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer