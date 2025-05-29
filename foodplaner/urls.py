from django.urls import path

from .views import add_food_items, add_foodentry, calendar, food_items, get_foodentry

app_name = "foodplaner"
urlpatterns = [
    path("calendar", calendar, name="calendar"),
    path("calendar/<int:year>/<int:month>/<int:day>/", calendar, name="calendar_with_date"),
    path("food_items", food_items, name="food_items"),
    path("add_food_items", add_food_items, name="add_food_items"),
    path("add_foodentry", add_foodentry, name="add_foodentry"),
    path("get_foodentry", get_foodentry, name="get_foodentry"),
]
