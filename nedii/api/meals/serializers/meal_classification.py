from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from meals.models import MealClassification
from stands.models import Stand

class MealClassificationSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model=MealClassification
        fields="__all__"
