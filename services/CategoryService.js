import Service from "./Service";
import { API_URL } from "../config";

const resource = `${API_URL}`;

export default {
  getAllCategories() {
    return Service.get(`${resource}/categories?restaurant_id=4`).then(
      (response) => {
        if (response.status === 200) {
          return response.data;
        }
      }
    );
  },
  //   async getAllCategoriesWithProducts () {
  //     const response = await Service.get(`${resource}/categories?restaurant_id=4`)
  //     console.log('response', response)
  //         if (response.status === 200) {

  //         }
  // },
};
