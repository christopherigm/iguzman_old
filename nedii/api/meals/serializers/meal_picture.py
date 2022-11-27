from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from meals.models import MealPicture, Meal
from stands.models import Stand

class MealPictureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    meal=ResourceRelatedField( queryset=Meal.objects )

    class Meta:
        model=MealPicture
        fields="__all__"
