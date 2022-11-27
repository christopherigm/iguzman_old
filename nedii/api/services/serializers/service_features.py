from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from services.models import ServiceFeature
from stands.models import Stand

class ServiceFeatureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model=ServiceFeature
        fields="__all__"
