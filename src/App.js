import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import BasicReact from "./pages/learning/BasicReact/BasicReact";
import BasicHome from "./pages/learning/Home/Home";
import BasicMovieDetail from "./pages/learning/MovieDetail/MovieDetail";
import BasicRedux from "./pages/learning/BasicRedux/BasicRedux";

import HomeBook from "./pages/main/HomeBook/Homebook";
import DataPeminjam from "./pages/main/DataPeminjam/DataPeminjam";
import DataLaporan from "./pages/main/DataLaporan/DataLaporan";
import DataBooking from "./pages/main/DataBooking/DataBooking";
import DataLaporUser from "./pages/main/DataLaporanUser/DataLaporanUser"
import DataFilterLaporan from "./pages/main/DataFilterLaporan/DataFilterLaporan"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route
                path="/bookingruangrapat/datapeminjam"
                exact
                component={DataPeminjam}

              />
              <Route
                path="/bookingruangrapat/datalaporan"
                exact
                component={DataLaporan}

              />
              <Route
                path="/bookingruangrapat/datalaporanuser"
                exact
                component={DataLaporUser}

              />
              <Route
                path="/bookingruangrapat/datafilterlaporan"
                exact
                component={DataFilterLaporan}

              />
              <Route
                path="/bookingruangrapat/databooking"
                exact
                component={DataBooking}

              />
              <PublicRoute
                restricted={true}
                path="/bookingruangrapat/login"
                exact
                component={Login}
              />
              <PublicRoute
                path="/learning/basic-react"
                exact
                component={BasicReact}
              />
              <PrivateRoute
                path="/learning/basic-home"
                exact
                component={BasicHome}
              />
              <Route
                path="/learning/basic-movie-detail/:id"
                exact
                component={BasicMovieDetail}
              />
              <Route
                path="/learning/basic-redux"
                exact
                component={BasicRedux}
              />
              <Route
                path="/bookingruangrapat"
                exact
                component={HomeBook}
              />

            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
