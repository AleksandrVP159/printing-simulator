export default {
  getRequests(state) {
    return [...state.requests].toString().split("");
  },
};
