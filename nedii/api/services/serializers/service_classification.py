from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from services.models import ServiceClassification
from stands.models import Stand

class ServiceClassificationSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model=ServiceClassification
        fields="__all__"
