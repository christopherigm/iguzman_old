from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from django.contrib.auth.models import User
from users.models import UserOrderBuyableItem, UserOrder
from products.models import Product
from services.models import Service
from meals.models import Meal, MealAddon
from real_estate.models import RealEstate
from vehicles.models import Vehicle

class UserOrderBuyableItemSerializer(HyperlinkedModelSerializer):
    user = ResourceRelatedField (
        queryset = User.objects,
        required = True
    )
    purchase_order = ResourceRelatedField (
        queryset = UserOrder.objects,
        required=False,
        allow_null=True
    )
    product = ResourceRelatedField (
        queryset = Product.objects,
        required=False,
        allow_null=True
    )
    service = ResourceRelatedField (
        queryset = Service.objects,
        required=False,
        allow_null=True
    )
    meal = ResourceRelatedField (
        queryset = Meal.objects,
        required = False
    )
    meal_addons = ResourceRelatedField (
        queryset = MealAddon.objects,
        required=False,
        allow_null=True,
        many=True
    )
    real_estate = ResourceRelatedField (
        queryset = RealEstate.objects,
        required=False,
        allow_null=True
    )
    vehicle = ResourceRelatedField (
        queryset = Vehicle.objects,
        required=False,
        allow_null=True
    )

    included_serializers = {
        "user": "users.serializers.UserSerializer",
        "product": "products.serializers.ProductSerializer",
        "service": "services.serializers.ServiceSerializer",
        "meal": "meals.serializers.MealSerializer",
        "meal_addons": "meals.serializers.MealAddonSerializer",
        "real_estate": "real_estate.serializers.RealEstateSerializer",
        "vehicle": "vehicles.serializers.VehicleSerializer"
    }

    class Meta:
        model = UserOrderBuyableItem
        fields = "__all__"
        extra_kwargs = {
            "created": {
                "read_only": True
            },
            "modified": {
                "read_only": True
            }
        }


class UserOrderSerializer(HyperlinkedModelSerializer):
    user = ResourceRelatedField (
        queryset = User.objects,
        required = True
    )
    order_items = ResourceRelatedField (
        queryset = UserOrderBuyableItem.objects,
        required = False,
        many=True
    )

    included_serializers = {
        "user": "users.serializers.UserSerializer",
        "order_items": "users.serializers.UserOrderBuyableItemSerializer"
    }

    class Meta:
        model = UserOrder
        fields = "__all__"
        extra_kwargs = {
            "created": {
                "read_only": True
            },
            "modified": {
                "read_only": True
            }
        }
