from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from common.permissions import (
    IsAdminOrIsItSelf,
    IsSuperUser
)
from users.serializers import UserSerializer

class UserViewSet(ModelViewSet):
    """
    User instance
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    ordering = ["id"]
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication
    ]
    ordering_fields = [
        "id", "first_name", "last_name", "last_login"
    ]
    filterset_fields = {
        "id": ("exact",),
        "is_superuser": ("exact",),
        "username": ("exact", "in"),
        "email": ("exact", "in"),
        "last_login": ("exact", "lt", "gt", "gte", "lte", "in"),
        "date_joined": ("exact", "lt", "gt", "gte", "lte", "in")
    }
    search_fields = [
        "first_name", "last_name", "email", "username"
    ]

    def get_permissions(self):
        permission_classes = [IsAdminOrIsItSelf]
        if self.action in ("list", "destroy"):
            permission_classes = [IsSuperUser]
        if self.action == "create":
            permission_classes = []
        return [permission() for permission in permission_classes]
