# College Maintenance Management System

A full-stack web application designed to manage and track maintenance complaints within a college environment.

The system provides separate functionality for students, maintenance staff, and administrators, making it easier to report issues, assign maintenance work, track complaint status, and monitor overall maintenance activities.

## Features

### Student

- User registration and login
- Submit maintenance complaints
- View submitted complaints
- Track complaint status

### Maintenance Staff

- Secure login
- View assigned complaints
- Update complaint status
- Manage assigned maintenance work

### Administrator

- View and manage all complaints
- View complaint statistics
- Assign complaints to maintenance staff
- Reassign complaints when required
- Monitor staff workload

## Technologies Used

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Django, Django REST Framework |
| Database | MySQL |
| Authentication | JWT |
| API Testing | Postman |
| Version Control | Git, GitHub |

## Project Architecture

```text
college_maintenance/
│
├── accounts/                 # User authentication and management
├── complaints/               # Complaint management
├── departments/              # Departments and complaint categories
├── dashboard/                # Dashboard functionality
│
├── templates/                # HTML templates
├── static/                   # CSS and JavaScript files
│
├── college_maintenance/      # Django project configuration
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py
├── requirements.txt
└── README.md
