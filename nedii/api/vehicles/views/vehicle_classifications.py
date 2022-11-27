from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from vehicles.models import VehicleClassification
from vehicles.serializers import VehicleClassificationSerializer

class VehicleClassificationViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=VehicleClassification.objects.all()
    serializer_class=VehicleClassificationSerializer
    filter_fields=("enabled","slug",)
    search_fields=("name",)
    ordering=( "id", )
