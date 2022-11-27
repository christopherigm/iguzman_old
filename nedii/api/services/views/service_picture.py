from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from services.models import ServicePicture
from services.serializers import ServicePictureSerializer

class ServicePictureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ServicePicture.objects.all()
    serializer_class=ServicePictureSerializer
    filter_fields=("enabled", "stand", "service")
    ordering=("id",)
