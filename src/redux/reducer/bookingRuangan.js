const initialState = {
  isLoading: false,
  isError: false,
  msg: '',
  bismillah: [],
  til: [],
  paginationn: [],
};

const bookruangan = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKINGRUANGAN_ALL_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'GET_BOOKINGRUANGAN_ALL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        til: action.payload.data.data,
        paginationn: action.payload.data.pagination,
      };
    case 'GET_BOOKINGRUANGAN_ALL_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        til: [],
      };
    case 'GET_ALL_TANPAFILL_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'GET_ALL_TANPAFILL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
        bismillah: action.payload.data.data,
        paginationnn: action.payload.data.pagination,
      };
    case 'GET_ALL_TANPAFILL_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
        bismillah: [],
      };
    case 'POST_BOOKINGRUANGAN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'POST_BOOKINGRUANGAN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case 'POST_BOOKINGRUANGAN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case 'DELETE_BOOKING_RUANGAN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'DELETE_BOOKING_RUANGAN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case 'DELETE_BOOKING_RUANGAN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.message,
      };
    case 'UPDATE_BOOKING_RUANGAN_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'UPDATE_BOOKING_RUANGAN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case 'UPDATE_BOOKING_RUANGAN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default bookruangan;
