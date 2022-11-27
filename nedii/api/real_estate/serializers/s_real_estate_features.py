from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from real_estate.models import RealEstateFeature

class RealEstateFeatureSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=RealEstateFeature
        fields="__all__"
