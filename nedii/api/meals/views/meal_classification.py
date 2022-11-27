from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from meals.models import MealClassification
from meals.serializers import MealClassificationSerializer

class MealClassificationViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=MealClassification.objects.all()
    serializer_class=MealClassificationSerializer
    filter_fields=("enabled", "stand")
    search_fields=("name",)
    ordering=( "id", )
