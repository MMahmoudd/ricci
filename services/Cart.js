import Service from "./Service";
import { API_URL } from "../config";

const resource = `${API_URL}`;

export default {
  sendCartData(data) {
    return Service.post(`${resource}/cart`, data, {
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
  getCart() {
    return Service.get(`${resource}/cart`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log('response cart', response)
      if (response.status === 200) {
        if (response.data.data) {
          response.data.data.forEach((item) => {
            if (item.addons) {
              item.addons.forEach((addon) => {
                item.total_price = item.total_price + addon.total_price;
              });
            }
          });
        }

        return response.data;
      }
    });
  },
  resetCart() {
    return Service.post(
      `${resource}/empty_cart`,
      {
        _method: "DELETE",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        return error.response.data.errors || error.response.data.message;
      });
  },
  deleteProductFromCart(id) {
    return Service.post(
      `${resource}/cart/${id}`,
      {
        _method: "DELETE",
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        return error.response.data.errors || error.response.data.message;
      });
  },
  getCouponData(coupon) {
    return Service.get(`${resource}/discount?restaurant_id=4&code=${coupon}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          return response.message;
        }
      })
      .catch((error) => {
        return error.response.data.errors || error.response.data.message;
      });
  },
  getDeliveryFees(area_id) {
    return Service.get(`${resource}/delivery_fees`, {
      params: {
        restaurant_id: 2,
        area_id,
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};
