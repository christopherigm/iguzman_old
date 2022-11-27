from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import VideoLink, Stand

class VideoLinkSerializer(HyperlinkedModelSerializer):

    stand = ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model = VideoLink
        fields = "__all__"
