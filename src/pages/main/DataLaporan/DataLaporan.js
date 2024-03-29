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
} from 'react-bootstrap';
import styles from './DataLaporan.module.css';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getlaporanRuanganAll,
  getlaporanRuanganAllTanpaFill,
  getlaporanRuanganTanggal,
  deleteLaporanAktivitasAll,
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
    this.setState({
      photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
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
      // idDelete: ""
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
  render() {
    const { FromDate, ToDate, searchtanggal } = this.state.form;
    const { photoShow, modalTanggal, photoSuratDinas, showVerifDeleteAll } =
      this.state;
    const { laporanruangann } = this.props.laporanruangan;
    const { data } = this.props.auth;
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
          <div style={{ height: 740, width: '100%' }}>
            <DataGrid
              rows={laporanruangann}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 15, 25]}
              getRowHeight={() => 100}
            />
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
