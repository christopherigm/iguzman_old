from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from meals.models import (
    MealClassification,
    MealAddon,
    MealPicture,
    Meal
)
from stands.models import Stand

class MealSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    classification=ResourceRelatedField( queryset=MealClassification.objects )
    meal_pictures=ResourceRelatedField(
        queryset=MealPicture.objects,
        many=True
    )
    meal_addons=ResourceRelatedField(
        queryset=MealAddon.objects,
        many=True
    )

    included_serializers={
        "classification": "meals.serializers.MealClassificationSerializer",
        "meal_pictures": "meals.serializers.MealPictureSerializer",
        "meal_addons": "meals.serializers.MealAddonSerializer",
        "stand": "stands.serializers.StandSerializer"
    }

    class Meta:
        model=Meal
        fields="__all__"
