import Service from "./Service";
import { API_URL } from "../config";

const resource = `${API_URL}`;

export default {
  getUserData() {
    return Service.get(`${resource}/my_profile`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        // console.log('response', response)
        if (response.status === 200) {
          // response.data.data.addresses.map(item => {
          //     item.price = item.area.price
          // })
          return response;
        }
      })
      .catch((error) => {
        return error.response.data.errors || error.response.data.message;
      });
  },
  getUserAddress() {
    return Service.get(`${resource}/my_addresses?restaurant_id=4`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(({ data, status }) => {
        if (status === 200) {
          return data;
        }
      })
      .catch((error) => {
        throw new Error(
          error.response.data.errors || error.response.data.message
        );
      });
  },
  addAddress(data) {
    return Service.post(`${resource}/add_address`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  },
  editUserData(data) {
    return Service.post(`${resource}/edit_profile`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 200) {
        return response;
      }
    });
  },
  getGovernrate() {
    return Service.get(`${resource}/governrates?restaurant_id=4`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  },
  getAreas(id) {
    return Service.get(
      `${resource}/areas?restaurant_id=4&governrate_id=${id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  },
};
