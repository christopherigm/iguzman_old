from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from products.models import (
    ProductFeature,
    ProductFeatureOption
)
from products.serializers import (
    ProductFeatureSerializer,
    ProductFeatureOptionSerializer
)

class ProductFeatureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ProductFeature.objects.all()
    serializer_class=ProductFeatureSerializer
    filter_fields=("enabled", "stand")
    search_fields=("name",)
    ordering=("id",)

class ProductFeatureOptionViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ProductFeatureOption.objects.all()
    serializer_class=ProductFeatureOptionSerializer
    filter_fields=("enabled", "feature__stand")
    search_fields=("name",)
    ordering=("id",)
