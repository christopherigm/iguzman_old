from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from vehicles.models import VehicleFeature

class VehicleFeatureSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=VehicleFeature
        fields="__all__"
