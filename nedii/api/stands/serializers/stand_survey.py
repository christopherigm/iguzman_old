from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from stands.models import SurveyQuestions

class SurveyQuestionsSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = SurveyQuestions
        fields = "__all__"
