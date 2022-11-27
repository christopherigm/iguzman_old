from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from meals.models import MealAddon
from stands.models import Stand

class MealAddonSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model=MealAddon
        fields="__all__"
