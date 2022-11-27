from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import UserFavoriteBuyableItems
from users.serializers import UserFavoriteBuyableItemsSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserFavoriteBuyableItemsViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    queryset = UserFavoriteBuyableItems.objects.all()
    serializer_class = UserFavoriteBuyableItemsSerializer
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
