from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import Stand
from real_estate.models import (
    RealEstatePicture,
    RealEstate
)

class RealEstatePictureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    real_estate=ResourceRelatedField( queryset=RealEstate.objects )

    class Meta:
        model=RealEstatePicture
        fields="__all__"
