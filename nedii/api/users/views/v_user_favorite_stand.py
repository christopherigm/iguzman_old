from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from users.models import UserFavoriteStands
from users.serializers import UserFavoriteStandsSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserFavoriteStandsViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    queryset = UserFavoriteStands.objects.all()
    serializer_class = UserFavoriteStandsSerializer
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
        "stand": ("exact",)
    }
