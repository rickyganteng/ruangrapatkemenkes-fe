import axiosApiIntances from "../../utils/axios";

export const getAllMovie = (page, limit, sortBy, search) => {
  return {
    type: "GET_ALL_MOVIE",
    payload: axiosApiIntances.get(
      `movie?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
    ),
  };
};
export const getPremiereAll = (page, limit, sortBy, search) => {
  return {
    type: "GET_RUANGAN_ALL",
    payload: axiosApiIntances.get(`ruangan?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`),
  };
};
export const postRuangan = (data) => {
  return {
    type: "POST_RUANGAN",
    payload: axiosApiIntances.post("ruangan", data),
  };
};
export const getFasilitasRuangan = (id) => {
  return {
    type: "GET_FASILITAS_RUANGAN",
    payload: axiosApiIntances.get(`ruangan/fasilitas/${id}`),
  };
};
export const getRuanganById = (id) => {
  return {
    type: "GET_RUANGAN_BY_ID",
    payload: axiosApiIntances.get(`ruangan/${id}`),
  };
};
// export const getPremiereLocation = () => {
//   return {
//     type: "PREMIERE_LOC",
//     payload: axiosApiIntances.get("premiere/location"),
//   };
// };
export const updateDataRuangan = (id, data) => {
  return {
    type: "UPDATE_DATA_RUANGAN",
    payload: axiosApiIntances.patch(`ruangan/${id}`, data),
  };
};
export const deleteRuangan = (id) => {
  return {
    type: "DELETE_RUANGAN",
    payload: axiosApiIntances.delete(`ruangan/${id}`),
  };
};