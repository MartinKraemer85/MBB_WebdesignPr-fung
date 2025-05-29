from datetime import date, timedelta
from typing import Optional


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


print(get_guineapigfoodcontrol_days(2025, 4))
