from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from django.contrib.auth.models import User
from users.models import UserFavoriteStands
from stands.models import Stand

class UserFavoriteStandsSerializer(HyperlinkedModelSerializer):
    stand = ResourceRelatedField (
        queryset = Stand.objects,
        required = False
    )
    user = ResourceRelatedField (
        queryset = User.objects,
        required = False
    )
    included_serializers = {
        "stand": "common.serializers.StandSerializer",
        "user": "users.serializers.UserSerializer"
    }

    class Meta:
        model = UserFavoriteStands
        fields = "__all__"
        extra_kwargs = {
            "created": {
                "read_only": True
            },
            "modified": {
                "read_only": True
            }
        }
