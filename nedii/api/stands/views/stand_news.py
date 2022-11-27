from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from stands.models import StandNews
from stands.serializers import StandNewsSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class StandNewsViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet
    ):
    queryset = StandNews.objects.all()
    serializer_class = StandNewsSerializer
    filter_fields = ("enabled", "stand", "slug")
    search_fields = ("name", "description")
    ordering = ( "id", )
