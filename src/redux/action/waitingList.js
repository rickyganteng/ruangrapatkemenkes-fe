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
    type: "GET_WAITINGLIST_ALL",
    payload: axiosApiIntances.get(`bookingruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`),
  };
};
export const getwaitinglistAllTanpaFill = () => {
  return {
    type: "GET_ALL_WAITINGLIST_TANPAFILL",
    payload: axiosApiIntances.get("waitinglist/tanpafill/q"),
  };
};
export const postwaitinglist = (data) => {
  return {
    type: "POST_WAITINGLIST",
    payload: axiosApiIntances.post("waitinglist", data),
  };
};
export const postWaitingListLebihSatu = (data) => {
  return {
    type: "POST_WAITINGLIST_LEBIH_SATU",
    payload: axiosApiIntances.post("waitinglist/lebihsatu", data),
  };
};
// export const getPremiereLocation = () => {
//   return {
//     type: "PREMIERE_LOC",
//     payload: axiosApiIntances.get("premiere/location"),
//   };
// };
export const updateDatawaitinglist = (id, data) => {
  return {
    type: "UPDATE_WAITINGLIST",
    payload: axiosApiIntances.patch(`waitinglist/${id}`, data),
  };
};
export const deletewaitinglist = (id) => {
  return {
    type: "DELETE_WAITINGLIST",
    payload: axiosApiIntances.delete(`waitinglist/${id}`),
  };
};