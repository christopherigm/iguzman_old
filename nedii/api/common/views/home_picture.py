from rest_framework import viewsets, mixins
from common.mixins import (
    CustomCreate,
    CustomUpdate
)
from common.models import HomePicture
from common.serializers import HomePictureSerializer

class HomePictureViewSet( CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        viewsets.GenericViewSet
    ):
    queryset=HomePicture.objects.all()
    serializer_class=HomePictureSerializer
    filter_fields=("enabled", "system", "position")
    ordering=("order", "id")
