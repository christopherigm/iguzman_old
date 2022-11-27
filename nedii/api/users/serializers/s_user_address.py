from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from django.contrib.auth.models import User
from users.models import UserAddress
from common.models import City

class UserAddressSerializer(HyperlinkedModelSerializer):
    user = ResourceRelatedField (
        queryset = User.objects,
        required = False
    )
    city = ResourceRelatedField (
        queryset = City.objects,
        required = False
    )
    included_serializers = {
        "city": "common.serializers.CitySerializer",
        "user": "users.serializers.UserSerializer"
    }

    class Meta:
        model = UserAddress
        fields = "__all__"
        extra_kwargs = {
            "user": {
                "read_only": True
            },
            "created": {
                "read_only": True
            },
            "modified": {
                "read_only": True
            }
        }
