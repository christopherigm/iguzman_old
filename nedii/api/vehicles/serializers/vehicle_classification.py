from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from vehicles.models import VehicleClassification

class VehicleClassificationSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=VehicleClassification
        fields="__all__"
