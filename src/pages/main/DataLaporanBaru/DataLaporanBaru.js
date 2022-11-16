import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import axiosApiIntances from '../../../utils/axios';
import {
  Button,
  Image,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';
import styles from './DataLaporanBaru.module.css';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getlaporanRuanganAll,
  getlaporanRuanganAllTanpaFill,
  getlaporanRuanganTanggal,
  deleteLaporanAktivitasAll,
  deleteLaporanAktivitasById,
} from '../../../redux/action/laporanRuangan';
import { getLaporanUser } from '../../../redux/action/user';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: 'Sort By',
      sortBy: 'id DESC',
      search: '%%',
      photoShow: false,
      modalTanggal: false,
      showVerifDeleteAll: false,
      showwHandleDelete: false,
      showModalSucces: false,
      idDelete: '',
      modalMsg: '',
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
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
      pagination: {},
      page: 4,
      limit: 3,
      isShowView1: false,
      smShow: false,
      form: {
        siswaNama: '',
        siswaNISN: '',
        siswaKelas: '',
        siswaTempatLahir: '',
        siswaTglLahir: '',
        siswaNamaAyah: '',
        siswaNamaIbu: '',
        siswaAlamat: '',
        searchtanggal: '',
        FromDate: '',
        ToDate: '',
      },
    };
  }

  componentDidMount() {
    this.getData2();
    this.getData3();
    this.getData4();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ page: 1 }, () => {
        this.getData4();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(`datalaporan?search=${this.state.search}`);
    }
  }

  getData2 = () => {
    this.props.getlaporanRuanganTanggal();
  };
  getData4 = () => {
    const { search } = this.state;
    this.props.getlaporanRuanganAllTanpaFill(search);
  };
  getData3 = () => {
    const id = this.props.auth.data.id;
    this.props.getLaporanUser(id);
  };

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

  handleBanner = (id) => {
    this.props.history.push(`/main/movie-detail/${id}`);
  };

  handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    this.setState({ page: selectedPage }, () => {
      this.getDataMoviePlayNow(
        this.state.page,
        this.state.limit,
        'movie_release_date DESC'
      );
    });
  };
  // handlePageClick2 = (event) => {
  //   const selectedPage1 = event.selected + 1;
  //   this.setState({ page: selectedPage1 }, () => {
  //     this.getData();
  //   });
  // };
  setUpdate = (data) => {
    this.setState({
      isUpdate: true,
      id: data.movie_id,
      form: {
        movieName: data.movie_name,
        movieCategory: data.movie_category,
        movieReleaseDate: moment(data.movie_release_date).format('YYYY-MM-DD'),
        movieDuration: data.movie_duration,
        movieDirectedBy: data.movie_directed_by,
        movieCasts: data.movie_casts,
        movieSynopsis: data.movie_synopsis,
        movieImage: `https://devruangrapatp2p.kemkes.go.id/backend1/api/${data.movie_image}`,
        // movieImage: `http://localhost:3001/backend1/api/${data.movie_image}`,
        image: null,
      },
    });
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
      smShow: false,
      photoShow: false,
      modalTanggal: false,
    });
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: '%' + event.target.value + '%' });
  };

  handleImageTable = (moon) => {
    console.log('moon', moon);
    this.setState({
      photoSuratDinas: moon,
      photoShow: true,
    });
  };
  handleTanggal = () => {
    this.setState({
      modalTanggal: true,
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

  handleOpenVierifDeleteAll = () => {
    this.setState({
      showVerifDeleteAll: true,
      // idDelete: id
    });
  };

  handleCloseVierifDeleteAll = () => {
    this.setState({
      showVerifDeleteAll: false,
      showwHandleDelete: false,
      // idDelete: ""
    });
  };
  handleShowConfirmDelete = (data) => {
    console.log('aaa', data.id);
    this.setState({
      showwHandleDelete: true,
      idDelete: data.id,
    });
  };

  deleteDataLaporanAktivitasAll = () => {
    this.props
      .deleteLaporanAktivitasAll()
      .then((res) => {
        this.setState(
          {
            modalMsg: 'Data Laporan Ruangan Deleted !',
            showNotif: true,
          },
          () => {
            this.getData2();
            this.getData3();
            this.getData4();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: 'Deleted Failed !',
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({
            show: false,
            showNotif: false,
            showVerifDeleteAll: false,
          });
        }, 1000);
      });
  };
  deleteData = (id) => {
    this.props
      .deleteLaporanAktivitasById(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: 'Data Laporan Deleted !',
            show: true,
            showwHandleDelete: false,
            showModalSucces: true,
          },
          () => {
            this.getData2();
            this.getData3();
            this.getData4();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: 'Deleted Failed !',
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false, showModalSucces: false });
        }, 1000);
      });
  };
  render() {
    const { FromDate, ToDate, searchtanggal } = this.state.form;
    const {
      photoShow,
      modalTanggal,
      photoSuratDinas,
      showVerifDeleteAll,
      showwHandleDelete,
      idDelete,
      showModalSucces,
      modalMsg,
    } = this.state;
    const { laporanruangann } = this.props.laporanruangan;
    const { data } = this.props.auth;
    const IconDelete = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        class='bi bi-trash'
        viewBox='0 0 16 16'
      >
        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
        <path
          fill-rule='evenodd'
          d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
        />
      </svg>
    );
    const columns = [
      {
        field: 'booking_ruangan_nama',
        headerName: 'Nama',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_nip',
        headerName: 'NIP',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_unitkerja',
        headerName: 'Unit Kerja',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_tanggal',
        headerName: 'Tanggal Mulai',
        width: 130,
        renderCell: (params) => {
          var confdate = new Date(
            parseInt(params.row.booking_ruangan_tanggal)
          ).toLocaleDateString('en-CA');
          return <div className={` mt-0  mx-auto`}>{confdate}</div>;
        },
      },
      {
        field: 'booking_ruangan_nohp',
        headerName: 'No HP',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_direktorat',
        headerName: 'Direktorat',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_email',
        headerName: 'Email',
        width: 170,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_penaggung_jawab',
        headerName: 'Penanggung Jawab',
        width: 150,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_keterangan_kegiatan_acara',
        headerName: 'Keterangan Kegiatan Acara',
        width: 320,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruang_rapat_hadir_oleh',
        headerName: 'Rapat yang Hadir',
        width: 130,
      },

      {
        field: 'booking_ruangan_ruangan',
        headerName: 'Ruangan',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_waktu_penggunaan_awal',
        headerName: 'Waktu Mulai',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'booking_ruangan_waktu_penggunaan_akhir',
        headerName: 'Waktu Selesai',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas',
        headerName: 'Surat Dinas',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Button
              onClick={() => this.handleImageTable(params)}
              variant='outline-primary'
            >
              View{' '}
            </Button>
          );
        },
      },
      {
        field: 'status_booking_ruangan',
        headerName: 'Status',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          );
        },
      },
    ];
    return (
      <>
        <NavBar isAdminPage={false} />

        <Container>
          <div>
            <Row>
              {data.user_role === 'admin' ? (
                <Col>
                  <h2 className='mt-5 mb-3'>DATA LAPORAN</h2>
                </Col>
              ) : (
                <Col>
                  <h2 className='mt-5 mb-3'>Riwayat Booking</h2>
                </Col>
              )}

              <Col lg={3} className='mt-5 mb-3'>
                <Form className={styles.searchInput}>
                  <Form.Group>
                    {data.user_role === 'admin' ? (
                      <Form.Control
                        type='text'
                        placeholder='Cari Nama Unit Kerja...'
                        name='search'
                        onChange={(event) => this.changeText(event)}
                      />
                    ) : (
                      ''
                    )}
                  </Form.Group>
                </Form>
              </Col>
              {/* <Col xs={1}><Button onClick={() => this.handleTanggal()}><DateRangeIcon /></Button></Col> */}
            </Row>

            {data.user_role === 'admin' ? (
              <Row>
                <Col sm={2}>
                  <Button
                    variant='danger'
                    onClick={() => this.handleOpenVierifDeleteAll()}
                  >
                    Hapus All Data
                  </Button>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </div>
          {/* <Button onClick={() => this.setSmShow()} className="me-2">Input Data Laporan</Button> */}
          {/* <div style={{ height: 740, width: '100%' }}>
            <DataGrid
              rows={laporanruangann}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 15, 25]}
              getRowHeight={() => 100}
            />
          </div> */}
          <div className='mt-5'>
            <Table striped bordered hover responsive>
              <thead className='text-center'>
                <tr className={styles.witdthKolom}>
                  <th>No</th>
                  <th>Nama tol</th>
                  <th>NIP</th>
                  <th>Unit Kerja</th>
                  <th>Tanggal Mulai</th>
                  <th>No HP</th>
                  <th>Direktorat</th>
                  <th>Email</th>
                  <th>Penanggung Jawab</th>
                  <th>
                    <div style={{ 'padding-left': 150, 'padding-right': 150 }}>
                      Keterangan Kegiatan Acara
                    </div>
                  </th>
                  <th>Rapat yang Hadir</th>
                  <th>Ruang Rapat</th>
                  <th>Waktu Mulai</th>
                  <th>Waktu Selesai</th>
                  <th>Surat Dinas</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {laporanruangann.map((item, index) => {
                console.log('Data laporanruangann', laporanruangann);
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.booking_ruangan_nama}</td>
                      <td>{item.booking_ruangan_nip}</td>
                      <td>{item.booking_ruangan_unitkerja}</td>
                      <td>
                        {new Date(
                          parseInt(item.booking_ruangan_tanggal)
                        ).toLocaleDateString('en-CA')}
                      </td>
                      <td>{item.booking_ruangan_nohp}</td>
                      <td>{item.booking_ruangan_direktorat}</td>
                      <td>{item.booking_ruangan_email}</td>
                      <td>{item.booking_ruangan_penaggung_jawab}</td>
                      <td>{item.booking_ruangan_keterangan_kegiatan_acara}</td>
                      <td>{item.booking_ruang_rapat_hadir_oleh}</td>
                      <td>{item.booking_ruangan_ruangan}</td>
                      <td>{item.booking_ruangan_waktu_penggunaan_awal} WIB</td>
                      <td>{item.booking_ruangan_waktu_penggunaan_akhir} WIB</td>
                      <td>
                        <a
                          target='_blank'
                          href={`https://devruangrapatp2p.kemkes.go.id/backend1/api/${item.booking_ruangan_surat_dinas}`}
                          // href={`http://localhost:3001/backend1/api/${item.booking_ruangan_surat_dinas}`}
                        >
                          <Button variant='outline-primary'>View</Button>
                        </a>
                      </td>
                      <td>{item.status_booking_ruangan}</td>
                      <td>
                        {' '}
                        <Button
                          onClick={() => this.handleShowConfirmDelete(item)}
                          variant='warning'
                        >
                          {IconDelete}
                          {/* <EditIcon /> */}
                        </Button>
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
            show={photoShow}
            onHide={() => this.modalClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-sm'>
                Photo Surat Dinas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                src={`https://devruangrapatp2p.kemkes.go.id/backend1/api/${photoSuratDinas}`}
                // src={`http://localhost:3001/backend1/api/${photoSuratDinas}`}
                fluid
              />
            </Modal.Body>
          </Modal>
          <Modal
            size='xl'
            centered
            show={modalTanggal}
            onHide={() => this.modalClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-sm'>
                Filter Date
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <TextField
                    required
                    fullWidth
                    id='outlined-password-input'
                    label='From Date'
                    type='date'
                    // defaultValue="05/04/2022"
                    name='FromDate'
                    value={FromDate}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col>
                  <TextField
                    required
                    fullWidth
                    id='outlined-password-input'
                    label='To Date'
                    type='date'
                    defaultValue='05/04/2022'
                    name='ToDate'
                    value={ToDate}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
                <Col lg={3}>
                  <TextField
                    fullWidth
                    id='outlined-password-input'
                    label='Search Unit Kerja'
                    type='text'
                    name='searchtanggal'
                    value={searchtanggal}
                    onChange={(event) => this.changeTextForm(event)}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Row>
                <Col>
                  <Button
                    className={`${styles.btReset} mb-2`}
                    onClick={() => this.modalClose()}
                    variant='outline-primary'
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    className={styles.btSubmit}
                    variant='primary'
                    onClick={() => this.sendData()}
                  >
                    {/* {isUpdate ? "Update" : "Submit"} */}
                    search
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal>

          {/* modal Verif delete all */}
          <Modal
            size='sm'
            show={showVerifDeleteAll}
            onHide={this.handleCloseVierifDeleteAll}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h6>Apakah Anda yakin ingin menghapus semua data file ?</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Button
                    variant='danger'
                    onClick={() => this.deleteDataLaporanAktivitasAll()}
                  >
                    Iya
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => this.handleCloseVierifDeleteAll()}>
                    Tidak
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          {/* akhir modal Verif delete all */}

          <Modal
            // size="xl"
            centered
            show={showwHandleDelete}
            onHide={() => this.handleCloseVierifDeleteAll()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>Apakah Anda Yakin Dihapus ?</Modal.Header>
            <Modal.Body>
              <Button
                variant='primary'
                onClick={() => this.deleteData(idDelete)}
              >
                Iya
              </Button>{' '}
              <Button
                variant='danger'
                onClick={() => this.handleCloseVierifDeleteAll()}
              >
                Tidak
              </Button>
            </Modal.Body>
          </Modal>

          <Modal
            centered
            show={showModalSucces}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>{modalMsg}</Modal.Body>
          </Modal>
          <Footer />
        </Container>
      </>
    );
  }
}
const mapDispatchToProps = {
  getlaporanRuanganAll,
  getLaporanUser,
  getlaporanRuanganAllTanpaFill,
  getlaporanRuanganTanggal,
  deleteLaporanAktivitasAll,
  deleteLaporanAktivitasById,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  laporanruangan: state.laporanruangan,
  laporanUser: state,
  auth: state.auth,
  coba: state,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
