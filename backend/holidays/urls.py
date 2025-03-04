from django.urls import path
from .views import HolidayListView, SearchHolidayView


app_name = "holidays"

urlpatterns = [
   path('holidays/<str:country>/<int:year>/', HolidayListView.as_view(), name='get_holidays'),
   path('holidays/<str:country>/<int:year>/search/<str:name>/', SearchHolidayView.as_view(), name='search_holidays'),
]