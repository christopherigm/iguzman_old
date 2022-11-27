from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from products.models import ProductPicture
from products.serializers import ProductPictureSerializer

class ProductPictureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=ProductPicture.objects.all()
    serializer_class=ProductPictureSerializer
    filter_fields=("enabled", "stand", "product")
    ordering=( "id", )
