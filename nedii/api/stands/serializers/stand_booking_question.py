from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from stands.models import (
    StandBookingQuestion,
    StandBookingQuestionOptions
)

class StandBookingQuestionOptionsSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = StandBookingQuestionOptions
        fields = "__all__"


class StandBookingQuestionSerializer(HyperlinkedModelSerializer):

    options = ResourceRelatedField(
        queryset=StandBookingQuestionOptions.objects,
        many=True
    )

    included_serializers = {
        "options": "stands.serializers.StandBookingQuestionOptionsSerializer",
    }

    class Meta:
        model = StandBookingQuestion
        fields = "__all__"
