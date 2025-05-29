from django.contrib.auth.decorators import login_not_required  # pyright: ignore[reportAttributeAccessIssue]
from django.urls import path
from django.views.generic.base import TemplateView

from navigation.views import about_us, bocchi, contact_us, dataprotection, image_galery, impressum, recipes, sports

app_name = "navigation"
urlpatterns = [
    # https://docs.djangoproject.com/en/5.1/topics/class-based-views/intro/#decorating-the-class
    path(
        "",
        login_not_required(TemplateView.as_view(template_name="navigation/index.html")),
        name="navigation",
    ),
    path("about_us", about_us, name="about_us"),
    path("recipes", recipes, name="recipes"),
    path("image_galery", image_galery, name="image_galery"),
    path("sports", sports, name="sports"),
    path("bocchi", bocchi, name="bocchi"),
    path("contact_us", contact_us, name="contact_us"),
    path("impressum", impressum, name="impressum"),
    path("dataprotection", dataprotection, name="dataprotection"),
]
