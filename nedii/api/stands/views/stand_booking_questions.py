from rest_framework.viewsets import ModelViewSet
from stands.models import (
    StandBookingQuestion,
    StandBookingQuestionOptions
)
from stands.serializers import (
    StandBookingQuestionSerializer,
    StandBookingQuestionOptionsSerializer
)

class StandBookingQuestionViewSet(ModelViewSet):
    
    queryset = StandBookingQuestion.objects.all()
    serializer_class = StandBookingQuestionSerializer
    filter_fields = ("enabled", )
    search_fields = ("name",)
    ordering = ( "id", )
    # http_method_names = ["get"]


class StandBookingQuestionOptionsViewSet(ModelViewSet):
    
    queryset = StandBookingQuestionOptions.objects.all()
    serializer_class = StandBookingQuestionOptionsSerializer
    filter_fields = ("enabled", )
    search_fields = ("value",)
    ordering = ( "id", )
    # http_method_names = ["get"]
