from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from real_estate.models import (
    RealEstateClassification,
    RealEstateFeature,
    RealEstatePicture,
    RealEstate
)
from stands.models import Stand


class RealEstateSerializer(HyperlinkedModelSerializer):
    stand=ResourceRelatedField( queryset=Stand.objects )
    classification=ResourceRelatedField( queryset=RealEstateClassification.objects )
    features=ResourceRelatedField(
        queryset=RealEstateFeature.objects,
        many=True
    )
    real_estate_pictures=ResourceRelatedField(
        queryset=RealEstatePicture.objects,
        many=True
    )
    related=ResourceRelatedField(
        queryset=RealEstate.objects,
        many=True
    )

    included_serializers={
        "stand": "stands.serializers.StandSerializer",
        "classification": "real_estate.serializers.RealEstateClassificationSerializer",
        "features": "real_estate.serializers.RealEstateFeatureSerializer",
        "real_estate_pictures": "real_estate.serializers.RealEstatePictureSerializer",
        "related": "real_estate.serializers.RealEstateSerializer"
    }

    class Meta:
        model=RealEstate
        fields="__all__"
