import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import { Button, Container, Row, Col, Form, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import styles from "./DataPeminjam.module.css";
import { connect } from "react-redux";
import { getUserAllTanpaFill, postUser, updateDataUser, deleteUser } from "../../../redux/action/user"
import EditIcon from '@mui/icons-material/Edit';
import { getPremiereAll } from "../../../redux/action/ruangan"
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: "Sort By",
      sortBy: "movie_name ASC",
      search: "%%",
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      listUserRole: ["admin", "basic"],
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
      unitkerja: [
        "Sekertariat P2P (Program dan Informasi)",
        "Sekertariat P2P (Hukum, Organisasi dan Hubungan Masyarakat)",
        "Sekertariat P2P (Keuangan dan BMN)",
        "Sekertariat P2P (Kepegawaian dan Umum)",
        "P2PM (Turbeckulosis dan infeksisaluran pernapasan akut (ISPA))",
        "P2PM (Turbeckulosis dan infeksisaluran pernapasan akut (ISPA))",
        "P2PM (HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan Penyakit saluran Infeksi Pernapasa (PISP))",
        "P2PM (Neglected Disease (Penyakit Tropis Terabaikan))",
        "P2PM (Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun)",
        "P2PM (Penyakit Tular Vektor)",
        "Pengelolaan Imunisasi (Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta))",
        "Pengelolaan Imunisasi (Imunisasi Tambahan Dan Khusus)",
        "Pengelolaan Imunisasi (Imunisasi Wanita Usia Subur (WUS) dan Surveilan Penyakit yang Dapat Dicegah Dengan Imunisasi (PD31),(KIPI))",
        "Pengelolaan Imunisasi (Imunisasi Usia Sekolah dan Sumber Daya Imunisasi)",
        "P2PTM (Gangguan Indra Dan Funsional)",
        "P2PTM (Diabetes Melitus dan Gangguan Metabolik)",
        "P2PTM (Jantung Dan Pembulu Darah)",
        "P2PTM (Kangker dan Kelainan Darah)",
        "P2PTM (Paru Kronik dan Gangguan Imunologi)",
        "Penyehatan Lingkungan (Penyehatan Air dan Sanitasi Dasar)",
        "Penyehatan Lingkungan (Penyehatan Pangan)",
        "Penyehatan Lingkungan (Penyehatan Udara,Tanah dan Kawasan)",
        "Penyehatan Lingkungan (Pengamanan Limbah dan Radiasi)",
        "Penyehatan Lingkungan (Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan )",
        "SUKARKES (Kekarantinaan Kesehatan)",
        "SUKARKES (Pengelolaan Laboratorium Kesehatan Masyarakat)",
        "SUKARKES (Pengendalian Vektor)",
        "SUKARKES (Penyakit Infeksi Emerging)",
        "SUKARKES (Surveilans)",
      ],
      pagination: {},
      page: 1,
      limit: 4,
      isShowView1: false,
      isUpdate: false,
      smShow: false,
      showw: false,
      msgNotif: "",
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: "",

        NamaLengkapPeminjam: "",
        userName: "",
        teamKerja: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: "",
        userVerif: "succes"
      }
    };
  }

  componentDidMount() {
    // this.getData();
    // this.getData1();
    this.getData2();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData2();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `/?search=${this.state.search}&sortby=${this.state.sortBy}&page=${this.state.page}`
      );
    }
  }

  getData2 = () => {
    this.props.getUserAllTanpaFill();
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

  handlePageClick2 = (event) => {
    const selectedPage1 = event.selected + 1;
    this.setState({ page: selectedPage1 }, () => {
      this.getData();
    });
  };
  setUpdate = (data) => {
    this.setState({
      smShow: true,
      isUpdate: true,
      id: data.row.id,
      dropDownUserRole: data.row.user_role,
      dropDownVal2: data.row.user_unit_kerja,
      form: {
        NamaLengkapPeminjam: data.row.user_name,
        userName: data.row.user_username,
        teamKerja: data.row.user_team_kerja,
        email: data.row.user_email,
        nohp: data.row.user_phone_number,
        password: data.row.user_password,
        userRole: data.row.user_role,
        userUnitKerja: data.row.user_unit_kerja,
        userVerif: "succes",
      },
    });
  };
  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
    });
  };

  setSmShow = (event) => {
    this.setState({
      smShow: true
    });
  };
  modalClose = (event) => {
    this.setState({
      isUpdate: false,
      smShow: false,
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: "",
        userName: "",
        teamKerja: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: ""
      },
    });
  };
  deleteDataUser = (id) => {
    this.props
      .deleteUser(id.id)
      .then((res) => {
        this.setState(
          {
            msgNotif: "Data Akun Peminjam Deleted !",
            showw: true,
          },
          () => {
            this.getData2();
          }
        );
      })
      .catch((err) => {
        this.setState({
          msgNotif: "Deleted Failed !",
          showw: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  resetForm = () => {
    this.setState({
      dropDownUserRole: "select user role",
      dropDownVal2: "Pilih Unit Kerja",
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: "",
        userName: "",
        teamKerja: "",
        email: "",
        nohp: "",
        password: "",
        userRole: "",
        userUnitKerja: ""
      },
    });
  };

  postDataUser = () => {
    const { form } = this.state;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.NamaLengkapPeminjam === "" ||
      form.userName === "" ||
      form.teamKerja === "" ||
      form.email === "" ||
      form.nohp === "" ||
      form.password === "" ||
      form.userRole === "" ||
      form.userUnitKerja === ""
    ) {

      this.setState({
        showw: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else {
      this.props
        .postUser(formData)
        .then((res) => {
          this.setState(
            {
              modalMsg: "Submit Data Succes !",
              show: true,
              smShow: false,
            },
            () => {
              // this.getData();
              // this.getData1();
              this.getData2();
            }
          );
          this.resetForm();

        })
        .catch((err) => {
          this.setState({
            showw: true,
            msgNotif: err.response.data.msg,

          });
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({ show: false });
          }, 1000);
        });
    }

  };
  handleSelectUserRole = (event) => {
    this.setState({
      dropDownUserRole: event,
      form: {
        ...this.state.form,
        userRole: event,
      }
    });
  };
  EditDataUser = () => {
    const { form, id } = this.state;
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
            modalMsg: "Update Data User Succes !",
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true,
          },
          () => {
            this.getData2();
          }
        );
        this.resetForm();
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Update Data Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };
  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.EditDataUser();
    } else {
      this.postDataUser();
    }
  };
  modalPhotoClose = (event) => {
    this.setState({
      photoShow: false,
      photoShowPdf: false,
      showw: false,
      showModalSucces: false
    });
  };
  handleSelectUnitKerja = (event) => {
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        userUnitKerja: event,
      }
    });
  };


  changeTextForm = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    const {
      NamaLengkapPeminjam,
      userName,
      teamKerja,
      email,
      nohp,
      password,
      userRole,
      userUnitKerja,
    } = this.state.form;
    const { smShow, dropDownUserRole, dropDownVal2, isUpdate, showw, msgNotif } = this.state;
    const { dataUser } = this.props.user

    const columns = [
      { field: 'user_name', headerName: 'Nama Lengkap', width: 300 },
      { field: 'user_username', headerName: 'User Nama', width: 300 },
      { field: 'user_team_kerja', headerName: 'Team Kerja', width: 220 },
      { field: 'user_email', headerName: 'Email', width: 200 },
      { field: 'user_phone_number', headerName: 'No Hp', width: 150 },
      { field: 'user_unit_kerja', headerName: 'Unit Kerja', width: 300 },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Action', width: 155, renderCell: (params) => {
          return (
            // you will find row info in params
            <Row>
              <Col>
                <Button onClick={() => this.setUpdate(params)} variant="warning">  < EditIcon /></Button>
              </Col>
              <Col>
                <Button onClick={() => this.deleteDataUser(params)} variant="danger">  <DeleteIcon /></Button>
              </Col>
            </Row>
          )
        }
      },
    ];

    return (
      <>

        <NavBar isAdminPage={false} />


        <Container>
          <h2
            className="mt-5 mb-3">DATA PEMINJAMAN</h2 >
          <Button onClick={() => this.setSmShow()} className="mb-3">Input Data Peminjam</Button>

          <div style={{ height: 400, width: '100%', }}>
            <DataGrid
              autoHeight
              rows={dataUser}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10, 15, 25]}
            />
          </div>
          <Modal
            size="xl"
            centered
            backdrop="static"
            keyboard={false}
            show={smShow}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {isUpdate ? "Update" : "Submit"} Data Peminjam
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Nama Lengkap"
                      name="NamaLengkapPeminjam"
                      value={NamaLengkapPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Username"
                      name="userName"
                      value={userName}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Team Kerja"
                      name="teamKerja"
                      value={teamKerja}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="No HP"
                      name="nohp"
                      value={nohp}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>


                  {/* <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Unit Kerja"
                      name="userUnitKerja"
                      value={userUnitKerja}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}
                </Form.Group>
                <Form.Group as={Row}>
                  <Col >
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant="secondary"
                      name="ruangSatker"
                      value={userUnitKerja}
                      title={dropDownVal2}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelectUnitKerja}

                    >
                      {this.state.unitkerja.length > 0 ? (
                        this.state.unitkerja.map((item, index) => {
                          return (
                            <div className="p-3 shadow" key={index}>
                              <Dropdown.Item
                                className={styles.semi}
                                eventKey={`${item}`}
                                onChange={(event) => this.changeTextForm(event)}

                              >
                                {item}
                              </Dropdown.Item>
                            </div>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </DropdownButton>
                  </Col>
                  <Col >
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant="secondary"
                      name="ruangSatker"
                      value={userRole}
                      title={dropDownUserRole}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelectUserRole}

                    >
                      {this.state.listUserRole.length > 0 ? (
                        this.state.listUserRole.map((item, index) => {
                          return (
                            <div className="p-3 shadow" key={index}>
                              <Dropdown.Item
                                className={styles.semi}
                                eventKey={`${item}`}
                                onChange={(event) => this.changeTextForm(event)}

                              >
                                {item}
                              </Dropdown.Item>
                            </div>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </DropdownButton>
                  </Col>

                </Form.Group>
                <Form.Group as={Row}>
                </Form.Group>
              </Form>
              <Row>
                <Col xs={2}>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    onClick={() => this.modalClose()}
                    variant="outline-primary">Cancel</Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendData()}
                  >{isUpdate ? "Update" : "Submit"}</Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            // size="xl"
            centered
            show={showw}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              {msgNotif}
            </Modal.Body>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getPremiereAll, getUserAllTanpaFill, postUser, updateDataUser, deleteUser };

const mapStateToProps = (state) => ({
  movie: state.movie,
  user: state.user
  // ruangan: state.ruangan
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
