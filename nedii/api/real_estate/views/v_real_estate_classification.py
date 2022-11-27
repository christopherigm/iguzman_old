from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from real_estate.models import RealEstateClassification
from real_estate.serializers import RealEstateClassificationSerializer

class RealEstateClassificationViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=RealEstateClassification.objects.all()
    serializer_class=RealEstateClassificationSerializer
    filter_fields=("enabled","slug",)
    search_fields=("name",)
    ordering=( "id", )
