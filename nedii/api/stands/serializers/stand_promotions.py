from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import StandPromotion, Stand
from meals.models import Meal

class StandPromotionsSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    meal=ResourceRelatedField( queryset=Meal.objects )
    

    included_serializers={
        "meal": "meals.serializers.MealSerializer",
        "stand": "stands.serializers.StandSerializer"
    }

    class Meta:
        model = StandPromotion
        fields = "__all__"
