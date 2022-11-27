from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import Expo, Group

class ExpoSerializer(HyperlinkedModelSerializer):
    groups=ResourceRelatedField(
        queryset=Group.objects,
        many=True
    )

    included_serializers = {
        "groups": "stands.serializers.GroupSerializer"
    }

    class Meta:
        model = Expo
        fields = "__all__"
