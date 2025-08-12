from datetime import date
from decimal import Decimal
from django.test import TestCase
from django.urls import reverse

from guineapigfoodcontrol import views
from guineapigfoodcontrol.models import Food, FoodEntry, FoodEntryItem


# Create your tests here.
class GuineapigFoodControlGetDays(TestCase):
    def test_get_guineapigfoodcontrol_days(self):
        weeks = views.get_guineapigfoodcontrol_days(2025, 1)

        self.assertTrue(len(weeks), 6)  # 6 weeks?
        self.assertTrue(all(len(w) == 7 for w in weeks))

    def test_test_get_guineapigfoodcontrol_days_default(self):
        weeks = views.get_guineapigfoodcontrol_days()

        self.assertTrue(len(weeks), 6)
        self.assertTrue(all(len(w) == 7 for w in weeks))


class GuineapigFoodControlViews(TestCase):
    def test_guineapigfoodcontrol_default(self):
        url = reverse("guineapigfoodcontrol:guineapigfoodcontrol")
        resp = self.client.get(url)

        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, "guineapigfoodcontrol/calendar.html")

        self.assertIn("weeks", resp.context)
        self.assertIn("food_items", resp.context)
        self.assertIn("selected_date", resp.context)
        self.assertIn("food_entry", resp.context)
        self.assertIn("guineapigfoodcontrol", resp.context)

    def test_guineapigfoodcontrol_shift(self):
        url = reverse("guineapigfoodcontrol:guineapigfoodcontrol")
        resp = self.client.get(url, {"shift": 1})

        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, "guineapigfoodcontrol/calendar.html")

        url = reverse("guineapigfoodcontrol:guineapigfoodcontrol_with_date", args=[2024, 12, 1])
        resp = self.client.get(url, {"shift": -1})

        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, "guineapigfoodcontrol/calendar.html")
        # self.assertEqual(weeks_1, weeks_2)


class AddFoodEntryTests(TestCase):
    def setUp(self):
        # Make one food to reference
        # Adjust fields to your Food model
        self.food = Food.objects.create(name="Carrot", calories_per_100g=41)

    def test_add_foodentry_missing_data_400(self):
        url = reverse("guineapigfoodcontrol:add_foodentry")
        resp = self.client.post(url, data={})  # missing fields
        self.assertEqual(resp.status_code, 400)

    def test_add_foodentry_valid(self):
        url = reverse("guineapigfoodcontrol:add_foodentry")
        entry_date = date(2025, 8, 10)
        payload = {
            "food_id": str(self.food.pk),
            "date": entry_date.strftime("%Y/%m/%d/"),
            "amount": "25.0",
        }
        resp = self.client.post(url, data=payload)
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, "guineapigfoodcontrol/partials/food_item_calendar.html")

        fe = FoodEntry.objects.get(date=entry_date)
        self.assertTrue(FoodEntryItem.objects.filter(food_entry=fe, food=self.food).exists())
        item = FoodEntryItem.objects.get(food_entry=fe, food=self.food)
        self.assertEqual(item.amount_in_grams, Decimal("25.0"))

    def test_get_foodentry_creates_if_missing(self):
        url = reverse("guineapigfoodcontrol:get_foodentry")
        entry_date = date(2025, 8, 12)
        resp = self.client.get(url, {"date": entry_date.strftime("%Y/%m/%d/")})
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, "guineapigfoodcontrol/partials/food_item_calendar.html")
        self.assertTrue(FoodEntry.objects.filter(date=entry_date).exists())
