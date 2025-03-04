from django.urls import path


app_name = "holidays"

urlpatterns = [
    
    # Auth
    path('holidays/', holidays.as_view(), name='holidays'),

]