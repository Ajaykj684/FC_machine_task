from django.urls import path
from .views import HolidayListView, SearchHolidayView, HolidayByDateView


app_name = "holidays"

urlpatterns = [
   path('all/<str:country>/<int:year>/', HolidayListView.as_view(), name='get_holidays'),
   path('search_holidays/<str:country>/<int:year>/<str:searchTerm>/', SearchHolidayView.as_view(), name='search_holidays'),
   path('holiday_by_date/<str:country>/<int:year>/<int:month>/<int:day>/', HolidayByDateView.as_view(), name='search_holidays_by_day'),
]