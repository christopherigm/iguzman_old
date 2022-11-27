from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from products.models import Product
from products.serializers import ProductSerializer

class ProductViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
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
        "state": ("exact",),
        "brand": ("exact",),
        "unlimited_stock": ("exact",),
        "delivery_type": ("exact",),
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
