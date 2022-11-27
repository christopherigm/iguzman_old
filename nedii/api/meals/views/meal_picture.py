from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from meals.models import MealPicture
from meals.serializers import MealPictureSerializer

class MealPictureViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=MealPicture.objects.all()
    serializer_class=MealPictureSerializer
    filter_fields=("enabled","stand","meal")
    search_fields=("name",)
    ordering=( "id", )
