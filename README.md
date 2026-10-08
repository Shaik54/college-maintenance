\# College Maintenance Management System



A full-stack web application designed to manage and track maintenance complaints within a college environment.



The system provides separate functionality for students, maintenance staff, and administrators, making it easier to report issues, assign maintenance work, track complaint status, and monitor overall maintenance activities.



\## Features



\### Student



\* User registration and login

\* Submit maintenance complaints

\* View submitted complaints

\* Track complaint status



\### Maintenance Staff



\* Secure login

\* View assigned complaints

\* Update complaint status

\* Manage assigned maintenance work



\### Administrator



\* View and manage all complaints

\* View complaint statistics

\* Assign complaints to maintenance staff

\* Reassign complaints when required

\* Monitor staff workload



\## Technologies Used



| Category        | Technologies                          |

| --------------- | ------------------------------------- |

| Frontend        | HTML, CSS, JavaScript                 |

| Backend         | Python, Django, Django REST Framework |

| Database        | MySQL                                 |

| Authentication  | JWT                                   |

| API Testing     | Postman                               |

| Version Control | Git, GitHub                           |



\## Project Architecture



```text

college\_maintenance/

│

├── accounts/                 # User authentication and management

├── complaints/               # Complaint management

├── departments/              # Departments and complaint categories

├── dashboard/                # Dashboard functionality

│

├── templates/                # HTML templates

├── static/                   # CSS and JavaScript files

│

├── college\_maintenance/      # Django project configuration

│   ├── settings.py

│   ├── urls.py

│   ├── asgi.py

│   └── wsgi.py

│

├── manage.py

├── requirements.txt

└── README.md

```



\## User Roles



| Role        | Responsibilities                                      |

| ----------- | ----------------------------------------------------- |

| \*\*Student\*\* | Submit and track maintenance complaints               |

| \*\*Staff\*\*   | View assigned complaints and update their status      |

| \*\*Admin\*\*   | Manage complaints, assign staff, and monitor workload |



\## Complaint Workflow



```text

Student submits complaint

&#x20;         ↓

&#x20;   Complaint created

&#x20;         ↓

Admin assigns maintenance staff

&#x20;         ↓

&#x20;Staff receives assignment

&#x20;         ↓

&#x20;Staff updates status

&#x20;         ↓

&#x20;  Complaint resolved

```



\## Complaint Status



Complaints can progress through the following statuses:



\* \*\*Pending\*\*

\* \*\*Assigned\*\*

\* \*\*In Progress\*\*

\* \*\*Resolved\*\*

\* \*\*Closed\*\*



\## Authentication



The application uses \*\*JWT-based authentication\*\* with Django REST Framework.



Users authenticate using their email and password. After successful authentication, an access token is provided for accessing protected API endpoints.



\## REST API



The backend provides REST API endpoints for:



\* User registration

\* User authentication

\* Complaint management

\* Complaint assignment

\* Complaint status updates

\* Dashboard statistics



API functionality was tested during development using \*\*Postman\*\*.



\## Environment Configuration



Sensitive configuration such as the Django secret key and MySQL database credentials are stored using environment variables.



Create a `.env` file in the project root:



```env

SECRET\_KEY=your\_secret\_key



DB\_NAME=your\_database\_name

DB\_USER=your\_database\_user

DB\_PASSWORD=your\_database\_password

DB\_HOST=your\_database\_host

DB\_PORT=your\_database\_port

```



> \*\*Important:\*\* Never commit your `.env` file or other sensitive credentials to GitHub.



\## Installation



\### 1. Clone the repository



```bash

git clone https://github.com/Shaik54/college-maintenance.git

cd college-maintenance

```



\### 2. Create a virtual environment



```bash

python -m venv venv

```



Activate the virtual environment on Windows:



```powershell

venv\\Scripts\\activate

```



\### 3. Install dependencies



```bash

pip install -r requirements.txt

```



\### 4. Configure environment variables



Create a `.env` file in the project root and add the required Django and MySQL configuration.



\### 5. Run database migrations



```bash

python manage.py migrate

```



\### 6. Start the development server



```bash

python manage.py runserver

```



Open the application in your browser:



```text

http://127.0.0.1:8000/

```



\## Future Improvements



Planned improvements for future versions include:



\* Complaint status history

\* Email notifications

\* Advanced reporting and analytics

\* File and image attachments

\* Cloud deployment

\* Improved mobile responsiveness



\## Author



\*\*Shaik Moin\*\*



B.Tech — Electronics and Communication Engineering



\[GitHub](https://github.com/Shaik54)



