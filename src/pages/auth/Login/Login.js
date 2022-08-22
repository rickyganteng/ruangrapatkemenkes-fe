import React, { Component } from "react";
import styles from "./Login.module.css";
import { Row, Col, Button, Container, Form, Image, Card, InputGroup } from "react-bootstrap";
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
      showPassword: false,
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
        console.log(this.props.auth);
        localStorage.setItem("token", this.props.auth.data.token);
        localStorage.setItem("user", this.props.auth.data.id);
        this.props.history.push("/");
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

  handleShowPass = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  render() {
    const {
      userName,
      userPassword,
      emailValid,
      passwordValid,
      msg,
      showPassword
    } = this.state;

    const iconSHowPass = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
    </svg>

    const iconHidePass = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
    </svg>
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
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name="userPassword"
                          value={userPassword}
                          onChange={(event) => this.changeText(event)}
                        />
                        <InputGroup.Text onClick={this.handleShowPass}>{showPassword ? iconSHowPass : iconHidePass}</InputGroup.Text>
                      </InputGroup>
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
