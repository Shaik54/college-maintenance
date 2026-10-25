# College Maintenance Management System

A full-stack web application built with **Python, Django, Django REST Framework, and MySQL** to streamline maintenance complaint reporting, assignment, tracking, and resolution within a college campus.

The system provides separate dashboards and role-based access for students, maintenance staff, and administrators. Students can report maintenance issues and track their progress, staff can manage assigned complaints, and administrators can oversee complaints, allocate work, and monitor maintenance activities through a centralized dashboard.

## 🎯 Project Objectives

- Digitize the college maintenance complaint management process.
- Provide a centralized platform for reporting and tracking maintenance issues.
- Simplify complaint assignment and workload distribution among maintenance staff.
- Improve visibility into complaint status and maintenance activities.
- Implement secure authentication and role-based access control.

## ✨ Features

### 👨‍🎓 Student Module

- **User Registration and Login:** Register and securely access the application.
- **Complaint Submission:** Report maintenance issues with relevant details, such as the complaint description and location.
- **Complaint Tracking:** View submitted complaints and monitor their current status.
- **Complaint History:** Access previously submitted complaints.

### 🛠️ Maintenance Staff Module

- **Secure Authentication:** Access the staff dashboard after login.
- **Assigned Complaints:** View complaints assigned by the administrator.
- **Status Updates:** Update complaint progress as work proceeds.
- **Work Management:** Manage assigned maintenance tasks through a dedicated dashboard.

### 👨‍💼 Administrator Module

- **Centralized Complaint Management:** View and manage complaints submitted by students.
- **Complaint Assignment:** Assign complaints to appropriate maintenance staff.
- **Complaint Reassignment:** Reassign existing complaints when necessary.
- **Dashboard Statistics:** View complaint counts and status-based summaries.
- **Staff Workload Monitoring:** Monitor assigned work and unassigned complaints.
- **Operational Overview:** Track maintenance activities from a centralized interface.

## 🔄 How the System Works

1. **Registration and Authentication:** Users register or log in according to their assigned role.
2. **Complaint Submission:** Students submit maintenance complaints through the web interface.
3. **Complaint Storage:** The Django backend processes complaint data and stores it in the MySQL database.
4. **Complaint Assignment:** Administrators review submitted complaints and assign them to maintenance staff.
5. **Maintenance Work:** Staff members view their assigned complaints and update their status.
6. **Progress Monitoring:** Students track their complaints, while administrators monitor complaint statistics and staff workload.

## 🧰 Technologies Used

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Django |
| REST API | Django REST Framework |
| Database | MySQL |
| Authentication | JSON Web Tokens (JWT) |
| API Testing | Postman |
| Version Control | Git, GitHub |

## 🏗️ System Architecture

The application follows a frontend-backend-database architecture.

- **Frontend:** HTML, CSS, and JavaScript provide the user interface and role-specific dashboards.
- **Backend:** Django handles application logic, authentication, permissions, and complaint management.
- **REST API:** Django REST Framework exposes API endpoints for authentication and complaint-related operations.
- **Database:** MySQL stores user information, complaints, assignments, and related application data.
- **Authentication and Authorization:** JWT supports authenticated API access, while role-based permissions control which data and operations users can access.

### Application Flow

```text
        User Interface
     HTML, CSS, JavaScript
               |
               v
        Django Backend
               |
       Django REST Framework
               |
       Authentication & Roles
               |
               v
       Complaint Management
               |
               v
          MySQL Database
```

## 📁 Project Structure

```text
college_maintenance/
│
├── accounts/                 # User authentication and management
├── complaints/               # Complaint management and assignment
├── departments/              # Department-related functionality
├── dashboard/                # Dashboard functionality
│
├── templates/                # HTML templates
├── static/                   # CSS and JavaScript files
│
├── college_maintenance/      # Project configuration
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py                 # Django management utility
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

- Python installed on your system
- MySQL Server
- pip package manager
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Shaik54/college-maintenance.git
```

Navigate to the project directory:

```bash
cd college-maintenance
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure the Database

1. Start your MySQL server.
2. Create a database for the application.
3. Configure the database name, username, password, host, and port in your Django settings or environment variables, according to your project configuration.
4. Configure the Django secret key and other required environment variables.

**Security note:** Do not commit database passwords, secret keys, or other sensitive credentials to GitHub.

### 5. Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create an Administrator Account

```bash
python manage.py createsuperuser
```

Use this command if your custom user model supports Django's superuser creation workflow.

### 7. Start the Development Server

```bash
python manage.py runserver
```

Open the application in your browser:

```text
http://127.0.0.1:8000/
```

**Note:** These are standard Django setup steps. Depending on your local configuration, you may need to adjust database settings, environment variables, or the administrator account creation process.

## 🔐 Authentication and Access Control

The application uses JWT-based authentication for API access and role-based permissions to separate student, staff, and administrator functionality.

- Students can access their own complaints.
- Maintenance staff can access complaints assigned to them.
- Administrators can oversee complaints across the system and manage assignments.

These access restrictions help protect complaint data and ensure users can perform only the operations permitted by their roles.

## 🧪 API Testing

**Postman** can be used to test the REST API endpoints.

Testing can include:

- User authentication and JWT token generation.
- Complaint creation and retrieval.
- Complaint status updates.
- Complaint assignment and reassignment.
- Authentication and permission checks for different user roles.

Example login endpoint:

```text
POST /api/auth/login/
```

Use the actual API routes configured in the project when testing additional operations.

## 🚀 Future Enhancements

Potential improvements for future versions include:

- Email notifications when complaint status changes.
- Complaint status history and audit tracking.
- Complaint priority and category filters.
- File or image attachments for maintenance complaints.
- Search, filtering, and pagination for large complaint lists.
- Deployment to a cloud hosting platform.

## 📚 Learning Outcomes

This project provided practical experience with:

- Developing a full-stack web application.
- Building REST APIs using Django REST Framework.
- Integrating a relational database with Django.
- Implementing JWT authentication and role-based permissions.
- Managing application data and user-specific access.
- Testing APIs with Postman.
- Using Git and GitHub for version control and project documentation.

## 👨‍💻 Author

**Shaik Moin**

- GitHub: https://github.com/Shaik54
- LeetCode: https://leetcode.com/u/shaikmoin1/

---

*College Maintenance Management System — simplifying campus maintenance through centralized complaint management and tracking.*
