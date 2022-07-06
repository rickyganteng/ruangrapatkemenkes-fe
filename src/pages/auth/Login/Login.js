import React, { Component } from "react";
import styles from "./Login.module.css";
import { Row, Col, Button, Container, Form, Image, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../../redux/action/auth";
import logo from "../../../assets/img/gambarkemenkes.png";
// dede
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: "",
        userPassword: "",
      },
      msg: "",
      emailValid: "valid",
      passwordValid: "valid",
    };
  }

  changeText = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleLogin = (event) => {
    event.preventDefault();
    this.props
      .login(this.state.form)
      .then((res) => {
        localStorage.setItem("token", this.props.auth.data.token);
        localStorage.setItem("user", this.props.auth.data.user_id);
        this.props.history.push("/bookingruangrapat");
      })
      .catch((err) => {
        this.setState({
          msg: err.response.data.msg,
          emailValid: err.response.data.status === 404 ? "Invalid" : "valid",
          passwordValid: err.response.data.status === 400 ? "Invalid" : "valid",
        });
      });
  };

  handleRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    const {
      userName,
      userPassword,
      emailValid,
      passwordValid,
      msg,
    } = this.state;

    return (
      <>
        <Container fluid>
          <Row className="justify-content-md-center mt-5 mx-auto">
            <Col md={5}>
              <Image src={logo} className={styles.ukuranFoto} fluid />
            </Col>
            <Col md={4}>
              <Card>
                <div className="mx-auto p-4">
                  <h1 className="mt-3">Login Ruang Rapat Ditjen P2P</h1>

                  <Form onSubmit={this.handleLogin} className="mt-5">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user name"
                        name="userName"
                        value={userName}
                        onChange={(event) => this.changeText(event)}
                      />
                      <Form.Control.Feedback type={emailValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        value={userPassword}
                        onChange={(event) => this.changeText(event)}
                      />
                      <Form.Control.Feedback type={passwordValid}>
                        <p className={styles.warning}>{msg}</p>
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className={`${styles.btSubmit} mt-3`}
                    >
                      Sign in
                    </Button>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
