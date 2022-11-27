from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from vehicles.models import (
    VehicleClassification,
    VehicleFeature,
    VehiclePicture,
    VehicleMake,
    VehicleModel,
    Vehicle
)
from stands.models import Stand


class VehicleMakeSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=VehicleMake
        fields="__all__"


class VehicleModelSerializer(HyperlinkedModelSerializer):

    make=ResourceRelatedField( queryset=VehicleMake.objects )

    included_serializers={
        "make": "vehicles.serializers.VehicleMakeSerializer"
    }

    class Meta:
        model=VehicleModel
        fields="__all__"


class VehicleSerializer(HyperlinkedModelSerializer):
    stand=ResourceRelatedField( queryset=Stand.objects )
    classification=ResourceRelatedField( queryset=VehicleClassification.objects )
    model=ResourceRelatedField( queryset=VehicleModel.objects )
    features=ResourceRelatedField(
        queryset=VehicleFeature.objects,
        many=True
    )
    vehicle_pictures=ResourceRelatedField(
        queryset=VehiclePicture.objects,
        many=True
    )
    related=ResourceRelatedField(
        queryset=Vehicle.objects,
        many=True
    )

    included_serializers={
        "stand": "stands.serializers.StandSerializer",
        "classification": "vehicles.serializers.VehicleClassificationSerializer",
        "model": "vehicles.serializers.VehicleModelSerializer",
        "features": "vehicles.serializers.VehicleFeatureSerializer",
        "vehicle_pictures": "vehicles.serializers.VehiclePictureSerializer",
        "related": "vehicles.serializers.VehicleSerializer"
    }

    class Meta:
        model=Vehicle
        fields="__all__"
