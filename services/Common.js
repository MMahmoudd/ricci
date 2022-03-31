import Service from "./Service";
import { API_URL } from "../config";

const resource = `${API_URL}`;

export default {
  getSettings: () => Service.get(`${resource}/settings?restaurant_id=4`),
};
