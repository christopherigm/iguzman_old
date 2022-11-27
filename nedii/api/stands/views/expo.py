from rest_framework.viewsets import ModelViewSet
from stands.models import Expo
from stands.serializers import ExpoSerializer

class ExpoViewSet(ModelViewSet):
    
    queryset = Expo.objects.all()
    serializer_class = ExpoSerializer
    filter_fields = ("enabled","real","slug")
    search_fields = ("name",)
    ordering = ( "id", )
    # http_method_names = ["get"]
