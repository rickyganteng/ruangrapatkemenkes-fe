import React, { Component } from "react";
// import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import axiosApiIntances from "../../../utils/axios";
import { Button, Image, Container, Row, Col, Modal } from "react-bootstrap";
import styles from "./DataFilterLaporan.module.css";
import { connect } from "react-redux";
import moment from "moment";
import { getlaporanRuanganAll, getlaporanRuanganAllTanpaFill, getlaporanRuanganTanggal } from "../../../redux/action/laporanRuangan"
import { getLaporanUser } from "../../../redux/action/user"
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import ModalPDF from "../../../components/modalPDF";
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Footer from "../../../components/Footer/Footer";
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableToDate: true,
      dropDownVal: "Sort By",
      sortBy: "id DESC",
      search: "%%",
      resulttttt: "",
      resultttttToDate: "",
      result2: "",
      result1: "",
      searchtanggal: "%%",
      FromDate: "",
      ToDate: "",
      photoShow: false,
      modalPdf: false,
      modalTanggal: false,
      selectedFilter: [],
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      foo: [],
      namaUnitKerja: {
        'Sekertariat P2P': [
          "Tu. Dirjen",
          "Tu.sesditjen",
          "Subag Adum Sekertariat P2P",
          "Program dan Informasi",
          "Hukum, Organisasi dan Hubungan Masyarakat",
          "Keuangan dan BMN",
          "Kepegawaian dan Umum",
          "Projek Management Office (PMO)"],
        'P2PM': [
          "Subag Adum P2PM",
          "Turbeckulosis dan infeksisaluran pernapasan akut (ISPA)",
          "HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan (PISP)",
          "Neglected Disease (Penyakit Tropis Terabaikan)",
          "Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun",
          "Penyakit Tular Vektor"],
        'Pengelolaan  Imunisasi': [
          "Subag Adum Pengelolaan Imunisasi",
          "Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)",
          "Imunisasi Tambahan Dan Khusus",
          "Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI)",
          "Imunisasi Usia Sekolah dan Sumber Daya Imunisasi"
        ],
        'P2PTM': [
          "Subag Adum P2PTM",
          "Gangguan Indra Dan Funsional",
          "Diabetes Melitus dan Gangguan Metabolik",
          "Jantung Dan Pembulu Darah",
          "Kangker dan Kelainan Darah",
          "Paru Kronik dan Gangguan Imunologi"
        ],
        'Penyehatan Lingkungan (PL)': [
          "Subag Adum  PL",
          "Penyehatan Air dan Sanitasi Dasar",
          "Penyehatan Pangan",
          "Penyehatan Udara,Tanah dan Kawasan",
          "Pengamanan Limbah dan Radiasi",
          "Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan"
        ],
        'SUKARKES': [
          "Subag Adum SUKARKES",
          "Kekarantinaan Kesehatan",
          "Pengelolaan Laboratorium Kesehatan Masyarakat",
          "Pengendalian Vektor",
          "Penyakit Infeksi Emerging",
          "Surveilans"
        ]
      },
      direktoratt: ["Sekertariat P2P", "P2PM", "Pengelolaan  Imunisasi", "P2PTM", "Penyehatan Lingkungan (PL)", "SUKARKES"],
      direktorat: ["Tu. Dirjen",
        "Tu.sesditjen",
        "Subag Adum Sekertariat P2P",
        "Program dan Informasi",
        "Hukum, Organisasi dan Hubungan Masyarakat",
        "Keuangan dan BMN",
        "Kepegawaian dan Umum",
        "Subag Adum P2PM",
        "Turbeckulosis dan infeksisaluran pernapasan akut (ISPA)",
        "HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan (PISP)",
        "Neglected Disease (Penyakit Tropis Terabaikan)",
        "Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun",
        "Penyakit Tular Vektor",
        "Subag Adum Pengelolaan Imunisasi",
        "Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)",
        "Imunisasi Tambahan Dan Khusus",
        "Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI)",
        "Imunisasi Usia Sekolah dan Sumber Daya Imunisasi",
        "Subag Adum P2PTM",
        "Gangguan Indra Dan Funsional",
        "Diabetes Melitus dan Gangguan Metabolik",
        "Jantung Dan Pembulu Darah",
        "Kangker dan Kelainan Darah",
        "Paru Kronik dan Gangguan Imunologi",
        "Subag Adum  PL",
        "Penyehatan Air dan Sanitasi Dasar",
        "Penyehatan Pangan",
        "Penyehatan Udara,Tanah dan Kawasan",
        "Pengamanan Limbah dan Radiasi",
        "Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan", "Subag Adum SUKARKES",
        "Kekarantinaan Kesehatan",
        "Pengelolaan Laboratorium Kesehatan Masyarakat",
        "Pengendalian Vektor",
        "Penyakit Infeksi Emerging",
        "Surveilans"],
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
      page: 4,
      limit: 3,
      isShowView1: false,
      smShow: false,
      form: {
        siswaNama: "",
        siswaNISN: "",
        siswaKelas: "",
        siswaTempatLahir: "",
        siswaTglLahir: "",
        siswaNamaAyah: "",
        siswaNamaIbu: "",
        siswaAlamat: "",
        ruangDirektorat: "",

      }
    };

  }

  componentDidMount() {

    this.getData2();
    this.getData3();
    this.getData4();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchtanggal !== this.state.searchtanggal ||
      prevState.FromDate !== this.state.FromDate ||
      prevState.ToDate !== this.state.ToDate
    ) {
      this.setState({ page: 1 }, () => {
        this.getData2();
      });
    }

    if (
      prevState.searchtanggal !== this.state.searchtanggal ||
      prevState.FromDate !== this.state.FromDate ||
      prevState.ToDate !== this.state.ToDate
    ) {
      this.props.history.push(
        `datafilterlaporan?FromDate=${this.state.result2}&searchtanggal=${this.state.searchtanggal}&ToDate=${this.state.result1}`
      );
    }
  }
  getData2 = () => {
    const { searchtanggal, result2, result1 } = this.state;
    this.props.getlaporanRuanganTanggal(searchtanggal, result2, result1);
  };
  getData4 = () => {
    const { sortBy, search } = this.state;
    this.props.getlaporanRuanganAllTanpaFill(sortBy, search);
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
        movieReleaseDate: moment(data.movie_release_date).format("YYYY-MM-DD"),
        movieDuration: data.movie_duration,
        movieDirectedBy: data.movie_directed_by,
        movieCasts: data.movie_casts,
        movieSynopsis: data.movie_synopsis,
        movieImage: `http://103.74.143.139:3002/backend1/api/${data.movie_image}`,
        image: null,
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
      smShow: false,
      photoShow: false,
      modalTanggal: false,
      modalPdf: false,
    });
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };

  handleImageTable = (moon) => {
    this.setState({
      photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
      photoShow: true
    });
  };

  handleModalPdf = () => {
    this.setState({
      modalPdf: true
    })
  }
  handleTanggal = () => {
    this.setState({
      modalTanggal: true
    });
  };

  handleChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      selectedFilter: typeof value === 'string' ? value.split(',') : value
    })
  };

  changeTextForm = (event) => {
    if (event.target.name === "FromDate") {
      const d2 = new Date(event.target.value);
      this.setState({
        disableToDate: false,
        result2: d2.getTime()
      })

    }
    if (event.target.name === "ToDate") {
      const d1 = new Date(event.target.value);
      this.setState({
        result1: d1.getTime()
      })

    }
    this.setState({
      [event.target.name]: event.target.value,
      resulttttt: this.state.result2,
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });

  };

  changeTextFormDirektorat = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
      selectedFilter: [],
      foo: this.state.namaUnitKerja[event.target.value]
    });
  };


  handleClearFilter = () => {
    this.props.history.push(`/bookingruangrapat/datafilterlaporan`);
    this.setState({
      result1: "",
      result2: "",
      dataLaporanTanggal: [],
      selectedFilter: [],
      ToDate: "",
      FromDate: "",
      form: {
        ruangDirektorat: ""
      }
    })
    this.setState({}, () => {
      this.getData2();
    });
  }
  render() {
    const {
      ruangDirektorat
    } = this.state.form;
    const { photoShow, photoSuratDinas, FromDate, ToDate, modalPdf, selectedFilter, foo, disableToDate } = this.state;
    const { laporantanggal } = this.props.laporanruangan;
    let dataLaporanTanggal = []
    dataLaporanTanggal = laporantanggal
    const arraykosongfilter = [];

    const arraydirektorat = dataLaporanTanggal.filter(function (heroo) {
      return heroo.booking_ruangan_direktorat === ruangDirektorat
    })
    for (let index = 0; index < selectedFilter.length; index++) {
      const marvelHeroes = dataLaporanTanggal.filter(function (hero) {
        return hero.booking_ruangan_unitkerja === selectedFilter[index]
      }
      )
      arraykosongfilter.push(marvelHeroes)

    };
    let element = []
    for (let index = 0; index < arraykosongfilter.length; index++) {
      element = element.concat(arraykosongfilter[index]);

    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const columns = [
      { field: 'booking_ruangan_nama', headerName: 'Nama', width: 180 },
      { field: 'booking_ruangan_nip', headerName: 'NIP', width: 130 },
      {
        field: 'booking_ruangan_unitkerja', headerName: 'Unit Kerja', width: 205, renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div>{params.value}</div>
            </Tooltip>
          )
        }
      },
      {
        field: 'booking_ruangan_keterangan_kegiatan_acara', headerName: 'Keterangan Kegiatan Acara', width: 320, renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div className={styles.wraptext}>{params.value}</div>
            </Tooltip>
          )
        }
      },
      { field: 'booking_ruang_rapat_hadir_oleh', headerName: 'Rapat yang Hadir', width: 130 },
      { field: 'booking_ruangan_ruangan', headerName: 'Ruang Rapat', width: 150 },
      {
        field: 'booking_ruangan_tanggal', headerName: 'Tanggal Mulai', width: 130, renderCell: (params) => {
          var confdate = new Date(parseInt(params.row.booking_ruangan_tanggal)).toLocaleDateString("en-CA");
          return (
            <div
              className={` mt-0  mx-auto`}

            >{confdate}</div>
          )
        }
      },
      { field: 'booking_ruangan_waktu_penggunaan_awal', headerName: 'Waktu Mulai', width: 130 },
      { field: 'booking_ruangan_waktu_penggunaan_akhir', headerName: 'Waktu Selesai', width: 130 },
      { field: 'booking_ruangan_nohp', headerName: 'No HP', width: 130 },
      {
        field: 'booking_ruangan_direktorat', headerName: 'Direktorat', width: 130, renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div>{params.value}</div>
            </Tooltip>
          )
        }
      },
      { field: 'booking_ruangan_email', headerName: 'Email', width: 170 },
      { field: 'booking_ruangan_penaggung_jawab', headerName: 'Penanggung Jawab', width: 150 },

      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Surat Dinas', width: 130, renderCell: (params) => {
          return (
            // you will find row info in params
            <Button onClick={() => this.handleImageTable(params)} variant="outline-primary">View Photo</Button>

          )
        }
      },
      { field: 'status_booking_ruangan', headerName: 'Status', width: 90 },

    ];
    const splicetabel = []
    for (let index = 0; index < columns.length; index++) {
      if (columns[index].headerName === "Nama" || columns[index].headerName === "Unit Kerja" || columns[index].headerName === "Keterangan Kegiatan Acara" || columns[index].headerName === "Ruangan" || columns[index].headerName === "Tanggal Mulai" || columns[index].headerName === "Email" || columns[index].headerName === "Status") {
        splicetabel.push(columns[index])
      }
    }

    const arraykosong = [];
    for (let index = 0; index < laporantanggal.length; index++) {
      const dataUnit = laporantanggal[index].booking_ruangan_unitkerja;
      arraykosong.push(dataUnit);

    }

    const arrayTuDirjen = [];
    const arrayTuSesDitJen = [];
    const arraySubagAdum = [];
    const arrayProgramdanInforma = [];
    const arrayHukum = [];
    const arrayKeuangandanBMN = [];
    const arrayKepegdanUmum = [];
    const arraySubagAdumP2PM = [];
    const arrayISPA = [];
    const arrayHIVPIMS = [];
    const arrayZoonosis = [];
    const arrayPenyakitTular = [];
    const arraySubagAdumPengelolaan = [];
    const arrayImunisasiBaduta = [];
    const arrayImunisasiTambahan = [];
    const arrayImunisasiWanitaUsiaSubur = [];
    const arrayImunisasiUsiaSekolah = [];
    const arraySubagAdump2ptm = [];
    const arrayGangguanIndra = [];
    const arrayDiabetesMilitus = [];
    const arrayJantungdanPembuludarah = [];
    const arrayKangerdanKelainanDarah = [];
    const arrayParuKroni = [];
    const arraySubagAdumPL = [];
    const arrayPenyehatanAir = [];
    const arrayPenyehatanPangan = [];
    const arrayPenyehatanUdara = [];
    const arrayPengamananLimbah = [];
    const arrayAdaptasiPerubahan = [];
    const arraySubagAdumSuarkes = [];
    const arrayKekarantinaankesehatan = [];
    const arrayPengelolaanLaboratorium = [];
    const arrayPengendalianVetor = [];
    const arrayPenyakitInfeksi = [];
    const arraySurveilans = [];
    const arrayNeglected = [];
    for (let index = 0; index < arraykosong.length; index++) {
      // const element = array[index];
      if (arraykosong[index] === "Tu. Dirjen") {
        arrayTuDirjen.push(index)
      }
      else if (arraykosong[index] === "Tu.sesditjen") {
        arrayTuSesDitJen.push(index)
      }
      else if (arraykosong[index] === "Subag Adum Sekertariat P2P") {
        arraySubagAdum.push(index)
      }
      else if (arraykosong[index] === "Program dan Informa") {
        arrayProgramdanInforma.push(index)
      }
      else if (arraykosong[index] === "Hukum, Organisasi dan Hubungan Masyarakat") {
        arrayHukum.push(index)
      }
      else if (arraykosong[index] === "Keuangan dan BMN") {
        arrayKeuangandanBMN.push(index)
      }
      else if (arraykosong[index] === "Kepegawaian dan Umum") {
        arrayKepegdanUmum.push(index)
      }
      else if (arraykosong[index] === "Subag Adum P2PM") {
        arraySubagAdumP2PM.push(index)
      }
      else if (arraykosong[index] === "Turbeckulosis dan infeksisaluran pernapasan akut (ISPA") {
        arrayISPA.push(index)
      }
      else if (arraykosong[index] === "HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan Penyakit saluran Infeksi Pernapasa (PISP)") {
        arrayHIVPIMS.push(index)
      }
      else if (arraykosong[index] === "Neglected Disease (Penyakit Tropis Terabaikan)") {
        arrayNeglected.push(index)
      }
      else if (arraykosong[index] === "Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun") {
        arrayZoonosis.push(index)
      }
      else if (arraykosong[index] === "Penyakit Tular Vektor") {
        arrayPenyakitTular.push(index)
      }
      else if (arraykosong[index] === "Subag Adum Pengelolaan Imunisasi") {
        arraySubagAdumPengelolaan.push(index)
      }
      else if (arraykosong[index] === "Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)") {
        arrayImunisasiBaduta.push(index)
      }
      else if (arraykosong[index] === "Imunisasi Tambahan Dan Khusus") {
        arrayImunisasiTambahan.push(index)
      }
      else if (arraykosong[index] === "Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI)") {
        arrayImunisasiWanitaUsiaSubur.push(index)
      }
      else if (arraykosong[index] === "Imunisasi Usia Sekolah dan Sumber Daya Imunisasi") {
        arrayImunisasiUsiaSekolah.push(index)
      }
      else if (arraykosong[index] === "Subag Adum P2PTM") {
        arraySubagAdump2ptm.push(index)
      }
      else if (arraykosong[index] === "Gangguan Indra Dan Funsional") {
        arrayGangguanIndra.push(index)
      }
      else if (arraykosong[index] === "Diabetes Melitus dan Gangguan Metabolik") {
        arrayDiabetesMilitus.push(index)
      }
      else if (arraykosong[index] === "Jantung Dan Pembulu Darah") {
        arrayJantungdanPembuludarah.push(index)
      }
      else if (arraykosong[index] === "Kangker dan Kelainan Darah") {
        arrayKangerdanKelainanDarah.push(index)
      }
      else if (arraykosong[index] === "Paru Kronik dan Gangguan Imunologi") {
        arrayParuKroni.push(index)
      }
      else if (arraykosong[index] === "Subag Adum  PL") {
        arraySubagAdumPL.push(index)
      }
      else if (arraykosong[index] === "Penyehatan Air dan Sanitasi Dasar") {
        arrayPenyehatanAir.push(index)
      }
      else if (arraykosong[index] === "Penyehatan Pangan") {
        arrayPenyehatanPangan.push(index)
      }
      else if (arraykosong[index] === "Penyehatan Udara,Tanah dan Kawasan") {
        arrayPenyehatanUdara.push(index)
      }
      else if (arraykosong[index] === "Pengamanan Limbah dan Radiasi") {
        arrayPengamananLimbah.push(index)
      }
      else if (arraykosong[index] === "Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan") {
        arrayAdaptasiPerubahan.push(index)
      }
      else if (arraykosong[index] === "Subag Adum SUKARKES") {
        arraySubagAdumSuarkes.push(index)
      }
      else if (arraykosong[index] === "Kekarantinaan Kesehatan") {
        arrayKekarantinaankesehatan.push(index)
      }
      else if (arraykosong[index] === "Pengelolaan Laboratorium Kesehatan Masyarakat") {
        arrayPengelolaanLaboratorium.push(index)
      }
      else if (arraykosong[index] === "Pengendalian Vektor") {
        arrayPengendalianVetor.push(index)
      }
      else if (arraykosong[index] === "Penyakit Infeksi Emerging") {
        arrayPenyakitInfeksi.push(index)
      }
      else if (arraykosong[index] === "Surveilans") {
        arraySurveilans.push(index)
      }
    }


    return (
      <>

        <NavBar isAdminPage={false} />

        <Container>

          <Row>
            <Col>
              <h2
                className="mt-5 mb-3">DATA LAPORAN</h2 >

            </Col>


          </Row>
          {/* <Button onClick={() => this.setSmShow()} className="me-2">Input Data Laporan</Button> */}
          <Row className="mt-3 mb-3">
            <Col>

              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                required
                fullWidth
                id="outlined-size-small"
                label="From Date"
                type="date"
                // defaultValue="05/04/2022"
                name="FromDate"
                value={FromDate}
                onChange={(event) => this.changeTextForm(event)}
              />
            </Col>
            <Col>

              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={disableToDate}
                size="small"
                required
                fullWidth
                id="outlined-password-input"
                label="To Date"
                type="date"
                defaultValue="05/04/2022"
                name="ToDate"
                value={ToDate}
                onChange={(event) => this.changeTextForm(event)}
              />
            </Col>
            <Col lg={3}>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select"
                value={ruangDirektorat}
                name="ruangDirektorat"
                onChange={(event) => this.changeTextFormDirektorat(event)}
              >
                {this.state.direktoratt.length > 0 ? (
                  this.state.direktoratt.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>{item}</MenuItem>
                    );
                  })
                ) : (
                  <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                )}
              </Select>

              {/* <Form className={styles.searchInput}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Cari Nama Unit kerja"
                    name="searchtanggal"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Form> */}
            </Col>
            <Col>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedFilter}
                onChange={(event) => this.handleChange(event)}
                input={<OutlinedInput label="Tag" />}
                size="small"
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {foo.map((name) => {
                  return (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedFilter.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  )
                })}
              </Select>
            </Col>
            <Col>
              <Button onClick={() => this.handleClearFilter()}>
                Clear Filter
              </Button>
            </Col>
          </Row>
          <Box >
            {/* sx={{ height: 900, width: '100%' }} */}
            {(dataLaporanTanggal.length > 0 && ruangDirektorat.length > 0) ? (selectedFilter.length > 0 ? (
              <DataGrid
                autoHeight
                rows={element}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowHeight={() => 100}
              />) : (
              <DataGrid

                autoHeight
                rows={arraydirektorat}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowHeight={() => 100}
              />
            )) : (
              <DataGrid

                autoHeight
                rows={dataLaporanTanggal}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowHeight={() => 100}
              />
            )}

          </Box>

          <div className="mt-5 mb-5">

            {ruangDirektorat === "Sekertariat P2P" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Tu. Dirjen :
                    </Col>
                    <Col>
                      {arrayTuDirjen.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Tu.sesditjen :
                    </Col>
                    <Col>
                      {arrayTuSesDitJen.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum Sekertariat P2P :
                    </Col>
                    <Col>
                      {arraySubagAdum.length}
                    </Col>
                  </Row>
                  < Row >
                    <Col>
                      Total Unit kerja Program dan Informasi :
                    </Col>
                    <Col>
                      {arrayProgramdanInforma.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Hukum, Organisasi dan Hubungan Masyarakat :
                    </Col>
                    <Col>
                      {arrayHukum.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Keuangan dan BMN :
                    </Col>
                    <Col>
                      {arrayKeuangandanBMN.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Kepegawaian dan Umum :
                    </Col>
                    <Col>
                      {arrayKepegdanUmum.length}
                    </Col>
                  </Row>
                </div>) : ("")}

            {/* ==||== */}
            {ruangDirektorat === "P2PM" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum P2PM :
                    </Col>
                    <Col>
                      {arraySubagAdumP2PM.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Turbeckulosis dan infeksisaluran pernapasan akut (ISPA) :
                    </Col>
                    <Col>
                      {arrayISPA.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan (PISP) :
                    </Col>
                    <Col>
                      {arrayHIVPIMS.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Neglected Disease (Penyakit Tropis Terabaikan) :
                    </Col>
                    <Col>
                      {arrayNeglected.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun :
                    </Col>
                    <Col>
                      {arrayZoonosis.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Penyakit Tular Vektor :
                    </Col>
                    <Col>
                      {arrayPenyakitTular.length}
                    </Col>
                  </Row>

                </div>) : ("")}

            {/* ==||== */}
            {ruangDirektorat === "Pengelolaan  Imunisasi" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum Pengelolaan Imunisasi :
                    </Col>
                    <Col>
                      {arraySubagAdumPengelolaan.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta) :
                    </Col>
                    <Col>
                      {arrayImunisasiBaduta.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Imunisasi Tambahan Dan Khusus :
                    </Col>
                    <Col>
                      {arrayImunisasiTambahan.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI) :
                    </Col>
                    <Col>
                      {arrayImunisasiWanitaUsiaSubur.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Imunisasi Usia Sekolah dan Sumber Daya Imunisasi :
                    </Col>
                    <Col>
                      {arrayImunisasiUsiaSekolah.length}
                    </Col>
                  </Row>

                </div>) : ("")}

            {/* ==||== */}
            {ruangDirektorat === "P2PTM" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum P2PTM :
                    </Col>
                    <Col>
                      {arraySubagAdump2ptm.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Gangguan Indra Dan Funsional :
                    </Col>
                    <Col>
                      {arrayGangguanIndra.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Diabetes Melitus dan Gangguan Metabolik :
                    </Col>
                    <Col>
                      {arrayDiabetesMilitus.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Jantung Dan Pembulu Darah :
                    </Col>
                    <Col>
                      {arrayJantungdanPembuludarah.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Kangker dan Kelainan Darah :
                    </Col>
                    <Col>
                      {arrayKangerdanKelainanDarah.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Paru Kronik dan Gangguan Imunologi :
                    </Col>
                    <Col>
                      {arrayParuKroni.length}
                    </Col>
                  </Row>
                </div>) : ("")}

            {/* ==||== */}
            {ruangDirektorat === "Penyehatan Lingkungan (PL)" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum  PL :
                    </Col>
                    <Col>
                      {arraySubagAdumPL.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Penyehatan Air dan Sanitasi Dasar :
                    </Col>
                    <Col>
                      {arrayPenyehatanAir.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Penyehatan Pangan :
                    </Col>
                    <Col>
                      {arrayPenyehatanPangan.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Penyehatan Udara,Tanah dan Kawasan :
                    </Col>
                    <Col>
                      {arrayPenyehatanUdara.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Pengamanan Limbah dan Radiasi :
                    </Col>
                    <Col>
                      {arrayPengamananLimbah.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan :
                    </Col>
                    <Col>
                      {arrayAdaptasiPerubahan.length}
                    </Col>
                  </Row>
                </div>) : ("")}


            {/* ==||== */}
            {ruangDirektorat === "SUKARKES" ?
              (
                <div>
                  <Row>
                    <Col>
                      Total Unit kerja Subag Adum SUKARKES :
                    </Col>
                    <Col>
                      {arraySubagAdumSuarkes.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Kekarantinaan Kesehatan :
                    </Col>
                    <Col>
                      {arrayKekarantinaankesehatan.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Pengelolaan Laboratorium Kesehatan Masyarakat :
                    </Col>
                    <Col>
                      {arrayPengelolaanLaboratorium.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Pengendalian Vektor :
                    </Col>
                    <Col>
                      {arrayPengendalianVetor.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Penyakit Infeksi Emerging :
                    </Col>
                    <Col>
                      {arrayPenyakitInfeksi.length}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      Total Unit kerja Surveilans :
                    </Col>
                    <Col>
                      {arraySurveilans.length}
                    </Col>
                  </Row>
                </div>) : ("")}

          </div>
          <div>
            <Row>
              <Col>
                Total Per Direktorat:
              </Col>
              <Col>
                {arraydirektorat.length}
              </Col>
            </Row>
          </div>
          <Button onClick={() => this.handleModalPdf()}> Print</Button>
          <ModalPDF
            selectedFilter={selectedFilter}
            FromDate={FromDate}
            ToDate={ToDate}
            show={modalPdf}
            closeModal={this.modalClose}
            element={element}
            arraydirektorat={arraydirektorat}
            dataLaporanTanggal={dataLaporanTanggal}
            columns={splicetabel}
            ruangDirektorat={ruangDirektorat}
            arrayTuDirjen={arrayTuDirjen}
            arrayTuSesDitJen={arrayTuSesDitJen}
            arraySubagAdum={arraySubagAdum}
            arrayProgramdanInforma={arrayProgramdanInforma}
            arrayHukum={arrayHukum}
            arrayKeuangandanBMN={arrayKeuangandanBMN}
            arrayKepegdanUmum={arrayKepegdanUmum}
            arraySubagAdumP2PM={arraySubagAdumP2PM}
            arrayISPA={arrayISPA}
            arrayHIVPIMS={arrayHIVPIMS}
            arrayZoonosis={arrayZoonosis}
            arrayPenyakitTular={arrayPenyakitTular}
            arraySubagAdumPengelolaan={arraySubagAdumPengelolaan}
            arrayImunisasiBaduta={arrayImunisasiBaduta}
            arrayImunisasiTambahan={arrayImunisasiTambahan}
            arrayImunisasiWanitaUsiaSubur={arrayImunisasiWanitaUsiaSubur}
            arrayImunisasiUsiaSekolah={arrayImunisasiUsiaSekolah}
            arraySubagAdump2ptm={arraySubagAdump2ptm}
            arrayGangguanIndra={arrayGangguanIndra}
            arrayDiabetesMilitus={arrayDiabetesMilitus}
            arrayJantungdanPembuludarah={arrayJantungdanPembuludarah}
            arrayKangerdanKelainanDarah={arrayKangerdanKelainanDarah}
            arrayParuKroni={arrayParuKroni}
            arraySubagAdumPL={arraySubagAdumPL}
            arrayPenyehatanAir={arrayPenyehatanAir}
            arrayPenyehatanPangan={arrayPenyehatanPangan}
            arrayPenyehatanUdara={arrayPenyehatanUdara}
            arrayPengamananLimbah={arrayPengamananLimbah}
            arrayAdaptasiPerubahan={arrayAdaptasiPerubahan}
            arraySubagAdumSuarkes={arraySubagAdumSuarkes}
            arrayKekarantinaankesehatan={arrayKekarantinaankesehatan}
            arrayPengelolaanLaboratorium={arrayPengelolaanLaboratorium}
            arrayPengendalianVetor={arrayPengendalianVetor}
            arrayPenyakitInfeksi={arrayPenyakitInfeksi}
            arraySurveilans={arraySurveilans}
            arrayNeglected={arrayNeglected}
          />
          <Modal
            size="xl"
            centered
            show={photoShow}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Photo Surat Dinas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                src={`http://103.74.143.139:3002/backend1/api/${photoSuratDinas}`}
                fluid
              />
            </Modal.Body>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getlaporanRuanganAll, getLaporanUser, getlaporanRuanganAllTanpaFill, getlaporanRuanganTanggal };

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
