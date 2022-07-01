import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Cards from "../../../components/Card/Cards";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Image, Container, Row, Col, Form } from "react-bootstrap";
import line from "../../../assets/img/line.png";
import hero1 from "../../../assets/img/g1.png";
import hero2 from "../../../assets/img/g2.png";
import hero3 from "../../../assets/img/g3.png";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      moon: [
        "January 01",
        "February 02",
        "March 03",
        "April 04",
        "May 05",
        "June 06",
        "July 07",
        "August 08",
        "September 09",
        "October 10",
        "November 11",
        "December 12",
      ],
      pagination: {},
      page: 1,
      limit: 4,
      isShowView1: false,
    };
  }

  componentDidMount() {
    this.getDataMovieUpcoming(1, 9, "movie_release_date DESC");
    this.getDataMoviePlayNow(
      this.state.page,
      this.state.limit,
      "movie_release_date DESC"
    );
  }

  getDataMovieUpcoming = (page, limit, sort) => {
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        this.setState({
          dataMovUpcoming: res.data.data,
          tmpDataMovUpcoming: res.data.data,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  getDataMoviePlayNow = (page, limit, sort) => {
    axiosApiIntances
      .get(`movie?page=${page}&limit=${limit}&sort=${sort}`)
      .then((res) => {
        this.setState({
          dataMovPlayNow: res.data.data,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        return [];
      });
  };

  handleMoon = (moon) => {
    const { dataMovUpcoming } = this.state;
    const filterTmp = dataMovUpcoming.filter(
      (e) => e.movie_release_date.split("-")[1] === moon
    );
    this.setState({
      tmpDataMovUpcoming: filterTmp,
    });
  };

  handleView2 = () => {
    this.setState({
      tmpDataMovUpcoming: this.state.dataMovUpcoming,
    });
  };

  handleView1 = () => {
    let { isShowView1 } = this.state;
    isShowView1 ? (isShowView1 = false) : (isShowView1 = true);
    this.setState({
      isShowView1: isShowView1,
    });
  };

  handleBanner = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataMoviePlayNow(
        this.state.page,
        this.state.limit,
        "movie_release_date DESC"
      );
    });
  };

  render() {
    console.log("DataMovUpcoming", this.state.dataMovUpcoming);
    return (
      <>
        <NavBar isAdminPage={false} />
        <Container fluid>
          <Row className="mt-5">
            <Col className="text-center" lg={6}>
              <div className={styles.centerContent}>
                <p className={styles.semiTitle}>
                  Nearest Cinema, Newest Movie,
                </p>
                <p className={styles.boldTitle}>Find out now!</p>
              </div>
            </Col>
            <Col className="text-center" lg={6}>
              <div className="p-2">
                <Image className="mr-3 mt-5" src={hero1} />
                <Image className="mr-3" src={hero2} />
                <Image className="mb-5" src={hero3} />
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="pl-5">
          <Row className="mt-5 ml-2 mr-2">
            <Col className="text-sm-left text-center" sm={6}>
              <div>
                <p className={styles.rightBold}>Now Showing</p>
                <img src={line} alt="..." />
              </div>
            </Col>
            <Col className="text-sm-right text-center" sm={6}>
              <p
                className={styles.leftPurple}
                onClick={() => this.handleView1()}
              >
                {this.state.isShowView1 ? (
                  <span>View less</span>
                ) : (
                  <span>View all</span>
                )}
              </p>
            </Col>
          </Row>

          {this.state.isShowView1 ? (
            <Row className="ml-2 mt-3">
              {this.state.dataMovPlayNow.map((item, index) => {
                return (
                  <Col sm={parseInt(12 / this.state.limit)} key={index}>
                    <Cards className="mr-2" data={item} />
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="ml-2 overflow-auto d-flex flex-row">
                  {this.state.dataMovUpcoming.map((item, index) => {
                    return (
                      <div
                        className="p-3 bd-highlight"
                        key={index}
                        onClick={() => this.handleBanner(item.movie_id)}
                      >
                        <img
                          className={styles.banner}
                          src={`http://localhost:3001/backend1/api/${item.movie_image}`}
                          alt="..."
                        />
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          )}
          {this.state.isShowView1 ? (
            <Row className="mt-3">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pagination.totalPage}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </Row>
          ) : (
            ""
          )}
        </Container>
        <Container fluid className="pl-5">
          <Row className="mt-5 ml-2 mr-2">
            <Col className="text-sm-left text-center" sm={6}>
              <div>
                <p className={styles.rightBold}>Upcoming Movies</p>
                <br />
              </div>
            </Col>
            <Col className="text-sm-right text-center" sm={6}>
              {this.state.tmpDataMovUpcoming.length !==
                this.state.dataMovUpcoming.length ? (
                <p
                  className={styles.leftPurple}
                  onClick={() => this.handleView2()}
                >
                  View all
                </p>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <div className="ml-3 overflow-auto d-flex flex-row">
                {this.state.moon.map((item, index) => {
                  return (
                    <Button
                      className={`${styles.btMoon} m-2`}
                      variant="outline-primary"
                      key={index}
                      onClick={() => this.handleMoon(item.split(" ")[1])}
                    >
                      <div className={styles.butCnt}>{item.split(" ")[0]}</div>
                    </Button>
                  );
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="ml-3 overflow-auto d-flex flex-row">
                {this.state.tmpDataMovUpcoming.length > 0 ? (
                  this.state.tmpDataMovUpcoming.map((item, index) => {
                    return (
                      <div className="p-3 shadow" key={index}>
                        <Cards data={item} />
                      </div>
                    );
                  })
                ) : (
                  <p className={styles.notFound}>Movie Not Found !!!</p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="text-center pl-5 mt-5">
          <div className={`${styles.beforeFoot} shadow`}>
            <div>
              <p className={styles.semiTitle}>Be the vanguard of the</p>
              <p className={styles.boldTitle}>Moviegoers</p>
            </div>
            <div className={styles.form}>
              <Form>
                <Form.Group>
                  <div className="d-flex flex-sm-row flex-column align-items-center">
                    <Form.Control
                      className="mb-2"
                      type="email"
                      placeholder="Type your Email"
                    />
                    <Button
                      className={`${styles.btJoin} mb-2`}
                      variant="primary"
                    >
                      Join now
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
            <div className={`${styles.beforeFoot} pb-5`}>
              <p className={styles.semiText}>
                By joining you as a Tickitz member,
              </p>
              <p className={styles.semiText}>
                we will always send you the latest updates via email .
              </p>
            </div>
          </div>
        </Container>
        <Container className="pl-4">
          <Footer />
        </Container>
      </>
    );
  }
}

export default Home;
