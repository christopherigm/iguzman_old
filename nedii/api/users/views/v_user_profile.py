from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.models import UserProfile
from users.serializers import UserProfileSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class UserProfileViewSet (
        CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet
    ):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    ordering = ["id"]
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication
    ]
    ordering_fields = [ "id" ]
    filterset_fields = {
        "id": ("exact",),
        "user": ("exact",)
    }
