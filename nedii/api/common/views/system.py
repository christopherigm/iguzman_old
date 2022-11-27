from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from rest_framework.views import APIView
from common.models import System as SystemModel
from common.serializers import SystemSerializer
from rest_framework.viewsets import ModelViewSet

class SimpleMiddleware:
    def __init__(self):
        self.foo="bar"

    def doSomething(self, someValue):
        return someValue + 1


class System( APIView ):
    foo=""

    def get( self, request ):
        number=SimpleMiddleware.doSomething( self, 0 )
        data={
            "system": {
                "env": settings.ENVIRONMENT,
                "worker": settings.WORKER,
                "number": str(number),
                "version": "1.0.3"
            }
        }
        return Response(data, status.HTTP_200_OK)


class SystemViewSet (ModelViewSet):
    queryset=SystemModel.objects.all()
    serializer_class=SystemSerializer
    ordering=["id"]
