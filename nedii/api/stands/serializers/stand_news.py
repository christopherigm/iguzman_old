from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import StandNews, Stand


class StandNewsSerializer(HyperlinkedModelSerializer):

    stand = ResourceRelatedField( queryset=Stand.objects )

    included_serializers = {
        "stand": "stands.serializers.StandSerializer"
    }

    class Meta:
        model = StandNews
        fields = "__all__"
