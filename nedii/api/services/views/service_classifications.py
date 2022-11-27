from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from services.models import ServiceClassification
from services.serializers import ServiceClassificationSerializer

class ServiceClassificationViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ServiceClassification.objects.all()
    serializer_class=ServiceClassificationSerializer
    filter_fields=("enabled","slug", "stand")
    search_fields=("name",)
    ordering=( "id", )
