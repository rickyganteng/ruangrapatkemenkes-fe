import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  Modal,
  Table,
} from 'react-bootstrap';
import axiosApiIntances from '../../../utils/axios';
import styles from './DataPeminjamBaru.module.css';
import { connect } from 'react-redux';
import {
  getUserAllTanpaFill,
  postUser,
  updateDataUser,
  deleteUser,
} from '../../../redux/action/user';
import EditIcon from '@mui/icons-material/Edit';
import { getPremiereAll } from '../../../redux/action/ruangan';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: 'Sort By',
      sortBy: 'movie_name ASC',
      search: '%%',
      dropDownUserRole: 'select user role',
      dropDownVal2: 'Pilih Unit Kerja',
      listUserRole: ['admin', 'basic'],
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      idDelete: '',
      moon: [
        'January 01',
        'February 02',
        'March 03',
        'April 04',
        'May 05',
        'June 06',
        'July 07',
        'August 08',
        'September 09',
        'October 10',
        'November 11',
        'December 12',
      ],
      unitkerja: [
        'Sekertariat P2P (Tu. Dirjen)',
        'Sekertariat P2P (Tu.sesditjen)',
        'Sekertariat P2P (Subag Adum Sekertariat P2P)',
        'Sekertariat P2P (Program dan Informasi)',
        'Sekertariat P2P (Hukum, Organisasi dan Hubungan Masyarakat)',
        'Sekertariat P2P (Keuangan dan BMN)',
        'Sekertariat P2P (Kepegawaian dan Umum)',
        'Sekertariat P2P (Projek Management Office (PMO))',
        'P2PM (Subag Adum P2PM)',
        'P2PM (Turbeckulosis dan infeksisaluran pernapasan akut (ISPA))',
        'P2PM (HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan Penyakit saluran Infeksi Pernapasa (PISP))',
        'P2PM (Neglected Disease (Penyakit Tropis Terabaikan))',
        'P2PM (Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun)',
        'P2PM (Penyakit Tular Vektor)',
        'Pengelolaan Imunisasi (Subag Adum Pengelolaan Imunisasi)',
        'Pengelolaan Imunisasi (Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta))',
        'Pengelolaan Imunisasi (Imunisasi Tambahan Dan Khusus)',
        'Pengelolaan Imunisasi (Imunisasi Wanita Usia Subur (WUS) dan Surveilan Penyakit yang Dapat Dicegah Dengan Imunisasi (PD31),(KIPI))',
        'Pengelolaan Imunisasi (Imunisasi Usia Sekolah dan Sumber Daya Imunisasi)',
        'P2PTM (Subag Adum P2PTM)',
        'P2PTM (Gangguan Indra Dan Funsional)',
        'P2PTM (Diabetes Melitus dan Gangguan Metabolik)',
        'P2PTM (Jantung Dan Pembulu Darah)',
        'P2PTM (Kangker dan Kelainan Darah)',
        'P2PTM (Paru Kronik dan Gangguan Imunologi)',
        'Penyehatan Lingkungan (Subag Adum  PL)',
        'Penyehatan Lingkungan (Penyehatan Air dan Sanitasi Dasar)',
        'Penyehatan Lingkungan (Penyehatan Pangan)',
        'Penyehatan Lingkungan (Penyehatan Udara,Tanah dan Kawasan)',
        'Penyehatan Lingkungan (Pengamanan Limbah dan Radiasi)',
        'Penyehatan Lingkungan (Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan )',
        'SUKARKES (Subag Adum SUKARKES)',
        'SUKARKES (Kekarantinaan Kesehatan)',
        'SUKARKES (Pengelolaan Laboratorium Kesehatan Masyarakat)',
        'SUKARKES (Pengendalian Vektor)',
        'SUKARKES (Penyakit Infeksi Emerging)',
        'SUKARKES (Surveilans)',
      ],
      pagination: {},
      page: 1,
      limit: 4,
      isShowView1: false,
      isUpdate: false,
      smShow: false,
      showw: false,
      showwHandleDelete: false,
      msgNotif: '',
      form: {
        siswaNama: '',
        siswaNISN: '',
        siswaKelas: '',
        siswaTempatLahir: '',
        siswaTglLahir: '',
        siswaNamaAyah: '',
        siswaNamaIbu: '',
        siswaAlamat: '',

        NamaLengkapPeminjam: '',
        userName: '',
        email: '',
        nohp: '',
        password: '',
        userRole: '',
        userUnitKerja: '',
        userVerif: 'succes',
        id: '',
      },
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
      (e) => e.movie_release_date.split('-')[1] === moon
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
    console.log('dataa', data);
    axiosApiIntances
      .get(`user/${data}`)
      .then((res) => {
        console.log('res data peminjam', res);
        this.setState({
          dropDownVal2: res.data.data[0].user_unit_kerja,
          dropDownUserRole: res.data.data[0].user_role,
          form: {
            NamaLengkapPeminjam: res.data.data[0].user_name,
            email: res.data.data[0].user_email,
            nohp: res.data.data[0].user_phone_number,
            userRole: res.data.data[0].user_role,
            userName: res.data.data[0].user_username,
            password: res.data.data[0].user_password,
            userUnitKerja: res.data.data[0].user_unit_kerja,
            userVerif: 'succes',
            id: res.data.data[0].id,
          },
        });
      })
      .catch((err) => {
        return [];
      });
    this.setState({
      smShow: true,
      isUpdate: true,
    });
    // this.setState({
    //   smShow: true,
    //   isUpdate: true,
    //   id: data,
    //   dropDownUserRole: data,
    //   dropDownVal2: data,
    //   form: {
    //     NamaLengkapPeminjam: data,
    //     userName: data,
    //     email: data,
    //     nohp: data,
    //     password: '',
    //     userRole: data,
    //     userUnitKerja: data,
    //     userVerif: 'succes',
    //   },
    // });
  };
  handleEdit = (params) => {
    console.log(params);
    this.props.getByIdLaporanAktivitas(params);
  };
  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split('-')[0],
      sortBy: event.split('-')[1],
    });
  };

  setSmShow = (event) => {
    this.setState({
      smShow: true,
    });
  };
  modalClose = (event) => {
    this.setState({
      isUpdate: false,
      smShow: false,
      dropDownUserRole: 'select user role',
      dropDownVal2: 'Pilih Unit Kerja',
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: '',
        userName: '',
        email: '',
        nohp: '',
        password: '',
        userRole: '',
        userUnitKerja: '',
      },
    });
  };
  deleteDataUser = (id) => {
    this.props
      .deleteUser(id)
      .then((res) => {
        this.setState(
          {
            msgNotif: 'Data Akun Peminjam Deleted !',
            showw: true,
          },
          () => {
            this.getData2();
          }
        );
      })
      .catch((err) => {
        this.setState({
          msgNotif: 'Deleted Failed !',
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
      dropDownUserRole: 'select user role',
      dropDownVal2: 'Pilih Unit Kerja',
      form: {
        ...this.state.form,
        NamaLengkapPeminjam: '',
        userName: '',
        email: '',
        nohp: '',
        password: '',
        userRole: '',
        userUnitKerja: '',
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
      form.NamaLengkapPeminjam === '' ||
      form.userName === '' ||
      form.email === '' ||
      form.nohp === '' ||
      form.password === '' ||
      form.userRole === '' ||
      form.userUnitKerja === ''
    ) {
      this.setState({
        showw: true,
        msgNotif: 'Lengkapi data dengan benar !',
      });
    } else {
      this.props
        .postUser(formData)
        .then((res) => {
          this.setState(
            {
              modalMsg: 'Submit Data Succes !',
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
      },
    });
  };
  handleShowConfirmDelete = (data) => {
    console.log('aaa', data.id);
    this.setState({
      showwHandleDelete: true,
      idDelete: data.id,
    });
  };
  EditDataUser = () => {
    const { form } = this.state;
    const { id } = this.state.form;
    console.log('coba id', id);
    console.log('coba id', form);
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
            modalMsg: 'Update Data User Succes !',
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
          modalMsg: 'Update Data Failed !',
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
      showwHandleDelete: false,
      showModalSucces: false,
    });
  };
  handleSelectUnitKerja = (event) => {
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        userUnitKerja: event,
      },
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
      email,
      nohp,
      password,
      userRole,
      userUnitKerja,
    } = this.state.form;
    const {
      smShow,
      dropDownUserRole,
      dropDownVal2,
      isUpdate,
      showw,
      showwHandleDelete,
      msgNotif,
      idDelete,
    } = this.state;
    const { dataUser } = this.props.user;

    return (
      <>
        <NavBar isAdminPage={false} />
        <Container>
          <h2 className='mt-5 mb-3'>DATA PEMINJAMAN</h2>
          <Button onClick={() => this.setSmShow()} className='mb-3'>
            Input Data Peminjam
          </Button>

          {/* <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              autoHeight
              rows={dataUser}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10, 15, 25]}
            />
          </div> */}

          <div className='mt-5'>
            <Table striped bordered hover responsive>
              <thead className='text-center'>
                <tr>
                  <th className={styles.witdthKolom}>No</th>
                  <th>Nama Lengkap</th>
                  <th>User Nama</th>
                  <th>Email</th>
                  <th>No HP</th>
                  <th>Unit Kerja</th>
                  <th>Action</th>
                </tr>
              </thead>
              {dataUser.map((item, index) => {
                // console.log('Data user', dataUser);
                return (
                  <tbody className={styles.witdthKolom}>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.user_name}</td>
                      <td>{item.user_username}</td>
                      <td>{item.user_email}</td>
                      <td>{item.user_phone_number}</td>
                      <td>{item.user_unit_kerja}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button
                              onClick={() => this.setUpdate(item.id)}
                              // onClick={() => this.setUpdate(params)}
                              variant='warning'
                            >
                              {' '}
                              <EditIcon />
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              onClick={() => this.handleShowConfirmDelete(item)}
                              variant='danger'
                            >
                              {' '}
                              <DeleteIcon />
                            </Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </div>
          <Modal
            size='xl'
            centered
            backdrop='static'
            keyboard={false}
            show={smShow}
            onHide={() => this.modalClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-sm'>
                {isUpdate ? 'Update' : 'Submit'} Data Peminjam
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Nama Lengkap'
                      name='NamaLengkapPeminjam'
                      value={NamaLengkapPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Nama Lengkap'
                      name='NamaLengkapPeminjam'
                      value={NamaLengkapPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                  <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Username'
                      name='userName'
                      value={userName}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Username'
                      name='userName'
                      value={userName}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Email'
                      type='text'
                      name='email'
                      value={email}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                  <Col>
                    <Form.Label>No HP</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='No HP'
                      name='nohp'
                      value={nohp}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='No HP'
                      name='nohp'
                      value={nohp}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Password'
                      type='password'
                      name='password'
                      value={password}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
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
                  <Col>
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant='secondary'
                      name='ruangSatker'
                      value={userUnitKerja}
                      title={dropDownVal2}
                      id='dropdown-menu-align-right'
                      onSelect={this.handleSelectUnitKerja}
                    >
                      {this.state.unitkerja.length > 0 ? (
                        this.state.unitkerja.map((item, index) => {
                          return (
                            <div className='p-3 shadow' key={index}>
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
                        <p className={styles.notFound}>
                          Unit Kerja Not Found !!!
                        </p>
                      )}
                    </DropdownButton>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <DropdownButton
                      className={`${styles.dropDown}  text-left`}
                      variant='secondary'
                      name='ruangSatker'
                      value={userRole}
                      title={dropDownUserRole}
                      id='dropdown-menu-align-right'
                      onSelect={this.handleSelectUserRole}
                    >
                      {this.state.listUserRole.length > 0 ? (
                        this.state.listUserRole.map((item, index) => {
                          return (
                            <div className='p-3 shadow' key={index}>
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
                        <p className={styles.notFound}>
                          Unit Kerja Not Found !!!
                        </p>
                      )}
                    </DropdownButton>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}></Form.Group>
              </Form>
              <Row>
                <Col xs={2}>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    onClick={() => this.modalClose()}
                    variant='outline-primary'
                  >
                    Cancel
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className={styles.btSubmit}
                    variant='primary'
                    onClick={() => this.sendData()}
                  >
                    {isUpdate ? 'Update' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            // size="xl"
            centered
            show={showw}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>{msgNotif}</Modal.Body>
          </Modal>

          <Modal
            // size="xl"
            centered
            show={showwHandleDelete}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>Apakah Anda Yakin Dihapus ?</Modal.Header>
            <Modal.Body>
              <Button
                variant='primary'
                onClick={() => this.deleteDataUser(idDelete)}
              >
                Iya
              </Button>{' '}
              <Button variant='danger' onClick={() => this.modalPhotoClose()}>
                Tidak
              </Button>
            </Modal.Body>
          </Modal>
          <Footer />
        </Container>
      </>
    );
  }
}
const mapDispatchToProps = {
  getPremiereAll,
  getUserAllTanpaFill,
  postUser,
  updateDataUser,
  deleteUser,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  user: state.user,
  // ruangan: state.ruangan
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
