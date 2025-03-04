# Django Project

This is a Django web application built to an application to get list of holiday data from the Calendarific API based on country and year.



## Installation

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Python 3.x
- pip 
- Virtualenv


### Steps to Install

1. Clone the repository:

   git clone https://github.com/Ajaykj684/FC_machine_task.git

2. Move to backend folder

   cd backend

3. Initiate virtualenv

   Virtualenv venv

4. Activate virtualenv

   venv/Scripts/activate

5. Create a .env file and add these lines.

   CALENDARIFIC_API_KEY=''
   CALENDARIFIC_URL='https://calendarific.com/api/v2/holidays'

6. Install all required packages from requirements.txt
   
   pip install -r .\requirement.text

7. Migrate
    
   python manage.py migrate

8. Run project.

   python manage.py runserver.

   url : http://127.0.0.1:8000/


### API Documentation

Swagger is used of api documentation

Swagger URL : http://127.0.0.1:8000/swagger/
