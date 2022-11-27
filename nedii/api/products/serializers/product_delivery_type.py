from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from products.models import ProductDeliveryType

class ProductDeliveryTypeSerializer(HyperlinkedModelSerializer):

    class Meta:
        model=ProductDeliveryType
        fields="__all__"
