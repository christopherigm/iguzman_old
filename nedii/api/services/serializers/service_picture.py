from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import Stand
from services.models import ServicePicture, Service

class ServicePictureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    service=ResourceRelatedField( queryset=Service.objects )

    class Meta:
        model=ServicePicture
        fields="__all__"
