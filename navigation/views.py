from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def about_us(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/about_us.html",
    )


def recipes(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/recipes.html",
    )


def image_galery(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/image_galery.html",
    )


def sports(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/sports.html",
    )


def bocchi(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/bocchi.html",
    )


def contact_us(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/contact_us.html",
    )


def impressum(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/impressum.html",
    )


def dataprotection(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "navigation/dataprotection.html",
    )
