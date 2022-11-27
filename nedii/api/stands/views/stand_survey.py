from rest_framework.viewsets import ModelViewSet
from stands.models import SurveyQuestions
from stands.serializers import SurveyQuestionsSerializer

class SurveyQuestionsViewSet(ModelViewSet):
    
    queryset = SurveyQuestions.objects.all()
    serializer_class = SurveyQuestionsSerializer
    filter_fields = ("enabled",)
    search_fields = ("name",)
    ordering = ( "id", )
    # http_method_names = ["get"]
