from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from complaints.models import Complaint
from complaints.permissions import IsAdmin

from accounts.models import User
from django.shortcuts import render

def login_page(request):
    return render(request, "login.html")


def register_page(request):
    return render(request, "register.html")

def admin_dashboard(request):
    return render(request, "admin/dashboard.html")


def staff_dashboard(request):
    return render(request, "staff/dashboard.html")


def student_dashboard(request):
    return render(request, "student/dashboard.html")

class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        total_complaints = Complaint.objects.count()

        pending = Complaint.objects.filter(
            status="pending"
        ).count()

        in_progress = Complaint.objects.filter(
            status="in_progress"
        ).count()

        resolved = Complaint.objects.filter(
            status="resolved"
        ).count()

        unassigned = Complaint.objects.filter(
            assigned_to__isnull=True
        ).count()

        return Response({
            "total_complaints": total_complaints,
            "pending": pending,
            "in_progress": in_progress,
            "resolved": resolved,
            "unassigned": unassigned
        })


class StaffWorkloadView(APIView):

    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):

        staff_users = User.objects.filter(
            role="staff"
        )

        data = []

        for staff in staff_users:

            complaint_count = Complaint.objects.filter(
                assigned_to=staff
            ).count()

            data.append({
                "id": staff.id,
                "email": staff.email,
                "assigned_complaints": complaint_count
            })

        return Response({
            "staff_workload": data
        })