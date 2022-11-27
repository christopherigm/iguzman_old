from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from stands.models import Group

class GroupSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Group
        fields = "__all__"
