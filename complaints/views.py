from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .permissions import IsAdmin, IsStaffUser
from .models import Complaint
from .serializers import ComplaintSerializer

from accounts.models import User


class ComplaintViewSet(viewsets.ModelViewSet):

    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == "admin":

            queryset = Complaint.objects.all()

        elif user.role == "staff":

            queryset = Complaint.objects.filter(
                assigned_to=user
            )

        elif user.role == "student":

            queryset = Complaint.objects.filter(
                created_by=user
            )

        else:

            queryset = Complaint.objects.none()

        # Optional status filter
        status_filter = self.request.query_params.get("status")

        if status_filter:

            queryset = queryset.filter(
                status=status_filter
            )

        return queryset


    def perform_create(self, serializer):

        serializer.save(
            created_by=self.request.user
        )


    # =========================
    # ADMIN - ASSIGN COMPLAINT
    # =========================

    @action(
        detail=True,
        methods=["patch"],
        permission_classes=[
            IsAuthenticated,
            IsAdmin
        ]
    )
    def assign(self, request, pk=None):

        complaint = self.get_object()

        staff_id = request.data.get("assigned_to")

        if not staff_id:

            return Response(
                {
                    "error": "assigned_to is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:

            staff = User.objects.get(
                id=staff_id,
                role="staff"
            )

        except User.DoesNotExist:

            return Response(
                {
                    "error": "Maintenance staff not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        complaint.assigned_to = staff

        complaint.save()

        return Response(
            ComplaintSerializer(complaint).data
        )


    # =========================
    # STAFF - UPDATE STATUS
    # =========================

    @action(
        detail=True,
        methods=["patch"],
        permission_classes=[
            IsAuthenticated,
            IsStaffUser
        ]
    )
    def update_status(self, request, pk=None):

        complaint = self.get_object()

        new_status = request.data.get("status")

        allowed_statuses = [
            "pending",
            "in_progress",
            "resolved"
        ]

        if new_status not in allowed_statuses:

            return Response(
                {
                    "error": "Invalid status"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        complaint.status = new_status

        complaint.save()

        return Response(
            ComplaintSerializer(complaint).data
        )