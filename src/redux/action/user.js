import axiosApiIntances from "../../utils/axios";

export const updateProfile = (data) => {
  return {
    type: "UPDATE",
    payload: axiosApiIntances.post("user", data),
  };
};

export const getOrderHistory = (id) => {
  return {
    type: "ORDER_HISTORY",
    payload: axiosApiIntances.get(`booking/user-book?userId=${id}`),
  };
};

export const getUserAllTanpaFill = () => {
  return {
    type: "GET_ALL_USER_TANPAFILL",
    payload: axiosApiIntances.get("user/tanpafill/q"),
  };
};

export const getWaitingListUser = (id) => {
  return {
    type: "ORDER_WAITING_USER",
    payload: axiosApiIntances.get(`waitinglist/byid?userId=${id}`),
  };
};
export const getBookingUser = (id) => {
  return {
    type: "ORDER_BOOKING_USER",
    payload: axiosApiIntances.get(`bookingruangan/byid?userId=${id}`),
  };
};

export const getLaporanUser = (id) => {
  return {
    type: "ORDER_LAPORAN_USER",
    payload: axiosApiIntances.get(`laporanruangan/byid?userId=${id}`),
  };
};

export const postUser = (data) => {
  return {
    type: "POST_USER",
    payload: axiosApiIntances.post("user", data),
  };
};

export const updateDataUser = (id, data) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`user/${id}`, data),
  };

};

export const deleteUser = (id) => {
  return {
    type: "DELETE_USER",
    payload: axiosApiIntances.delete(`user/${id}`),
  };
};