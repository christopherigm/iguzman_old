from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from products.models import ProductDeliveryType
from products.serializers import ProductDeliveryTypeSerializer

class ProductDeliveryTypeViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ProductDeliveryType.objects.all()
    serializer_class=ProductDeliveryTypeSerializer
    filter_fields=("enabled",)
    search_fields=("name",)
    ordering=( "id", )
