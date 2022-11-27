from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import UserCartBuyableItems
from users.serializers import UserCartBuyableItemsSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserCartBuyableItemsViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    queryset = UserCartBuyableItems.objects.all()
    serializer_class = UserCartBuyableItemsSerializer
    ordering = ["id"]
    ordering_fields = [
        "id",
    ]
    filterset_fields = {
        "enabled": ("exact",),
        "id": ("exact", "lt", "gt", "gte", "lte"),
        "created": ("exact", "lt", "gt", "gte", "lte", "in"),
        "modified": ("exact", "lt", "gt", "gte", "lte", "in"),
        "user": ("exact",),
        "product": ("exact",),
        "service": ("exact",),
        "meal": ("exact",),
        "real_estate": ("exact",),
        "vehicle": ("exact",),
    }
    search_fields = [
        "backup_name",
        "backup_user_name"
    ]
