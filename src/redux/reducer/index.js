import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import updateProfile from "./user";
import ruangan from "./ruangan";
import bookingruangan from "./bookingRuangan";
import laporanruangan from "./laporanRuangan"
import user from "./user"
import waitingList from "./waitingLIst"

export default combineReducers({
  waitingList,
  user,
  laporanruangan,
  bookingruangan,
  counter,
  auth,
  updateProfile,
  ruangan,
});