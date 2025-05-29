from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def about_us(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/about_us.html",
    )


def recipes(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/recipes.html",
    )


def image_galery(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/image_galery.html",
    )


def sports(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/sports.html",
    )


def bocchi(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/bocchi.html",
    )


def contact_us(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/contact_us.html",
    )


def impressum(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/impressum.html",
    )


def dataprotection(request: HttpRequest) -> HttpResponse:
    return render(
        request,
        "website/dataprotection.html",
    )
