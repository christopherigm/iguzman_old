from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from vehicles.models import VehicleFeature
from vehicles.serializers import VehicleFeatureSerializer

class VehicleFeatureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=VehicleFeature.objects.all()
    serializer_class=VehicleFeatureSerializer
    filter_fields=("enabled",)
    search_fields=("name",)
    ordering=("id",)
