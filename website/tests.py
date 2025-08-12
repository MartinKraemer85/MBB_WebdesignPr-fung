from django.test import SimpleTestCase
from django.urls import resolve, reverse

from website import views

PAGES = [
    ("about_us", "website/about_us.html"),
    ("recipes", "website/recipes.html"),
    ("image_galery", "website/image_galery.html"),
    ("sports", "website/sports.html"),
    ("bocchi", "website/bocchi.html"),
    ("contact_us", "website/contact_us.html"),
    ("impressum", "website/impressum.html"),
    ("dataprotection", "website/dataprotection.html"),
]


# python .\manage.py test this will run all test in the subclass of TestCase
# you can also create a module dedicated to test files and test the whole module
# with manage.py test, every file with the pattern test.*.py will be tested
class WebsiteViewTests(SimpleTestCase):
    def test_pages_status_and_templates(self):
        for name, template in PAGES:
            with self.subTest(name=name):
                # ggf. Namespace beachten: reverse("website:about_us")
                url = reverse(f"website:{name}")
                resp = self.client.get(url)
                self.assertEqual(resp.status_code, 200)
                self.assertTemplateUsed(resp, template)

    def test_routes_resolve_to_correct_view(self):
        mapping = {
            "about_us": views.about_us,
            "recipes": views.recipes,
            "image_galery": views.image_galery,
            "sports": views.sports,
            "bocchi": views.bocchi,
            "contact_us": views.contact_us,
            "impressum": views.impressum,
            "dataprotection": views.dataprotection,
        }
        for name, view_func in mapping.items():
            with self.subTest(name=name):
                url = reverse(f"website:{name}")
                match = resolve(url)
                self.assertEqual(match.func, view_func)
