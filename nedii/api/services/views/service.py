from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from services.models import Service
from services.serializers import ServiceSerializer

class ServiceViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=Service.objects.all()
    serializer_class=ServiceSerializer
    filterset_fields={
        "enabled": ("exact",),
        "stand": ("exact",),
        "stand__slug": ("exact",),
        "stand__owner": ("exact",),
        "classification": ("exact", "lt", "gt", "gte", "lte", "in"),
        "price": ("exact", "lt", "gt", "gte", "lte", "in"),
        "final_price": ("exact", "lt", "gt", "gte", "lte", "in"),
        "features": ("exact",),
        "slug": ("exact",),
        "created": ("exact", "lt", "gt", "gte", "lte", "in"),
        "modified": ("exact", "lt", "gt", "gte", "lte", "in"),
        "publish_on_the_wall": ("exact",),
        "discount": ("exact", "lt", "gt", "gte", "lte", "in"),
    }
    search_fields=(
        "name",
        "short_description"
    )
    ordering=( "id", )
