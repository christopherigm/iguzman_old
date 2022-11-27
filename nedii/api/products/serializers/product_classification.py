from rest_framework_json_api.serializers import HyperlinkedModelSerializer
from rest_framework_json_api.relations import ResourceRelatedField
from products.models import ProductClassification
from stands.models import Stand

class ProductClassificationSerializer(HyperlinkedModelSerializer):

    stand=ResourceRelatedField( queryset=Stand.objects )

    class Meta:
        model=ProductClassification
        fields="__all__"
