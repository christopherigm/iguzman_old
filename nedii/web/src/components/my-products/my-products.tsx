import React, {
  useEffect,
  useState
} from 'react';
import {
  MenuChoiceMenu,
  StrongText,
  HorizontalSpace,
  SizesEnum,
  TextAlignEnum
} from 'rrmc';
import ItemToEdit from 'src/components/item-to-edit/item-to-edit';
import AddItemBasicInfo from 'src/components/item-basic-info-form/item-basic-info-form';
import APISDK from 'src/api/api-sdk';
import SystemValues from 'src/constants/SystemValues';

const menuItems = [
  {
    name: 'Informacion basica',
    value: 'step-1',
    icon: 'house'
  },
  {
    name: 'Mulimedia',
    value: 'step-2',
    icon: 'image'
  }
];

interface MyItemsToSellInterface {
  itemType: string;
  itemClassificacionType: string;
}

const MyItemsToSell = (props: MyItemsToSellInterface): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueReference, setValueReference] = useState('');
  const itemType = props.itemType;
  const items = itemType === 'Product' ? SystemValues.getInstance().system.sellerProducts :
    itemType === 'Service' ? SystemValues.getInstance().system.sellerServices :
    itemType === 'Product' ? SystemValues.getInstance().system.sellerProducts :
    itemType === 'Meal' ? SystemValues.getInstance().system.sellerMeals :
    itemType === 'Vehicle' ? SystemValues.getInstance().system.sellerVehicles :
    itemType === 'RealEstate' ? SystemValues.getInstance().system.sellerRealEstates : [];
  const [item, setItem]: any = useState(null);
  let addLabel = 'Agregar';
  let itemTypeReadable = '';
  let urlCategory = '';

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
    console.log('itemType', itemType);
    if (itemType === 'Product') {
      APISDK.GetSellerProducts();
      itemTypeReadable = 'Producto';
      addLabel += ' producto';
      urlCategory = 'productos';
    } else if (itemType === 'Service') {
      APISDK.GetSellerServices();
      itemTypeReadable = 'Servicio';
      addLabel += ' servicio';
      urlCategory = 'servicios';
    } else if (itemType === 'Meal') {
      APISDK.GetSellerMeals();
      itemTypeReadable = 'Platillo';
      addLabel += ' platillo';
      urlCategory = 'menu';
    } else if (itemType === 'Vehicle') {
      APISDK.GetSellerVehicles();
      itemTypeReadable = 'Vehiculo';
      addLabel += ' vehiculo';
      urlCategory = 'vehiculos';
    } else if (itemType === 'RealEstate') {
      APISDK.GetSellerRealEstates();
      itemTypeReadable = 'Inmueble';
      addLabel += ' inmueble';
      urlCategory = 'inmuebles';
    }
  }, [window]);

  const deleteItem = (id: number) => {
    if ( isLoading || !id ) return;
    setIsLoading(true);
    APISDK.DeleteProductById(id)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='col s12 m8 MyStands'>
      {
        item || valueReference === 'add-item' ?
          <div onClick={(e: any) => {
            e.preventDefault();
            setValueReference('');
            setItem(null);
          }} className='MyStands__return-button'>
            <i className='material-icons white cyan-text'>arrow_back</i>
            <span>Regresar</span>
          </div> : null
      }
      {
        items ?
        <>
        {
          valueReference !== 'add-item' ?
            <MenuChoiceMenu
              color='cyan'
              items={menuItems}
              valueReference={valueReference}
              setValueReference={setValueReference} /> : null
        }
        {
          valueReference === 'step-1' ?
            <AddItemBasicInfo
              item={item}
              setItem={setItem}
              setStand={setItem}
              isLoading={isLoading}
              itemType={props.itemType}
              itemClassificacionType={props.itemClassificacionType}
              setIsLoading={setIsLoading} /> : null
        }
        {
          valueReference === 'step-2' ?
            <></> : null
        }
        </> : null
      }
      {
        !valueReference && !item ?
        <>
          <StrongText
            fullWidth={true}
            align={TextAlignEnum.left}
            text={`${items.length} ${itemTypeReadable}${items.length === 1 ? '' : 's'} registrado${items.length === 1 ? '' : 's'}`} />
          <HorizontalSpace size={SizesEnum.x_small} />
          <div className='row MyStands__stands-wrapper'>
            <ItemToEdit
              addLabel={addLabel}
              setItem={setItem}
              setValueReference={setValueReference} />
            {
              items.map((i: any, index: number) => {
                return (
                  <ItemToEdit
                    key={index}
                    item={i}
                    setItem={setItem}
                    id={i.id}
                    name={i.attributes.name}
                    image={i.attributes.img_picture}
                    url={`/empresa/${i.relationships.stand.data.attributes.slug}/${urlCategory}/${i.attributes.slug}`}
                    standName={i.relationships.stand.data.attributes.name}
                    valueReference={valueReference}
                    setValueReference={setValueReference}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    deleteItem={deleteItem} />
                );
              })
            }
          </div>
        </> : null
      }
      {
        valueReference === 'add-item' ?
          <AddItemBasicInfo
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setItem={setItem}
            itemType={props.itemType}
            itemClassificacionType={props.itemClassificacionType}
            setValueReference={setValueReference} /> : null
      }
    </div>
  );
};

export default MyItemsToSell;
