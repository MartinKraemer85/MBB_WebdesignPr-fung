from datetime import date, datetime, timedelta
from decimal import Decimal
from typing import Optional, cast

from django.http import HttpRequest, HttpResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from guineapigfoodcontrol.forms import foodItemForm
from guineapigfoodcontrol.models import Food, FoodEntry, FoodEntryItem


def get_guineapigfoodcontrol_days(year: Optional[int] = None, month: Optional[int] = None) -> list[list[date]]:
    if not year or not month:
        today = date.today()
        year = today.year
        month = today.month

    # first, get the first day of the month
    first_day_of_month = date(year, month, 1)

    # now get the weekday of the first day of a month.
    # i.e. saturday = 6
    # monday = 0
    start_offset = first_day_of_month.weekday()

    # now subtract the time delta from the first month day so we now where to start
    guineapigfoodcontrol_start = first_day_of_month - timedelta(days=start_offset)
    days = [guineapigfoodcontrol_start + timedelta(days=i) for i in range(42)]

    return [days[i : i + 7] for i in range(0, 42, 7)]


def guineapigfoodcontrol(request: HttpRequest, year=None, month=None, day=None) -> HttpResponse:
    try:
        raw_shift = request.GET.get("shift", 0)  # +1 = next month, -1 = prev month
        if not raw_shift:
            selected_date = date(year, month, day) if year and month and day else date.today()
        else:
            shift_str = cast(str, raw_shift if isinstance(raw_shift, str) else raw_shift[0])
            shift = int(shift_str)
            current_date = date(year, month, day) if year and month and day else date.today()

            # Monat anpassen
            shifted_month = current_date.month + shift
            shifted_year = current_date.year

            if shifted_month > 12:
                shifted_month = 1
                shifted_year += 1
            elif shifted_month < 1:
                shifted_month = 12
                shifted_year -= 1

            selected_date = date(shifted_year, shifted_month, 1)
    except ValueError:
        selected_date = date.today()

    food_items = Food.objects.all()
    food_entry, _ = FoodEntry.objects.get_or_create(date=selected_date)
    if request.META.get("HTTP_HX_REQUEST"):
        print(".......................................")
        return render(
            request,
            "guineapigfoodcontrol/partials/calendar_htmx.html",
            context={
                "weeks": get_guineapigfoodcontrol_days(selected_date.year, selected_date.month),
                "food_items": food_items,
                "selected_date": selected_date,
                "food_entry": food_entry,
            },
        )

    return render(
        request,
        "guineapigfoodcontrol/calendar.html",
        context={
            "weeks": get_guineapigfoodcontrol_days(selected_date.year, selected_date.month),
            "food_items": food_items,
            "selected_date": selected_date,
            "food_entry": food_entry,
            "guineapigfoodcontrol": 1,
        },
    )


def food_items(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = foodItemForm(request.POST)
        if form.is_valid():
            form.save()
            print(form)
            return redirect("/guineapigfoodcontrol/food_items")

    form = foodItemForm()
    food_items = Food.objects.all()
    return render(
        request,
        "guineapigfoodcontrol/food_items.html",
        {
            "form": form,
            "food_items": food_items,
        },
    )


def add_food_items(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        form = foodItemForm(request.POST)
        if form.is_valid():
            form.save()
            print(form)
            return redirect("/guineapigfoodcontrol/add_food_items")

    form = foodItemForm()
    return render(request, "guineapigfoodcontrol/add_food_items.html", {"form": form})


@require_POST
def add_foodentry(request: HttpRequest) -> HttpResponse:
    food_id = request.POST.get("food_id")
    date_str = request.POST.get("date")  # Format: "yyyy/m/d/"
    amount = request.POST.get("amount")  # Format: "yyyy/m/d/"

    if not (food_id or date_str or amount):
        return HttpResponseBadRequest(b"Fehlende Daten")

    amount = cast(Decimal, amount)
    date_str = cast(str, date_str)

    food = get_object_or_404(Food, pk=food_id)
    entry_date = datetime.strptime(date_str, "%Y/%m/%d/").date()

    # Hole oder erstelle FoodEntry für diesen Tag
    food_entry, _ = FoodEntry.objects.get_or_create(date=entry_date)
    print(amount)
    # Erstelle ein FoodEntryItem mit Beispiel-Menge
    FoodEntryItem.objects.create(
        food_entry=food_entry,
        food=food,
        amount_in_grams=amount,
    )

    return render(request, "guineapigfoodcontrol/partials/food_item_calendar.html", {"food_entry": food_entry})


def get_foodentry(request: HttpRequest) -> HttpResponse:
    date_str = request.GET.get("date")
    entry_date = datetime.strptime(date_str, "%Y/%m/%d/").date()

    food_entry, _ = FoodEntry.objects.get_or_create(date=entry_date)
    return render(request, "guineapigfoodcontrol/partials/food_item_calendar.html", {"food_entry": food_entry})
