import Service from "./Service";
import { API_URL } from "../config";

const resource = `${API_URL}`;

export default {
  sendOrderData(data) {
    return Service.post(`${resource}/orders?restaurant_id=4`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        return error.response.data.errors || error.response.data.message;
      });
  },
  getOrders() {
    return Service.get(`${resource}/orders?restaurant_id=4`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  },
};
