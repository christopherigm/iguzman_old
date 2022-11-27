from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from products.models import ProductClassification
from products.serializers import ProductClassificationSerializer

class ProductClassificationViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ProductClassification.objects.all()
    serializer_class=ProductClassificationSerializer
    filter_fields=("enabled","slug", "stand")
    search_fields=("name",)
    ordering=( "id", )
