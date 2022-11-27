from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import StandPhones, Stand

class StandPhonesSerializer(HyperlinkedModelSerializer):

    stand = ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model = StandPhones
        fields = "__all__"
