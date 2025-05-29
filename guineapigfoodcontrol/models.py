from decimal import Decimal
from enum import unique
from typing import cast

from django.db import models


# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=150)
    calories_per_100g = models.DecimalField(max_digits=6, decimal_places=2)

    price_per_100g = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    protein_per_100g = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    fat_per_100g = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    carbs_per_100g = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)


class FoodEntry(models.Model):
    foods = models.ManyToManyField(Food, through="FoodEntryItem")
    date = models.DateField(unique=True)

    def total_calories(self) -> int:
        return sum(item.calories() for item in self.foodentryitem_set.all())

    def total_carbs(self) -> int:
        return sum(item.carbs() for item in self.foodentryitem_set.all())

    def total_protein(self) -> int:
        return sum(item.protein() for item in self.foodentryitem_set.all())


class FoodEntryItem(models.Model):
    food_entry = models.ForeignKey(FoodEntry, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    amount_in_grams = models.DecimalField(max_digits=5, decimal_places=2)

    def calories(self) -> Decimal:
        food = cast(Food, self.food)
        return self.amount_in_grams * food.calories_per_100g / 100  # type: ignore

    def carbs(self) -> Decimal:
        food = cast(Food, self.food)
        return self.amount_in_grams * food.carbs_per_100g / 100  # type: ignore

    def protein(self) -> Decimal:
        food = cast(Food, self.food)
        return self.amount_in_grams * food.carbs_per_100g / 100  # type: ignore

    def __str__(self):
        return f"{self.amount_in_grams}g {self.food.name}"
