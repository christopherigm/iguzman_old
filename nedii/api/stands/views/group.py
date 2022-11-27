from rest_framework.viewsets import ModelViewSet
from stands.models import Group
from stands.serializers import GroupSerializer

class GroupViewSet(ModelViewSet):
    
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    filter_fields = ("enabled", "slug")
    search_fields = ("name", "description")
    ordering = ( "id", )
    # http_method_names = ["get"]
