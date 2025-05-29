from django import forms

from guineapigfoodcontrol.models import Food


class foodItemForm(forms.ModelForm):
    class Meta:
        model = Food
        fields = "__all__"
