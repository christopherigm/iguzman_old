from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from stands.models import StandPictures
from stands.serializers import StandPicturesSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class StandPicturesViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet
    ):
    
    queryset = StandPictures.objects.all()
    serializer_class = StandPicturesSerializer
    filter_fields = ("enabled", "stand", )
    search_fields = ("name", "description")
    ordering = ( "id", )
