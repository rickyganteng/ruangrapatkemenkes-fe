const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  dataRuangan: [],
  paginationn: [],
  dataFasById: [],
  dataRuanganById: []
};

const ruangan = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RUANGAN_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_RUANGAN_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataRuangan: action.payload.data.data,
        paginationn: action.payload.data.pagination
      };
    case "GET_RUANGAN_ALL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataRuangan: []
      };
    case "POST_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_RUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "DELETE_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_RUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "GET_FASILITAS_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_FASILITAS_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataFasById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "GET_FASILITAS_RUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataFasById: []
      };
    case "GET_RUANGAN_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_RUANGAN_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        dataRuanganById: action.payload.data.data,
        // pag: action.payload.data.pagination
      };
    case "GET_RUANGAN_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        dataRuanganById: []
      };
    case "UPDATE_DATA_RUANGAN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_DATA_RUANGAN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_DATA_RUANGAN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    default:
      return state;
  }
};

export default ruangan;