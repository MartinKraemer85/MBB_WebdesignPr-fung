from django.urls import path

from .views import add_food_items, add_foodentry, guineapigfoodcontrol, food_items, get_foodentry

app_name = "guineapigfoodcontrol"
urlpatterns = [
    path("guineapigfoodcontrol", guineapigfoodcontrol, name="guineapigfoodcontrol"),
    path(
        "guineapigfoodcontrol/<int:year>/<int:month>/<int:day>/",
        guineapigfoodcontrol,
        name="guineapigfoodcontrol_with_date",
    ),
    path("food_items", food_items, name="food_items"),
    path("add_food_items", add_food_items, name="add_food_items"),
    path("add_foodentry", add_foodentry, name="add_foodentry"),
    path("get_foodentry", get_foodentry, name="get_foodentry"),
]
