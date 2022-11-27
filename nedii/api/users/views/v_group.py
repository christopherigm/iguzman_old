from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import Group
from users.serializers import GroupSerializer

class GroupViewSet (
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        GenericViewSet
    ):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    ordering = ["id"]
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication
    ]
    ordering_fields = [ "id", "name" ]
    filterset_fields = {
        "id": ("exact",),
        "name": ("exact", "in")
    }
    search_fields = [
        "name"
    ]
