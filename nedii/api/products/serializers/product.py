from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from products.models import (
    Product,
    ProductClassification,
    ProductDeliveryType,
    ProductFeatureOption,
    ProductPicture
)
from stands.models import Stand

class ProductSerializer(HyperlinkedModelSerializer):

    classification=ResourceRelatedField( queryset=ProductClassification.objects )
    stand=ResourceRelatedField( queryset=Stand.objects )
    delivery_type=ResourceRelatedField(
        queryset=ProductDeliveryType.objects,
        many=True
    )
    features=ResourceRelatedField(
        queryset=ProductFeatureOption.objects,
        many=True
    )
    product_pictures=ResourceRelatedField(
        queryset=ProductPicture.objects,
        many=True
    )
    related=ResourceRelatedField(
        queryset=Product.objects,
        many=True
    )

    included_serializers={
        "stand": "stands.serializers.StandSerializer",
        "classification": "products.serializers.ProductClassificationSerializer",
        "delivery_type": "products.serializers.ProductDeliveryTypeSerializer",
        "features": "products.serializers.ProductFeatureOptionSerializer",
        "product_pictures": "products.serializers.ProductPictureSerializer",
        "related": "products.serializers.ProductSerializer",
    }

    class Meta:
        model=Product
        fields="__all__"
