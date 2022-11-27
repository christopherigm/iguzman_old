from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from rest_framework_json_api import serializers
from django.contrib.auth.models import User
from stands.models import (
    Expo,
    Stand,
    Group,
    StandPictures,
    VideoLink,
    StandPhones,
    StandBookingQuestion,
    StandNews,
    StandPromotion,
    SurveyQuestions,
    StandRating
)
from common.models import City, NediiPlans
from products.models import Product
from meals.models import Meal
from services.models import Service
from vehicles.models import Vehicle
from real_estate.models import RealEstate

class StandSerializer(HyperlinkedModelSerializer):
    owner = ResourceRelatedField(
        queryset=User.objects
    )
    group = ResourceRelatedField(
        queryset=Group.objects
    )
    expo = ResourceRelatedField(
        queryset=Expo.objects
    )
    plan = ResourceRelatedField(
        queryset=NediiPlans.objects
    )
    panorama = ResourceRelatedField(
        queryset=StandPictures.objects,
        many=True
    )
    video_links = ResourceRelatedField(
        queryset=VideoLink.objects,
        many=True
    )
    pictures = ResourceRelatedField(
        queryset=StandPictures.objects,
        many=True
    )
    phones = ResourceRelatedField(
        queryset=StandPhones.objects,
        many=True
    )
    city = ResourceRelatedField(
        queryset=City.objects
    )
    stand_booking_questions = ResourceRelatedField(
        queryset=StandBookingQuestion.objects,
        many=True
    )
    stand_news = ResourceRelatedField(
        queryset=StandNews.objects,
        many=True
    )
    promotions = ResourceRelatedField(
        queryset=StandPromotion.objects,
        many=True
    )
    survey_questions = ResourceRelatedField(
        queryset=SurveyQuestions.objects,
        many=True
    )
    ratings = ResourceRelatedField(
        queryset=StandRating.objects,
        many=True
    )
    highlighted_products = ResourceRelatedField(
        queryset=Product.objects,
        many=True
    )
    highlighted_services = ResourceRelatedField(
        queryset=Service.objects,
        many=True
    )
    highlighted_meals = ResourceRelatedField(
        queryset=Meal.objects,
        many=True
    )
    highlighted_real_estates = ResourceRelatedField(
        queryset=RealEstate.objects,
        many=True
    )
    highlighted_vehicles = ResourceRelatedField(
        queryset=Vehicle.objects,
        many=True
    )

    included_serializers = {
        "plan": "common.serializers.NediiPlansSerializer",
        "owner": "users.serializers.UserSerializer",
        "expo": "stands.serializers.ExpoSerializer",
        "group": "stands.serializers.GroupSerializer",
        "panorama": "stands.serializers.StandPicturesSerializer",
        "video_links": "stands.serializers.VideoLinkSerializer",
        "pictures": "stands.serializers.StandPicturesSerializer",
        "phones": "stands.serializers.StandPhonesSerializer",
        "city": "common.serializers.CitySerializer",
        "stand_news": "stands.serializers.StandNewsSerializer",
        "promotions": "stands.serializers.StandPromotionsSerializer",
        "stand_booking_questions": "stands.serializers.StandBookingQuestionSerializer",
        "ratings": "stands.serializers.StandRatingSerializer",
        "survey_questions": "stands.serializers.SurveyQuestionsSerializer",
        "highlighted_products": "products.serializers.ProductSerializer",
        "highlighted_services": "services.serializers.ServiceSerializer",
        "highlighted_meals": "meals.serializers.MealSerializer",
        "highlighted_real_estates": "real_estate.serializers.RealEstateSerializer",
        "highlighted_vehicles": "vehicles.serializers.VehicleSerializer"
    }

    products = serializers.SerializerMethodField()
    meals = serializers.SerializerMethodField()
    services = serializers.SerializerMethodField()
    vehicles = serializers.SerializerMethodField()
    real_estate = serializers.SerializerMethodField()

    def get_products(self, stand):
        products = Product.objects.filter(stand=stand.id)
        return len(products)

    def get_meals(self, stand):
        meals = Meal.objects.filter(stand=stand.id)
        return len(meals)

    def get_services(self, stand):
        services = Service.objects.filter(stand=stand.id)
        return len(services)

    def get_vehicles(self, stand):
        services = Vehicle.objects.filter(stand=stand.id)
        return len(services)

    def get_real_estate(self, stand):
        services = RealEstate.objects.filter(stand=stand.id)
        return len(services)

    class Meta:
        model = Stand
        fields = "__all__"
        meta_fields = (
            "products",
            "meals",
            "services",
            "vehicles",
            "real_estate"
        )
