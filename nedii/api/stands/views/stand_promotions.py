from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from stands.models import StandPromotion
from stands.serializers import StandPromotionsSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class StandPromotionsViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet
    ):
    queryset = StandPromotion.objects.all()
    serializer_class = StandPromotionsSerializer
    filter_fields = ("enabled", "stand", )
    search_fields = ("name", "description")
    ordering = ( "id", )
