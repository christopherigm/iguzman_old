from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from vehicles.models import VehiclePicture
from vehicles.serializers import VehiclePictureSerializer

class VehiclePictureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=VehiclePicture.objects.all()
    serializer_class=VehiclePictureSerializer
    filter_fields=("enabled", "stand", "vehicle")
    ordering=("id",)
