from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from real_estate.models import RealEstatePicture
from real_estate.serializers import RealEstatePictureSerializer

class RealEstatePictureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=RealEstatePicture.objects.all()
    serializer_class=RealEstatePictureSerializer
    filter_fields=("enabled", "stand", "real_estate")
    ordering=("id",)
