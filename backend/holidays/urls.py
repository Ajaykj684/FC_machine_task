from django.urls import path
from .views import HolidayListView, SearchHolidayView


app_name = "holidays"

urlpatterns = [
   path('all/<str:country>/<int:year>/', HolidayListView.as_view(), name='get_holidays'),
   path('search_holidays/<str:country>/<int:year>/search/<str:name>/', SearchHolidayView.as_view(), name='search_holidays'),
]