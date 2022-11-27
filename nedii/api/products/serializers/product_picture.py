from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from products.models import ProductPicture
from stands.models import Stand
from products.models import Product

class ProductPictureSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )
    product=ResourceRelatedField( queryset=Product.objects )

    class Meta:
        model=ProductPicture
        fields="__all__"
