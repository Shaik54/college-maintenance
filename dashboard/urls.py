from django.urls import path

from .views import (
    AdminDashboardView,
    StaffWorkloadView,
    login_page,
    register_page,
    admin_dashboard,
    staff_dashboard,
    student_dashboard,
)


urlpatterns = [

    # =========================
    # FRONTEND PAGES
    # =========================

    # Login
    path(
        "",
        login_page,
        name="login"
    ),

    # Registration
    path(
        "register/",
        register_page,
        name="register"
    ),

    # Admin dashboard page
    path(
        "admin-dashboard/",
        admin_dashboard,
        name="admin-dashboard"
    ),

    # Staff dashboard page
    path(
        "staff-dashboard/",
        staff_dashboard,
        name="staff-dashboard"
    ),

    # Student dashboard page
    path(
        "student-dashboard/",
        student_dashboard,
        name="student-dashboard"
    ),


    # =========================
    # DASHBOARD APIs
    # =========================

    # Admin dashboard statistics
    path(
        "api/dashboard/",
        AdminDashboardView.as_view(),
        name="dashboard-api"
    ),

    # Staff workload
    path(
        "api/dashboard/staff-workload/",
        StaffWorkloadView.as_view(),
        name="staff-workload-api"
    ),
]