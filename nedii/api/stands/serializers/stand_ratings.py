from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import StandRating, Stand
from django.contrib.auth.models import User

class StandRatingSerializer(HyperlinkedModelSerializer):

    stand = ResourceRelatedField( queryset=Stand.objects )
    author = ResourceRelatedField( queryset=User.objects )

    included_serializers = {
        "author": "users.serializers.UserSerializer",
    }

    class Meta:
        model = StandRating
        fields = "__all__"
