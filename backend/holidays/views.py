import requests
from drf_spectacular.utils import extend_schema
from django.conf import settings
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.views import APIView
from decouple import config, Csv


@extend_schema(
        summary="Get holidays for a specific country and year",
        description="Fetches public holidays for the given country and year from Calendarific API.",
        parameters=[],
        responses={200: "List of holidays"}
    )
class HolidayListView(APIView):
    print("inmside")
    def get(self, request, country, year):
        print(country, year, "///")
        cache_key = f"holidays_{country}_{year}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        params = {
            "api_key": config('CALENDARIFIC_API_KEY'),
            "country": country,
            "year": year
        }

        CALENDARIFIC_URL = config('CALENDARIFIC_URL')
        response = requests.get(CALENDARIFIC_URL, params=params)

        if response.status_code == 200:
            data = response.json()
            print(data, "///////")
            holidays = data.get("response", {}).get("holidays", [])
            cache.set(cache_key, holidays, timeout=3 * 24 * 60 * 60) # cached for 3 days.
            return Response(holidays)

        return Response({"error": "Failed to fetch holidays"}, status=response.status_code)



@extend_schema(
        summary="Search for a holiday by name",
        description="Filters holidays from the cached data based on the given name.",
        parameters=[],
        responses={200: "Filtered list of holidays"}
    )
class SearchHolidayView(APIView):
    def get(self, request, country, year, name):
        cache_key = f"holidays_{country}_{year}"
        holidays = cache.get(cache_key)

        if not holidays:
            return Response({"error": "No data available. Fetch holidays first."}, status=400)

        filtered_holidays = [h for h in holidays if name.lower() in h["name"].lower()]
        return Response(filtered_holidays)