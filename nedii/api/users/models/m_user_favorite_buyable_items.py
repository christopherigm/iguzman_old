from users.models import UserAbstractBuyableItem

class UserFavoriteBuyableItems(UserAbstractBuyableItem):

    class Meta:
        verbose_name = "Elemento de compra favorito"
        verbose_name_plural = "Elementos de compra favoritos"

    class JSONAPIMeta:
        resource_name = "UserFavoriteBuyableItems"
