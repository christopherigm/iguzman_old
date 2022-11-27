from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from common.models import NediiPlans
from common.serializers import NediiPlansSerializer

# Create your views here.

class NediiPlansViewSet (
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        GenericViewSet
    ):
    queryset=NediiPlans.objects.all()
    serializer_class=NediiPlansSerializer
    ordering=['id']
    ordering_fields=[ 
        'id', 'name', 'order'
    ]
    filterset_fields={
        'enabled': ('exact',),
        'id': ('exact', 'lt', 'gt', 'gte', 'lte'),
        'created': ('exact', 'lt', 'gt', 'gte', 'lte', 'in'),
        'modified': ('exact', 'lt', 'gt', 'gte', 'lte', 'in'),
    }
    search_fields=[ 'name' ]
