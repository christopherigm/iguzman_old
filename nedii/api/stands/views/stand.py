from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters
from rest_framework import mixins
from stands.models import Stand
from stands.serializers import StandSerializer
from common.mixins import (
    CustomCreate,
    CustomUpdate
)

class StandFilter(filters.FilterSet):
    monday_open = filters.DateFromToRangeFilter()
    monday_close = filters.DateFromToRangeFilter()
    tuesday_open = filters.DateFromToRangeFilter()
    tuesday_close = filters.DateFromToRangeFilter()
    wednesday_open = filters.DateFromToRangeFilter()
    wednesday_close = filters.DateFromToRangeFilter()
    thursday_open = filters.DateFromToRangeFilter()
    thursday_close = filters.DateFromToRangeFilter()
    friday_open = filters.DateFromToRangeFilter()
    friday_close = filters.DateFromToRangeFilter()
    saturday_open = filters.DateFromToRangeFilter()
    saturday_close = filters.DateFromToRangeFilter()
    sunday_open = filters.DateFromToRangeFilter()
    sunday_close = filters.DateFromToRangeFilter()
    min_booking_cost = filters.NumberFilter(field_name="booking_cost", lookup_expr="gte")
    max_booking_cost = filters.NumberFilter(field_name="booking_cost", lookup_expr="lte")

    class Meta:
        model = Stand
        fields = [
            "enabled", "owner", "slug", "expo", "group",
            "plan", "plan__unlimited_items", "plan__stand_enabled",
            "plan__digital_card", "plan__billed_monthly",
            "expo__slug", "group__slug",
            "bar_code", "min_booking_cost", "max_booking_cost",
            "city", "restaurant", "always_open","booking_active",
        ]


class StandViewSet(CustomCreate,
        CustomUpdate,
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        mixins.DestroyModelMixin,
        GenericViewSet
    ):
    
    queryset = Stand.objects.all()
    serializer_class = StandSerializer
    filter_class = StandFilter
    search_fields = (
        "name", "bar_code", "slogan","description",
        "short_description", "about"
    )
    ordering = ( "id", )
