const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  waitingtanpafill: [],
  waitinglistAll: [],
  paginationn: []
};

const waitinglist = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WAITINGLIST_ALL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_WAITINGLIST_ALL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        waitinglistAll: action.payload.data.data,
        paginationn: action.payload.data.pagination
      };
    case "GET_WAITINGLIST_ALL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        waitinglistAll: []
      };
    case "GET_ALL_WAITINGLIST_TANPAFILL_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_WAITINGLIST_TANPAFILL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        waitingtanpafill: action.payload.data.data,
        paginationnn: action
      };
    case "GET_ALL_WAITINGLIST_TANPAFILL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        waitingtanpafill: []
      };
    case "POST_WAITINGLIST_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_WAITINGLIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_WAITINGLIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "POST_WAITINGLIST_LEBIH_SATU_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_WAITINGLIST_LEBIH_SATU_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_WAITINGLIST_LEBIH_SATU_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "DELETE_DELETE_WAITINGLIST_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_DELETE_WAITINGLIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_DELETE_WAITINGLIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case "UPDATE_WAITINGLIST_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_WAITINGLIST_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_WAITINGLIST_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    default:
      return state;
  }
};

export default waitinglist;
