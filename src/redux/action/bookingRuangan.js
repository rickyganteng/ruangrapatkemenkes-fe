import axiosApiIntances from "../../utils/axios";

// export const getAllMovie = (page, limit, sortBy, search) => {
//   return {
//     type: "GET_ALL_MOVIE",
//     payload: axiosApiIntances.get(
//       `bookingruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
//     ),
//   };
// };
export const getbookingRuanganAll = (page, limit, sortBy, search) => {
  return {
    type: "GET_BOOKINGRUANGAN_ALL",
    payload: axiosApiIntances.get(`bookingruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`),
  };
};
export const getbookingRuanganAllTanpaFill = (sortBy, search) => {
  return {
    type: "GET_ALL_TANPAFILL",
    payload: axiosApiIntances.get(`bookingruangan/tanpafill/q?keywords=${search}&sort=${sortBy}`),
  };
};
export const postbookingRuangan = (data) => {
  return {
    type: "POST_BOOKINGRUANGAN",
    payload: axiosApiIntances.post("bookingruangan", data),
  };
};
// export const getPremiereLocation = () => {
//   return {
//     type: "PREMIERE_LOC",
//     payload: axiosApiIntances.get("premiere/location"),
//   };
// };
export const updateDataBooking = (id, data) => {
  return {
    type: "UPDATE_BOOKING_RUANGAN",
    payload: axiosApiIntances.patch(`bookingruangan/${id}`, data),
  };
};
export const deleteBookingRuangan = (id) => {
  return {
    type: "DELETE_BOOKING_RUANGAN",
    payload: axiosApiIntances.delete(`bookingruangan/${id}`),
  };
};