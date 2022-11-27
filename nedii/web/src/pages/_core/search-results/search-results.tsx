/* eslint-disable max-lines-per-function */
import React, {
  useState,
  useEffect
} from 'react';
import {
  useLocation
} from 'react-router-dom';
import NavBar from 'src/components/_core/nav-bar';
import Footer from 'src/components/_core/footer';
import SearchResults from './search-results-component';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResultsPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const [items, setitems]: any = useState({});
  const params: any = useQuery();

  const updateQuery = ( queryParameter?: string ) => {
    setitems([]);
    const query: string = queryParameter ? queryParameter : params.get('q');
    const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
    const commonURL = `stand&filter[search]=${query}&fields[Stand]=name,slug`;
    const urls = [
      `products/?include=${commonURL}&fields[Product]=${commonFields}`,
      `services/?include=${commonURL}&fields[Service]=${commonFields}`,
      `meals/?include=${commonURL}&fields[Meal]=${commonFields}`,
      `real-estates/?include=${commonURL}&fields[RealEstate]=${commonFields}`,
      `vehicles/?include=model,model.make,${commonURL}&fields[Vehicle]=${commonFields},model,year&fields[VehicleMake]=name&fields[VehicleModel]=name,make`,
      `expos?fields[Expo]=name,img_picture,slug,real&filter[search]=${query}`,
      `groups/?fields[Group]=name,img_picture,slug&filter[search]=${query}`,
      `stands/?&fields[Stand]=name,slug,img_logo,img_cover,average_rating&filter[search]=${query}`
    ];
    const promises: any[] = [];
    urls.forEach(() => {
      promises.push(new Promise((res) => {
        res([]);
      }));
    });

    Promise.all(promises)
      .then((data: any) => {
        const results: any = {
          expos: [],
          groups: [],
          stands: [],
          items: [],
          count: 0
        };
        data.forEach((i: any) => {
          if ( i.data && i.data.length ) {
            results.count += i.data.length;
            const type = i.data[0].type;
            if ( type === 'Expo' ) {
              results.expos = i.data;
            } else if ( type === 'Group' ) {
              results.groups = i.data;
            } else if ( type === 'Stand' ) {
              results.stands = i.data;
            } else {
              i.data.forEach((j: any) => {
                results.items.push(j);
              });
            }
          }
        });
        setitems(results);
      })
      .catch((err: any) => {
        console.log('error:', err);
      });
  };

  useEffect(() => {
    updateQuery();
  }, []);

  return (
    <div className='page'>
      <NavBar
        setSectionMenu={setSectionMenu}
        sectionMenu={sectionMenu}
        updateQuery={updateQuery} />
      <SearchResults results={items} />
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
