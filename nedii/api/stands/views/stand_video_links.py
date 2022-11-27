from rest_framework.viewsets import ModelViewSet
from stands.models import VideoLink
from stands.serializers import VideoLinkSerializer

class VideoLinkViewSet(ModelViewSet):
    
    queryset = VideoLink.objects.all()
    serializer_class = VideoLinkSerializer
    filter_fields = ("enabled", "stand" )
    search_fields = ("name",)
    ordering = ( "id", )
