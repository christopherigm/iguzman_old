from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from meals.models import MealAddon
from meals.serializers import MealAddonSerializer

class MealAddonViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=MealAddon.objects.all()
    serializer_class=MealAddonSerializer
    filter_fields=("enabled","stand")
    search_fields=("name",)
    ordering=( "id", )
