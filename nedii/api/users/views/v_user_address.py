from rest_framework.viewsets import GenericViewSet
import jwt
from django.conf import settings
from rest_framework import mixins
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import Http404
from django.contrib.auth.models import User
from users.models import UserAddress
from common.permissions import IsAdminOrBelongsToItSelf
from users.serializers import UserAddressSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserAddressViewSet (
      CustomCreate,
      CustomUpdate,
      mixins.ListModelMixin,
      mixins.RetrieveModelMixin,
      mixins.DestroyModelMixin,
      GenericViewSet
    ):
    """
    User Address Instance
    """
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    ordering = ["id"]
    permission_classes = [
        IsAdminOrBelongsToItSelf
    ]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication
    ]
    ordering_fields = [
        "id", "alias"
    ]
    filterset_fields = {
        "enabled": ("exact",),
        "id": ("exact", "lt", "gt", "gte", "lte"),
        "created": ("exact", "lt", "gt", "gte", "lte", "in"),
        "modified": ("exact", "lt", "gt", "gte", "lte", "in"),
        "zip_code": ("exact",),
        "user": ("exact",),
        "city": ("exact",)
    }
    search_fields = [
        "alias", "receptor_name", "phone",
        "zip_code", "street"
    ]

    def get_queryset(self):
        user = self.request.user
        token = None
        if "Authorization" in self.request.headers:
            token = self.request.headers["Authorization"].split(" ")[1]
        if token:
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256", do_time_check=True)
            user = User.objects.get(id=decoded["user_id"])
        if user.is_anonymous:
            raise Http404("No MyModel matches the given query.")
        if user.is_superuser:
            return UserAddress.objects.all()
        return UserAddress.objects.filter(user=user)
