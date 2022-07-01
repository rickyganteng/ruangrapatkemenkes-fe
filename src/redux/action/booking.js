import axiosApiIntances from "../../utils/axios";

export const getSalesIncome = (premiereName, movieId, locationAddress) => {
  return {
    type: "SALES_INCOME",
    payload: axiosApiIntances.get(
      `booking/book-sale?premiereName=${premiereName}&movieId=${movieId}&locationAddress=${locationAddress}`
    ),
  };
};
