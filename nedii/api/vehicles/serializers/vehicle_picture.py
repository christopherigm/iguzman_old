from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import Stand
from vehicles.models import VehiclePicture, Vehicle

class VehiclePictureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    vehicle=ResourceRelatedField( queryset=Vehicle.objects )

    class Meta:
        model=VehiclePicture
        fields="__all__"
