from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from users.models import UserProfile

class UserProfileSerializer(HyperlinkedModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = "__all__"
