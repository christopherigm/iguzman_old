from rest_framework.viewsets import ModelViewSet
from stands.models import StandPhones
from stands.serializers import StandPhonesSerializer

class StandPhonesViewSet(ModelViewSet):
    
    queryset = StandPhones.objects.all()
    serializer_class = StandPhonesSerializer
    filter_fields = ("enabled",)
    search_fields = ("enabled", "stand", )
    ordering = ( "id", )
