from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from meals.models import Meal
from meals.serializers import MealSerializer

class MealViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=Meal.objects.all()
    serializer_class=MealSerializer
    filterset_fields={
        "enabled": ("exact",),
        "stand": ("exact",),
        "stand__slug": ("exact",),
        "stand__owner": ("exact",),
        "classification": ("exact", "lt", "gt", "gte", "lte", "in"),
        "meal_addons": ("exact",),
        "slug": ("exact",),
        "created": ("exact", "lt", "gt", "gte", "lte", "in"),
        "modified": ("exact", "lt", "gt", "gte", "lte", "in"),
        "publish_on_the_wall": ("exact",),
        "discount": ("exact", "lt", "gt", "gte", "lte", "in"),
        "is_breakfast": ("exact",),
        "is_meal": ("exact",),
        "is_dinner": ("exact",),
    }
    search_fields=("name",)
    ordering=( "id", )
