from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from products.models import (
    ProductFeature,
    ProductFeatureOption
)
from stands.models import Stand

class ProductFeatureOptionSerializer(HyperlinkedModelSerializer):

    feature=ResourceRelatedField( queryset=ProductFeature.objects )

    class Meta:
        model=ProductFeatureOption
        fields="__all__"


class ProductFeatureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    options=ResourceRelatedField( queryset=ProductFeatureOption.objects )

    included_serializers = {
        "options": "products.serializers.ProductFeatureOptionSerializer"
    }

    class Meta:
        model=ProductFeature
        fields="__all__"
