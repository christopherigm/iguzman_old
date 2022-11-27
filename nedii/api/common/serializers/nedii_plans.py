from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from common.models import NediiPlans

# Create your serializers here.

class NediiPlansSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=NediiPlans
        fields='__all__'
