from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from real_estate.models import RealEstateFeature
from real_estate.serializers import RealEstateFeatureSerializer

class RealEstateFeatureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=RealEstateFeature.objects.all()
    serializer_class=RealEstateFeatureSerializer
    filter_fields=("enabled",)
    search_fields=("name",)
    ordering=("id",)
