from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import (
    UserOrderBuyableItem,
    UserOrder
)
from users.serializers import (
    UserOrderBuyableItemSerializer,
    UserOrderSerializer
)
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserOrderBuyableItemViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    queryset = UserOrderBuyableItem.objects.all()
    serializer_class = UserOrderBuyableItemSerializer
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


class UserOrderViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    queryset = UserOrder.objects.all()
    serializer_class = UserOrderSerializer
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
        "broker_id": ("exact",),
    }
    search_fields = [
        "broker_id",
        "address",
        "receptor_name"
    ]
