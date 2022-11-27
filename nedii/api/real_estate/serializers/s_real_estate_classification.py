from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from real_estate.models import RealEstateClassification

class RealEstateClassificationSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=RealEstateClassification
        fields="__all__"
