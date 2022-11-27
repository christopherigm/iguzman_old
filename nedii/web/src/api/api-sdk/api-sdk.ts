/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import * as CoreAPIs from './_api-core-helpers';
import GetNediiPlans from './get-nedii-plans';
import UpgradeUserToSeller from './upgrade-user-to-seller';
import GetSellerStands from './get-seller-stands';
import GetSellerStandsById from './get-seller-stand-by-id';
import AddStand from './add-stand';
import AddStandPhone from './add-stand-phone';
import UpdateStand from './update-stand';
import AddStandPicture from './add-stand-picture';
import DeleteStandPicture from './delete-stand-picture';
import DeleteStandById from './delete-stand-by-id';
import GetSellerServices from './get-seller-services';
import GetSellerMeals from './get-seller-meals';
import GetSellerVehicles from './get-seller-vehicles';
import GetSellerRealEstates from './get-seller-real-estates';
import GetSellerProducts from './get-seller-products';
import AddBuyableItem from './add-buyable-item';
import GetProductClassificationsByStand from './get-product-classifications-by-stand';
import GetProductClassifications from './get-product-classifications';
import GetServiceClassifications from './get-service-classifications';
import GetMealClassifications from './get-meal-classifications';
import GetVehicleClassifications from './get-vehicle-classifications';
import GetRealEstateClassifications from './get-real-estate-classifications';
import DeleteProductById from './delete-product-by-id';
import DeleteServiceById from './delete-service-by-id';
import DeleteMealById from './delete-meal-by-id';
import DeleteVehicleById from './delete-vehicle-by-id';
import DeleteRealEstateById from './delete-real-estate-by-id';
import UpdateBuyableItem from './update-buyable-item';
import GetCategories from './get-categories';
import GetExpoById from './get-expo-by-id';
import GetExpos from './get-expos';
import {
  getBestSellers,
  getMonthDeals,
  getDeals
} from './get-home-products-and-services-grid';
import GetGroupById from './get-group-by-id';
import GetStandsByGroupId from './get-stands-by-group-id';
import GetStandsByGroupIdAndExpoId from './get-stands-by-group-id-and-expo-id';
import GetHomeExpos from './get-home-expos';
import GetHomeMeals from './get-home-meals';
import GetHomeRestaurants from './get-home-restaurants';
import GetHomeStands from './get-home-stands';
import GetHomePictures from './get-home-pictures';
import GetNewsByStandId from './get-stand-news';
import GetFullStandById from './get-full-stand-by-id';
import GetFullStandBySlug from './get-full-stand-by-slug';
import GetNediiFavoriteItems from './get-nedii-favorite-items';
import GetFavoriteStands from './get-favorite-stands';
import PostStandRating from './post-stand-rating';
import GetMealBySlug from './get-meal-by-slug';
import GetProductBySlug from './get-product-by-slug';
import GetServiceBySlug from './get-service-by-slug';
import GetVehicleBySlug from './get-vehicle-by-slug';
import GetRealEstateBySlug from './get-real-estate-by-slug';
import GetMealsByStandId from './get-meals-by-stand-id';
import GetProductsByStandId from './get-products-by-stand-id';
import GetServicesByStandId from './get-services-by-stand-id';
import GetVehiclesByStandId from './get-vehicles-by-stand-id';
import GetRealEstatesByStandId from './get-real-estates-by-stand-id';
import GetMealsClassificationsByStand from './get-meal-classifications-by-stand';
import GetServiceClassificationsByStand from './get-service-classifications-by-stand';
import GetMealAddOnsByStand from './get-meal-add-ons-by-stand';
import GetProductFeatureOptionsByStand from './get-product-feature-options-by-stand';
import GetRealEstateFeatures from './get-real-estate-features';
import GetServiceFeaturesByStand from './get-service-features-by-stand';
import GetVehicleFeatures from './get-vehicle-features';
import GetNediiCartItems from './get-nedii-cart-items';
import AddNediiCartItem from './add-nedii-cart-item';
import AddNediiFavoriteItem from './add-nedii-favorite-item';
import AddNediiFavoriteStand from './add-nedii-favorite-stand';

const APISDK = {
  ...CoreAPIs,
  GetNediiPlans: GetNediiPlans,
  UpgradeUserToSeller: UpgradeUserToSeller,
  GetSellerStands: GetSellerStands,
  GetSellerStandsById: GetSellerStandsById,
  GetSellerProducts: GetSellerProducts,
  GetSellerServices: GetSellerServices,
  GetSellerMeals: GetSellerMeals,
  GetSellerVehicles: GetSellerVehicles,
  GetSellerRealEstates: GetSellerRealEstates,
  AddStand: AddStand,
  UpdateStand: UpdateStand,
  DeleteStandById: DeleteStandById,
  AddStandPhone: AddStandPhone,
  AddStandPicture: AddStandPicture,
  DeleteStandPicture: DeleteStandPicture,
  AddBuyableItem: AddBuyableItem,
  GetProductClassificationsByStand: GetProductClassificationsByStand,
  GetMealsClassificationsByStand: GetMealsClassificationsByStand,
  GetServiceClassificationsByStand: GetServiceClassificationsByStand,
  GetProductClassifications: GetProductClassifications,
  GetServiceClassifications: GetServiceClassifications,
  GetMealClassifications: GetMealClassifications,
  GetVehicleClassifications: GetVehicleClassifications,
  GetRealEstateClassifications: GetRealEstateClassifications,
  DeleteProductById: DeleteProductById,
  DeleteServiceById: DeleteServiceById,
  DeleteMealById: DeleteMealById,
  DeleteVehicleById: DeleteVehicleById,
  DeleteRealEstateById: DeleteRealEstateById,
  UpdateBuyableItem: UpdateBuyableItem,
  GetCategories: GetCategories,
  GetExpos: GetExpos,
  GetExpoById: GetExpoById,
  getBestSellers: getBestSellers,
  getMonthDeals: getMonthDeals,
  getDeals: getDeals,
  GetGroupById: GetGroupById,
  GetStandsByGroupId: GetStandsByGroupId,
  GetStandsByGroupIdAndExpoId: GetStandsByGroupIdAndExpoId,
  GetHomeExpos: GetHomeExpos,
  GetHomeMeals: GetHomeMeals,
  GetHomeRestaurants: GetHomeRestaurants,
  GetHomeStands: GetHomeStands,
  GetHomePictures: GetHomePictures,
  GetNewsByStandId: GetNewsByStandId,
  GetFullStandById: GetFullStandById,
  GetFullStandBySlug: GetFullStandBySlug,
  GetNediiFavoriteItems: GetNediiFavoriteItems,
  GetFavoriteStands: GetFavoriteStands,
  PostStandRating: PostStandRating,
  GetMealBySlug: GetMealBySlug,
  GetProductBySlug: GetProductBySlug,
  GetServiceBySlug: GetServiceBySlug,
  GetVehicleBySlug: GetVehicleBySlug,
  GetRealEstateBySlug: GetRealEstateBySlug,
  GetMealsByStandId: GetMealsByStandId,
  GetProductsByStandId: GetProductsByStandId,
  GetServicesByStandId: GetServicesByStandId,
  GetVehiclesByStandId: GetVehiclesByStandId,
  GetRealEstatesByStandId: GetRealEstatesByStandId,
  GetMealAddOnsByStand: GetMealAddOnsByStand,
  GetProductFeatureOptionsByStand: GetProductFeatureOptionsByStand,
  GetRealEstateFeatures: GetRealEstateFeatures,
  GetServiceFeaturesByStand: GetServiceFeaturesByStand,
  GetVehicleFeatures: GetVehicleFeatures,
  GetNediiCartItems: GetNediiCartItems,
  AddNediiCartItem: AddNediiCartItem,
  AddNediiFavoriteItem: AddNediiFavoriteItem,
  AddNediiFavoriteStand: AddNediiFavoriteStand
};

export default APISDK;
