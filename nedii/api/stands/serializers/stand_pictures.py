from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import StandPictures, Stand

class StandPicturesSerializer(HyperlinkedModelSerializer):

    stand = ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model = StandPictures
        fields = "__all__"
