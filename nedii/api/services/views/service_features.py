from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from services.models import ServiceFeature
from services.serializers import ServiceFeatureSerializer

class ServiceFeatureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ServiceFeature.objects.all()
    serializer_class=ServiceFeatureSerializer
    filter_fields=("enabled", "stand")
    search_fields=("name",)
    ordering=("id",)
