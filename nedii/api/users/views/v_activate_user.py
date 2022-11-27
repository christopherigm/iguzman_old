import json
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from users.models import UserProfile

@method_decorator(csrf_exempt, name="dispatch")
class ActivateUser(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        body_unicode=request.body.decode("utf-8")
        body = json.loads(body_unicode)
        profile = None
        user = None
        if "token" in body["data"]["attributes"]:
            profile = get_object_or_404(
                UserProfile,
                token = body["data"]["attributes"]["token"]
            )
            user = get_object_or_404(
                User,
                id = profile.user.id
            )
        if profile:
            user.is_active = True
            user.save()
            profile.token = None
            profile.save()
            return Response( data = {
                "success": True
            }, status = 200 )
        return Response( data = [{
            "detail": "Wrong credentials",
            "status": 400
        }], status = status.HTTP_400_BAD_REQUEST )
