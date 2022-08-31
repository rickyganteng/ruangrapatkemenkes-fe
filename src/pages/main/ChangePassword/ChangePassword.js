import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import styles from "./ChangePassword.module.css";
import { connect } from "react-redux";
import { updateDataUser } from "../../../redux/action/user"
import TextField from '@mui/material/TextField';
import { logout } from "../../../redux/action/auth";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        password: "",
        NamaLengkapPeminjam: "",
        userName: "",
        email: "",
        nohp: "",
        userRole: "",
        userUnitKerja: "",
        userVerif: "",
        idUser: this.props.auth.data.id
      },
      showNotif: false,
      modalMsg: ""
    };
  }
  updateData = (id) => {
    const { form } = this.state;

    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // for (var pair of formData.entries()) {
    // }
    this.props
      .updateDataUser(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Succes !",
            showNotif: true,
            showEditUser: false,
          }
        );
        // this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          showNotif: true,
        });
      })
    // .finally(() => {
    //   setTimeout(() => {
    //     this.setState({ showNotif: false });
    //   }, 1000);
    //   // this.props.history.push("/bookingruangrapat/login");

    // });

  };

  changeTextForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleCloseNotif = () => {
    this.props.history.push("/bookingruangrapat/login");
    this.props.logout();
  }

  render() {
    const { password, idUser } = this.state.form
    const { modalMsg, showNotif } = this.state
    return (
      <>

        <NavBar isAdminPage={false} />


        <Container>
          <h1>Change Password</h1>


          <Form>
            <Form.Group as={Row}>
              <Col>

                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Change Password"
                  name="password"
                  value={password}
                  onChange={(event) => this.changeTextForm(event)}
                />
              </Col>

            </Form.Group>

          </Form>
          <Row>

            <Col xs={2}>
              <Button
                className={styles.btSubmit}
                variant="primary"
                onClick={() => this.updateData(idUser)}
              >
                Save

              </Button>
            </Col>
          </Row>

          <Footer />
        </Container >

        {/* modal notif */}
        <Modal
          size="sm"
          show={showNotif}
          onHide={this.handleCloseNotif}
          centered
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Notif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalMsg} <br />
            Silahkan Login kembali !
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseNotif}>Log In</Button>
          </Modal.Footer>
        </Modal>
        {/* akhir modal notif */}

      </>
    );
  }
}
const mapDispatchToProps = { updateDataUser, logout };

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  laporanruangan: state.laporanruangan,
  laporanUser: state,
  auth: state.auth,
  coba: state,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
