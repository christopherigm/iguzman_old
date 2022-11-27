from rest_framework.viewsets import ModelViewSet
from stands.models import StandRating
from stands.serializers import StandRatingSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from stands.models import Stand
from django.contrib.auth.models import User

class StandRatingViewSet(ModelViewSet):
    
    queryset = StandRating.objects.all()
    serializer_class = StandRatingSerializer
    filter_fields = ("stand", "author")
    ordering = ( "id", )

class PostRating(APIView):
    permission_classes = [ IsAuthenticated ]
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication
    ]

    def post(self, request, *args, **kwargs):
        body_unicode=request.body.decode("utf-8")
        body = json.loads(body_unicode)
        common_error = {
            "message": "Missing fields"
        }
        if not "attributes" in body["data"]:
            return Response(common_error, status=400)
        if not "rating" in body["data"]["attributes"]:
            return Response(common_error, status=400)
        if not "relationships" in body["data"]:
            return Response(common_error, status=400)
        if not "stand" in body["data"]["relationships"]:
            return Response(common_error, status=400)
        if not "data" in body["data"]["relationships"]["stand"]:
            return Response(common_error, status=400)
        if not "id" in body["data"]["relationships"]["stand"]["data"]:
            return Response(common_error, status=400)
        rating = body["data"]["attributes"]["rating"]
        stand_id = body["data"]["relationships"]["stand"]["data"]["id"]
        comments = None
        if "comments" in body["data"]["attributes"]:
            comments = body["data"]["attributes"]["comments"]
        user = get_object_or_404(
            User,
            id = request.user.id
        )
        stand = get_object_or_404(
            Stand,
            id = stand_id
        )
        ratings = StandRating.objects.filter(
            stand=stand_id,
            author=user.id
        )
        ratings_length = len(ratings)
        if len(ratings) == 0:
            ratings = StandRating(
                stand=stand,
                author=user,
                rating=rating,
                description=comments
            )
            ratings.save()
        else:
            ratings[0].rating = rating
            if comments is not None:
                ratings[0].description = comments
            ratings[0].save()

        # Save new average rating
        count = 0
        ratings = StandRating.objects.filter(stand=stand_id)
        for i in ratings:
            count += i.rating
        average = count / len(ratings)
        stand.average_rating = average
        stand.save()

        return Response({
            "success": True,
            "attributes": {
                "user": user.id,
                "stand": stand_id,
                "comments": comments,
                "rating": rating,
                "average_rating": average,
                "ratings_length": ratings_length
            }
        })
