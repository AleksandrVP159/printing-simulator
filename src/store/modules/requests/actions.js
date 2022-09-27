import { useFetch } from "../../../composables/useFetch.js";

export default {
  getAllRequests({ commit }) {
    const { data, error } = useFetch(
      "https://baconipsum.com/api/?type=all-meat&paras=1"
    );
    commit("setRequests", data);
  },
};
