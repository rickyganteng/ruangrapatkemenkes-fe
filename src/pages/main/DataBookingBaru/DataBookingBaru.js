import React, { Component } from 'react';
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
  Dropdown,
  DropdownButton,
  Modal,
  Table,
} from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './DataBookingBaru.module.css';
import { connect } from 'react-redux';
import {
  deleteBookingRuangan,
  updateDataBooking,
  getbookingRuanganAllTanpaFill,
} from '../../../redux/action/bookingRuangan';
import { getPremiereAll } from '../../../redux/action/ruangan';
import {
  getlaporanRuanganAll,
  getlaporanRuanganAllTanpaFill,
} from '../../../redux/action/laporanRuangan';
import { getLaporanUser, getBookingUser } from '../../../redux/action/user';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

const inputOpenFileRef = React.createRef();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal: 'Sort By',
      dropDownValDirektorat: 'Select Direktorat',
      dropDownValUnitKerja: 'Select Unit Kerja',
      sortBy: 'id DESC',
      search: '%%',
      phoneNumberValid: 'valid',
      NIPValid: 'valid',
      EmailValid: 'valid',
      WaktuAkhirValid: 'valid',
      WaktuAwalValid: 'valid',
      msg: '',
      photoShow: false,
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      foo: '',
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
      direktorat: [
        {
          namaDirektorat: 'Sekertariat P2P',
          // namaUnitKerja: [
          //   'Tu. Dirjen',
          //   'Tu.sesditjen',
          //   'Subag Adum Sekertariat P2P',
          //   'Program dan Informasi',
          //   'Hukum, Organisasi dan Hubungan Masyarakat',
          //   'Keuangan dan BMN',
          //   'Kepegawaian dan Umum',
          // ],
        },
        {
          namaDirektorat: 'P2PM',
          // namaUnitKerja: [
          //   'Subag Adum P2PM',
          //   'Turbeckulosis dan infeksisaluran pernapasan akut (ISPA)',
          //   'HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan Penyakit saluran Infeksi Pernapasa (PISP)',
          //   'Neglected Disease (Penyakit Tropis Terabaikan)',
          //   'Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun',
          //   'Penyakit Tular Vektor',
          // ],
        },
        {
          namaDirektorat: 'Pengelolaan  Imunisasi',
          // namaUnitKerja: [
          //   'Subag Adum Pengelolaan Imunisasi',
          //   'Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)',
          //   'Imunisasi Tambahan Dan Khusus',
          //   'Imunisasi Wanita Usia Subur (WUS) dan Surveilan Penyakit yang Dapat Dicegah Dengan Imunisasi (PD31),(KIPI)',
          //   'Imunisasi Usia Sekolah dan Sumber Daya Imunisasi',
          // ],
        },
        {
          namaDirektorat: 'P2PTM',
          // namaUnitKerja: [
          //   'Subag Adum P2PTM',
          //   'Gangguan Indra Dan Funsional',
          //   'Diabetes Melitus dan Gangguan Metabolik',
          //   'Jantung Dan Pembulu Darah',
          //   'Kangker dan Kelainan Darah',
          //   'Paru Kronik dan Gangguan Imunologi',
          // ],
        },
        {
          namaDirektorat: 'Penyehatan Lingkungan (PL)',
          // namaUnitKerja: [
          //   'Subag Adum  PL',
          //   'Penyehatan Air dan Sanitasi Dasar',
          //   'Penyehatan Pangan',
          //   'Penyehatan Udara,Tanah dan Kawasan',
          //   'Pengamanan Limbah dan Radiasi',
          //   'Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan',
          // ],
        },
        {
          namaDirektorat: 'SUKARKES',
          // namaUnitKerja: [
          //   'Subag Adum SUKARKES',
          //   'Kekarantinaan Kesehatan',
          //   'Pengelolaan Laboratorium Kesehatan Masyarakat',
          //   'Pengendalian Vektor',
          //   'Penyakit Infeksi Emerging',
          //   'Surveilans',
          // ],
        },
      ],
      namaUnitKerja: {
        'Sekertariat P2P': [
          'Tu. Dirjen',
          'Tu.sesditjen',
          'Subag Adum Sekertariat P2P',
          'Program dan Informasi',
          'Hukum, Organisasi dan Hubungan Masyarakat',
          'Keuangan dan BMN',
          'Kepegawaian dan Umum',
          'Projek Management Office (PMO)',
        ],
        P2PM: [
          'Subag Adum P2PM',
          'Turbeckulosis dan infeksisaluran pernapasan akut (ISPA)',
          'HIV, Penyakit Infeksi Menular Seksual (PIMS), Hepatitis dan (PISP)',
          'Neglected Disease (Penyakit Tropis Terabaikan)',
          'Zoonosis dan Penyakit Akibat Gigitan Hewan Berbisa dan Tanaman Beracun',
          'Penyakit Tular Vektor',
        ],
        'Pengelolaan  Imunisasi': [
          'Subag Adum Pengelolaan Imunisasi',
          'Imunisasi Dasar dan Anak Usia di bawah dua tahun (Baduta)',
          'Imunisasi Tambahan Dan Khusus',
          'Imunisasi Wanita Usia Subur (WUS) dan (PD31),(KIPI)',
          'Imunisasi Usia Sekolah dan Sumber Daya Imunisasi',
        ],
        P2PTM: [
          'Subag Adum P2PTM',
          'Gangguan Indra Dan Funsional',
          'Diabetes Melitus dan Gangguan Metabolik',
          'Jantung Dan Pembulu Darah',
          'Kangker dan Kelainan Darah',
          'Paru Kronik dan Gangguan Imunologi',
        ],
        'Penyehatan Lingkungan (PL)': [
          'Subag Adum  PL',
          'Penyehatan Air dan Sanitasi Dasar',
          'Penyehatan Pangan',
          'Penyehatan Udara,Tanah dan Kawasan',
          'Pengamanan Limbah dan Radiasi',
          'Adaptasi Perubahan Iklim dan Kebencanaan Lingkungan',
        ],
        SUKARKES: [
          'Subag Adum SUKARKES',
          'Kekarantinaan Kesehatan',
          'Pengelolaan Laboratorium Kesehatan Masyarakat',
          'Pengendalian Vektor',
          'Penyakit Infeksi Emerging',
          'Surveilans',
        ],
      },
      pagination: {},
      page: 1,
      limit: 4,
      isShowView1: false,
      smShow: false,
      tanggal: new Date(),
      form: {
        ruangNamaPeminjam: '',
        ruangNIP: '',
        ruangNoHP: '',
        ruangEmail: '',
        ruangSatker: '',
        ruangDirektorat: [],
        ruangTanggalBooking: '',
        ruangKeteranganAcara: '',
        ruangPenanggungJawab: '',
        ruangYangDigunakan: '',
        ruangWaktuMulai: '',
        ruangWaktuAkhir: '',
        ruangRapatHadirOleh: '',
        ruangBuktiSuratDinas: null,
        image: null,
        idUserr: this.props.auth.data.id,

        laporanruangNamaPeminjam: '',
        laporanruangNIP: '',
        laporanruangNoHP: '',
        laporanruangEmail: '',
        laporanruangSatker: '',
        laporanruangDirektorat: '',
        laporanruangTanggalBooking: '',
        laporanruangKeteranganAcara: '',
        laporanruangRapatHadirOleh: '',
        laporanruangPenanggungJawab: '',
        laporanruangYangDigunakan: '',
        laporanruangWaktuMulai: '',
        laporanruangWaktuAkhir: '',
        laporanruangBuktiSuratDinas: null,
      },
    };
  }

  componentDidMount() {
    this.getData();
    this.getData2();
    this.getData3();
    if (this.props.auth.data.user_role === 'admin') {
      this.pushDataa = setInterval(() => this.pushData(), 10000);
    } else {
      this.pushDataa = setInterval(() => this.pushDataBasic(), 10000);
    }

    // this.timerID = setInterval(() => this.tick(), 10000);
  }

  // tick() {
  //   this.setState({
  //     tanggal: new Date(),
  //   });
  // }
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.pushDataa);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData2();
        this.getData3();
        this.getData();
      });
    }

    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.page !== this.state.page
    ) {
      this.props.history.push(
        `databooking?search=${this.state.search}&sortby=${this.state.sortBy}`
      );
    }
  }

  pushData = () => {
    const arraykosong = [];
    console.log('ini array kosong lo', this.props.bookingruangan.bismillah);

    Object.keys(this.props.bookingruangan.bismillah).forEach((key) => {
      const Tokenss = this.props.bookingruangan.bismillah[key];
      arraykosong.push(Tokenss);
    });
    if (arraykosong.length > 0) {
      for (let index = 0; index < arraykosong.length; index++) {
        var confdatee = new Date(
          parseInt(arraykosong[index].booking_ruangan_tanggal)
        ).toLocaleDateString('en-CA');
        if (confdatee <= this.state.tanggal.toLocaleDateString('en-CA')) {
          if (
            arraykosong[index].booking_ruangan_waktu_penggunaan_akhir <=
            this.state.tanggal.toLocaleTimeString('en-GB')
          ) {
            this.postcoba(arraykosong[index]);
          }
        }
      }
    } else {
      console.log('Data Booking Kosong');
    }
  };

  pushDataBasic = () => {
    const arraykosongId = [];

    Object.keys(this.props.idUser.dataBookingById).forEach((key) => {
      const Tokenss = this.props.idUser.dataBookingById[key];
      arraykosongId.push(Tokenss);
    });

    if (arraykosongId.length > 0) {
      for (let index = 0; index < arraykosongId.length; index++) {
        var confdatee = new Date(
          parseInt(arraykosongId[index].booking_ruangan_tanggal)
        ).toLocaleDateString('en-CA');
        if (
          arraykosongId[index].booking_ruangan_waktu_penggunaan_akhir <=
            this.state.tanggal.toLocaleTimeString('en-GB') &&
          confdatee <= this.state.tanggal.toLocaleDateString('en-CA')
        ) {
          this.postcoba(arraykosongId[index]);
        }
      }
    } else {
      console.log('Data Booking Kosong');
    }
  };

  postcoba = (e) => {
    const laporan = {
      laporanruangNamaPeminjam: e.booking_ruangan_nama,
      laporanruangNIP: e.booking_ruangan_nip,
      laporanruangNoHP: e.booking_ruangan_nohp,
      laporanruangEmail: e.booking_ruangan_email,
      laporanruangSatker: e.booking_ruangan_unitkerja,
      laporanruangDirektorat: e.booking_ruangan_direktorat,
      laporanruangTanggalBooking: e.booking_ruangan_tanggal,
      laporanruangKeteranganAcara: e.booking_ruangan_keterangan_kegiatan_acara,
      laporanruangRapatHadirOleh: e.booking_ruang_rapat_hadir_oleh,
      laporanruangPenanggungJawab: e.booking_ruangan_penaggung_jawab,
      laporanruangYangDigunakan: e.booking_ruangan_ruangan,
      laporanruangWaktuMulai: e.booking_ruangan_waktu_penggunaan_awal,
      laporanruangWaktuAkhir: e.booking_ruangan_waktu_penggunaan_akhir,
      laporanruangBuktiSuratDinas: e.booking_ruangan_surat_dinas,
      idUserr: e.id_peminjam,
      image: e.booking_ruangan_surat_dinas,
      statusBooking: 'Selesai',
      id: e.id,
    };
    axiosApiIntances
      .post('laporanruangan', laporan)
      .then((res) => {
        this.deleteDataBook(laporan.id);
        setTimeout(() => {
          this.props.history.push(`/bookingruangrapat/databooking`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getData2 = () => {
    const { page, limit, sortBy, search } = this.state;
    this.props.getBookingUser(
      this.state.form.idUserr,
      page,
      limit,
      sortBy,
      search
    );
  };
  getData3 = () => {
    const id = this.props.auth.data.id;
    this.props.getLaporanUser(id);
  };
  getData = () => {
    const { sortBy, search } = this.state;

    this.props.getbookingRuanganAllTanpaFill(sortBy, search);
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
  handlePageClick2 = (event) => {
    const selectedPage1 = event.selected + 1;
    this.setState({ page: selectedPage1 }, () => {
      this.getData();
      this.getData2();
      this.getData3();
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
    });
  };
  deleteData = (id) => {
    this.props
      .deleteMovie(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: 'Movie Deleted !',
            show: true,
          },
          () => {
            this.getData2();
            this.getData3();
            this.getData();
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
          this.setState({ show: false });
        }, 1000);
      });
  };

  handleImageTable = (moon) => {
    console.log('handle image', moon);
    this.setState({
      photoSuratDinas: moon,
      photoShow: true,
    });
  };
  changeImage = (event) => {
    if (event.target.files[0]) {
      this.setState({
        form: {
          ...this.state.form,
          ruangBuktiSuratDinas: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        },
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          ruangBuktiSuratDinas: null,
          image: null,
        },
      });
    }
  };
  changeTextForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'ruangNoHP') {
      /^[0-9]+$/.test(value) && value.length <= 12
        ? this.setState({ phoneNumberValid: 'valid' })
        : this.setState({
            phoneNumberValid: 'Invalid',
            msg: 'Masukkan nomor tidak lebih dari 12 angka',
          });
    } else if (name === 'ruangNIP') {
      /^[0-9]+$/.test(value)
        ? this.setState({ NIPValid: 'valid' })
        : this.setState({
            NIPValid: 'Invalid',
            msg: 'Masukkan nomor NIP dengan angka',
          });
    } else if (name === 'ruangEmail') {
      /* eslint-disable no-useless-escape */
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? this.setState({ EmailValid: 'valid' })
        : this.setState({
            EmailValid: 'Invalid',
            msg: 'Masukkan email dengan benar',
          });
    } else if (name === 'ruangWaktuAkhir') {
      this.state.form.ruangWaktuMulai < value
        ? this.setState({ WaktuAkhirValid: 'valid' })
        : this.setState({
            WaktuAkhirValid: 'Invalid',
            msg: 'Masukkan Waktu lebih dari Waktu Mulai',
          });
    }
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };
  postBookingData = (data) => {
    axiosApiIntances
      .post('laporanruangan', data)
      .then((res) => {
        this.deleteDataBook(data.id);
        setTimeout(() => {
          this.props.history.push(`/bookingruangrapat/databooking`);
        }, 10000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteDataBook = (id) => {
    this.props
      .deleteBookingRuangan(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: 'Booking Ruangan Deleted !',
            show: true,
          },
          () => {
            this.getData2();
            this.getData3();
            this.getData();
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
          this.setState({ show: false });
        }, 1000);
      });
  };

  setUpdate = (data) => {
    console.log('data', data);
    this.setState({
      smShow: true,
      isUpdate: true,
      id: data.id,
      dropDownValUnitKerja: data.booking_ruangan_unitkerja,
      dropDownValDirektorat: data.booking_ruangan_direktorat,
      form: {
        ruangNamaPeminjam: data.booking_ruangan_nama,
        ruangNIP: data.booking_ruangan_nip,
        ruangNoHP: data.booking_ruangan_nohp,
        ruangEmail: data.booking_ruangan_email,
        ruangSatker: data.booking_ruangan_unitkerja,
        ruangDirektorat: data.booking_ruangan_direktorat,
        ruangTanggalBooking: new Date(
          parseInt(data.booking_ruangan_tanggal)
        ).toLocaleDateString('en-CA'),
        ruangKeteranganAcara: data.booking_ruangan_keterangan_kegiatan_acara,
        ruangPenanggungJawab: data.booking_ruangan_penaggung_jawab,
        ruangYangDigunakan: data.booking_ruangan_ruangan,
        idUserr: data.id_peminjam,
        ruangRapatHadirOleh: data.booking_ruang_rapat_hadir_oleh,
        ruangWaktuMulai: data.booking_ruangan_waktu_penggunaan_awal,
        ruangWaktuAkhir: data.booking_ruangan_waktu_penggunaan_akhir,
        ruangBuktiSuratDinas: `https://devruangrapatp2p.kemkes.go.id/backend1/api/${data.booking_ruangan_surat_dinas}`,
        // ruangBuktiSuratDinas: `http://localhost:3001/backend1/api/${data.booking_ruangan_surat_dinas}`,
        image: null,
      },
    });
  };

  handleDibatalkan = (e) => {
    console.log('hehe', e);
    this.setState({
      actionPilihan: 'Dibatalkan',
    });
    const laporan = {
      laporanruangNamaPeminjam: e.booking_ruangan_nama,
      laporanruangNIP: e.booking_ruangan_nip,
      laporanruangNoHP: e.booking_ruangan_nohp,
      laporanruangEmail: e.booking_ruangan_email,
      laporanruangSatker: e.booking_ruangan_unitkerja,
      laporanruangDirektorat: e.booking_ruangan_direktorat,
      laporanruangTanggalBooking: e.booking_ruangan_tanggal,
      laporanruangKeteranganAcara: e.booking_ruangan_keterangan_kegiatan_acara,
      laporanruangRapatHadirOleh: e.booking_ruang_rapat_hadir_oleh,
      laporanruangPenanggungJawab: e.booking_ruangan_penaggung_jawab,
      laporanruangYangDigunakan: e.booking_ruangan_ruangan,
      laporanruangWaktuMulai: e.booking_ruangan_waktu_penggunaan_awal,
      laporanruangWaktuAkhir: e.booking_ruangan_waktu_penggunaan_akhir,
      laporanruangBuktiSuratDinas: e.booking_ruangan_surat_dinas,
      idUserr: e.id_peminjam,
      image: e.booking_ruangan_surat_dinas,
      statusBooking: 'Dibatalkan',
      id: e.id,
    };
    this.postBookingData(laporan);
    this.deleteDataBook(e.id);
  };

  handleSelesai = (e) => {
    this.setState({
      actionPilihan: 'Selesai',
    });
    const laporan = {
      laporanruangNamaPeminjam: e.booking_ruangan_nama,
      laporanruangNIP: e.booking_ruangan_nip,
      laporanruangNoHP: e.booking_ruangan_nohp,
      laporanruangEmail: e.booking_ruangan_email,
      laporanruangSatker: e.booking_ruangan_unitkerja,
      laporanruangDirektorat: e.booking_ruangan_direktorat,
      laporanruangTanggalBooking: e.booking_ruangan_tanggal,
      laporanruangKeteranganAcara: e.booking_ruangan_keterangan_kegiatan_acara,
      laporanruangRapatHadirOleh: e.booking_ruang_rapat_hadir_oleh,
      laporanruangPenanggungJawab: e.booking_ruangan_penaggung_jawab,
      laporanruangYangDigunakan: e.booking_ruangan_ruangan,
      laporanruangWaktuMulai: e.booking_ruangan_waktu_penggunaan_awal,
      laporanruangWaktuAkhir: e.booking_ruangan_waktu_penggunaan_akhir,
      laporanruangBuktiSuratDinas: e.booking_ruangan_surat_dinas,
      idUserr: e.id_peminjam,
      image: e.booking_ruangan_surat_dinas,
      statusBooking: 'Selesai',
      id: e.id,
    };
    this.postBookingData(laporan);
  };

  changeTextFormDirektorat = (event) => {
    console.log('event', event);
    this.setState({
      dropDownValDirektorat: event,
      form: {
        ...this.state.form,
        // [event.target.name]: event.target.value,
        ruangDirektorat: event,
      },
      foo: this.state.namaUnitKerja[event],
    });
  };
  changeTextFormUnitKerja = (event) => {
    console.log('change text form direktorat', event);
    this.setState({
      dropDownValUnitKerja: event,
      form: {
        ...this.state.form,
        ruangSatker: event,
      },
    });
  };
  showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  EditDataBooking = () => {
    const { form, id } = this.state;
    console.log('form', form);
    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .updateDataBooking(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: 'Update Data Booking Succes !',
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true,
          },
          () => {
            this.getData2();
            this.getData();
            this.getData3();
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

  changeText = (event) => {
    this.setState({ [event.target.name]: '%' + event.target.value + '%' });
  };

  render() {
    const {
      ruangDirektorat,
      ruangEmail,
      ruangKeteranganAcara,
      ruangNIP,
      ruangNamaPeminjam,
      ruangNoHP,
      ruangPenanggungJawab,
      ruangSatker,
      ruangTanggalBooking,
      ruangWaktuAkhir,
      ruangWaktuMulai,
      phoneNumberValid,
      NIPValid,
      EmailValid,
      WaktuAkhirValid,
      WaktuAwalValid,
      msg,
      ruangRapatHadirOleh,
      ruangYangDigunakan,
    } = this.state.form;
    const {
      smShow,
      photoShow,
      photoSuratDinas,
      foo,
      dropDownValDirektorat,
      dropDownValUnitKerja,
    } = this.state;
    const { data } = this.props.auth;
    const { dataBookingById } = this.props.idUser;
    const { bismillah } = this.props.bookingruangan;
    const columns = [
      { field: 'booking_ruangan_nama', headerName: 'Nama', width: 180 },
      { field: 'booking_ruangan_nip', headerName: 'NIP', width: 130 },
      {
        field: 'booking_ruangan_unitkerja',
        headerName: 'Unit Kerja',
        width: 205,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div>{params.value}</div>
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
      { field: 'booking_ruangan_nohp', headerName: 'No HP', width: 130 },
      {
        field: 'booking_ruangan_direktorat',
        headerName: 'Direktorat',
        width: 130,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div>{params.value}</div>
            </Tooltip>
          );
        },
      },
      { field: 'booking_ruangan_email', headerName: 'Email', width: 170 },
      {
        field: 'booking_ruangan_penaggung_jawab',
        headerName: 'Penanggung Jawab',
        width: 150,
      },
      {
        field: 'booking_ruangan_keterangan_kegiatan_acara',
        headerName: 'Keterangan Kegiatan Acara',
        width: 320,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Tooltip title={params.value}>
              <div>{params.value}</div>
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
        headerName: 'Ruang Rapat',
        width: 150,
      },
      {
        field: 'booking_ruangan_waktu_penggunaan_awal',
        headerName: 'Waktu Mulai',
        width: 130,
      },
      {
        field: 'booking_ruangan_waktu_penggunaan_akhir',
        headerName: 'Waktu Selesai',
        width: 130,
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
              View Photo
            </Button>
          );
        },
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 240,
        renderCell: (params) => {
          return (
            // you will find row info in params
            <Row>
              <Col>
                {data.user_role === 'admin' ? (
                  <Button
                    onClick={() => this.setUpdate(params)}
                    variant='warning'
                  >
                    <EditIcon />
                    jj
                  </Button>
                ) : (
                  ''
                )}
              </Col>
              <Col>
                <Button
                  onClick={() => this.handleSelesai(params)}
                  variant='primary'
                >
                  <CheckIcon />
                </Button>
              </Col>
              {data.user_role === 'admin' ? (
                <Col>
                  <Button
                    onClick={() => this.handleDibatalkan(params)}
                    variant='danger'
                  >
                    <CancelIcon />
                  </Button>
                </Col>
              ) : (
                ''
              )}
            </Row>
          );
        },
      },
    ];
    return (
      <>
        <NavBar isAdminPage={false} />
        <Container>
          <Row>
            <Col>
              <h2 className='mt-5 mb-3'>DATA BOOKING</h2>
            </Col>
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
          </Row>
          {/* <p>{this.state.tanggal.toLocaleTimeString('en-GB')}</p> */}

          {/* <Button onClick={() => this.setSmShow()} className="me-2">Input Data Laporan</Button> */}
          {/* <div style={{ height: 640, width: '100%' }}>
            {data.user_role === 'admin' ? (
              <DataGrid
                rows={bismillah}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            ) : (
              <DataGrid
                rows={dataBookingById}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            )}
          </div> */}
          <div className='mt-5'>
            <Table striped bordered hover responsive>
              <thead className='text-center'>
                <tr className={styles.witdthKolom}>
                  <th className={styles.witdthKolom}>No</th>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Unit Kerja</th>
                  <th>Tanggal Mulai</th>
                  <th className={styles.witdthKolom}>No HP</th>
                  <th>Direktorat</th>
                  <th>Email</th>
                  <th>Penanggung Jawab</th>
                  <th>Keterangan Kegiatan Acara</th>
                  <th>Rapat yang Hadir</th>
                  <th>Ruang Rapat</th>
                  <th>Waktu Mulai</th>
                  <th>Waktu Selesai</th>
                  {data.user_role === 'admin' ? (
                    <>
                      <th>Surat Dinas</th>
                      <th>Action</th>
                    </>
                  ) : (
                    ''
                  )}
                </tr>
              </thead>
              {bismillah.map((item, index) => {
                console.log('Data bismillah', bismillah);
                return (
                  <tbody className={styles.witdthKolom}>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.booking_ruangan_nama}</td>
                      <td>{item.booking_ruangan_nip}</td>
                      <td>{item.booking_ruangan_unitkerja}</td>
                      <td>
                        {/* {item.booking_ruangan_tanggal} */}
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
                      {data.user_role === 'admin' ? (
                        <>
                          <td>
                            {/* <Button
                              onClick={() =>
                                this.handleImageTable(
                                  item.booking_ruangan_surat_dinas
                                )
                              }
                              variant='outline-primary'
                            >
                              View
                            </Button> */}
                            <a
                              target='_blank'
                              href={`https://devruangrapatp2p.kemkes.go.id/backend1/api/${item.booking_ruangan_surat_dinas}`}
                              // href={`http://localhost:3001/backend1/api/${item.booking_ruangan_surat_dinas}`}
                            >
                              <Button variant='outline-primary'>View</Button>
                            </a>
                          </td>
                          {data.user_role === 'admin' ? (
                            <td className={styles.kolom}>
                              <div className={styles.kolomm}>
                                <Button
                                  onClick={() => this.setUpdate(item)}
                                  variant='warning'
                                >
                                  <EditIcon />
                                </Button>
                              </div>
                              <div className={styles.kolomm}>
                                <Button
                                  onClick={() => this.handleSelesai(item)}
                                  variant='primary'
                                >
                                  <CheckIcon />
                                </Button>
                              </div>

                              <Button
                                onClick={() => this.handleDibatalkan(item)}
                                variant='danger'
                              >
                                <CancelIcon />
                              </Button>
                            </td>
                          ) : (
                            <td className={styles.kolom}>
                              <div className={styles.kolomm}>
                                <Button
                                  onClick={() => this.setUpdate(item)}
                                  variant='warning'
                                >
                                  <EditIcon />
                                </Button>
                              </div>
                              <div className={styles.kolomm}>
                                <Button
                                  // onClick={() => this.handleSelesai(params)}
                                  variant='primary'
                                >
                                  <CheckIcon />
                                </Button>
                              </div>
                            </td>
                          )}
                        </>
                      ) : (
                        ''
                      )}
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
            backdrop='static'
            keyboard={false}
            show={smShow}
            onHide={() => this.modalClose()}
            aria-labelledby='example-modal-sizes-title-sm'
          >
            <Modal.Header closeButton>
              <Modal.Title id='example-modal-sizes-title-sm'>
                Update Booking
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row}>
                  {/* <Col>
                    <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Nama Peminjam'
                      name='ruangNamaPeminjam'
                      value={ruangNamaPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}
                  <Col>
                    <Form.Label>Nama Peminjam</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Nama Peminjam'
                      name='ruangNamaPeminjam'
                      value={ruangNamaPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  {/* <Col>
                    <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='NIP Peminjam'
                      name='ruangNIP'
                      value={ruangNIP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={NIPValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col> */}
                  <Col>
                    <Form.Label>NIP Peminjam</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='NIP Peminjam'
                      name='ruangNIP'
                      value={ruangNIP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={NIPValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col>
                    <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='No Hp'
                      type='text'
                      name='ruangNoHP'
                      value={ruangNoHP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={phoneNumberValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col> */}
                  <Col>
                    <Form.Label>No Hp</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='No Hp'
                      name='ruangNoHP'
                      value={ruangNoHP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={phoneNumberValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                  {/* <Col>
                    <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Email'
                      name='ruangEmail'
                      value={ruangEmail}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={EmailValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col> */}
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Email'
                      name='ruangEmail'
                      value={ruangEmail}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={EmailValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col>
                    <InputLabel id='demo-simple-select-helper-label'>
                      {' '}
                      Direktorat
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select'
                      value={ruangDirektorat}
                      name='ruangDirektorat'
                      onChange={(event) => this.changeTextFormDirektorat(event)}
                    >
                      {this.state.direktorat.length > 0 ? (
                        this.state.direktorat.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {index + 1}. {item}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>
                          Unit Kerja Not Found !!!
                        </p>
                      )}
                    </Select>
                  </Col> */}
                  <Col>
                    <Form.Label>Direktorat</Form.Label>
                    <DropdownButton
                      className={`${styles.dropDown} mb-2 `}
                      variant='secondary'
                      title={dropDownValDirektorat}
                      id='dropdown-menu-align-right'
                      value={ruangDirektorat}
                      name='ruangDirektorat'
                      onSelect={this.changeTextFormDirektorat}
                      // onChange={(event) => this.changeTextFormDirektorat(event)}
                    >
                      {this.state.direktorat.length > 0 ? (
                        this.state.direktorat.map((item, index) => {
                          console.log('direktorat', item);
                          return (
                            <Dropdown.Item
                              className={styles.semi}
                              eventKey={item.namaDirektorat}
                            >
                              {item.namaDirektorat}
                            </Dropdown.Item>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>
                          Unit Kerja Not Found !!!
                        </p>
                      )}
                    </DropdownButton>
                  </Col>
                  {/* <Col>
                    <TextField
                      required
                      fullWidth
                      label='Penanggung Jawab'
                      name='ruangPenanggungJawab'
                      value={ruangPenanggungJawab}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}
                  <Col>
                    <Form.Label>Penanggung Jawab</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Penanggung Jawab'
                      name='ruangPenanggungJawab'
                      value={ruangPenanggungJawab}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col xs={6}>
                    <InputLabel id='demo-simple-select-helper-label'>
                      {' '}
                      Unit Kerja
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-helper-label'
                      id='demo-simple-select'
                      value={ruangSatker}
                      name='ruangSatker'
                      onChange={(event) => this.changeTextForm(event)}
                    >
                      {foo.length > 0 ? (
                        foo.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {index + 1}. {item}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>
                          Please select Direktorat !!!
                        </p>
                      )}
                    </Select>
                  </Col> */}
                  <Col xs={6}>
                    <Form.Label>Unit Kerja</Form.Label>
                    <DropdownButton
                      className={`${styles.dropDown} mb-2 `}
                      variant='secondary'
                      title={dropDownValUnitKerja}
                      id='dropdown-menu-align-right'
                      value={ruangSatker}
                      name='ruangSatker'
                      // onChange={(event) => this.changeTextFormDirektorat(event)}
                      onSelect={this.changeTextFormUnitKerja}
                    >
                      {foo.length > 0 ? (
                        foo.map((item, index) => {
                          console.log('foo', item);
                          return (
                            <Dropdown.Item
                              className={styles.semi}
                              eventKey={item}
                            >
                              {item}
                            </Dropdown.Item>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>
                          Unit Kerja Not Found !!!
                        </p>
                      )}
                    </DropdownButton>
                  </Col>
                  <Col>
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Ruangan yang Digunakan'
                      type='text'
                      name='ruangYangDigunakan'
                      value={ruangYangDigunakan}
                      onChange={(event) => this.changeTextForm(event)}
                      InputProps={{
                        readOnly: true,
                      }}
                    /> */}
                    <Form.Label>Ruangan yang Digunakan</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Ruangan yang Digunakan'
                      name='ruangYangDigunakan'
                      value={ruangYangDigunakan}
                      onChange={(event) => this.changeTextForm(event)}
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  {/* <Col xs={6}>
                    <InputLabel id="demo-simple-select-label">Jumlah Booking Hari</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={jumlahhari}
                      name="jumlahhari"
                      label="Age"
                      onChange={(event) => this.changeTextForm(event)}

                    >
                      <MenuItem value={false}>satu hari</MenuItem>
                      <MenuItem value={true}>Lebih dari 1 hari</MenuItem>
                    </Select>
                  </Col> */}
                </Form.Group>

                {/* {
                  jumlahhari === true ? ( */}
                <Form.Group as={Row}>
                  <Col>
                    <Form.Label>Kegiatan Acara</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Kegiatan Acara'
                      name='ruangKeteranganAcara'
                      value={ruangKeteranganAcara}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Keterangan Acara'
                      name='ruangKeteranganAcara'
                      value={ruangKeteranganAcara}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                  <Col xs={6}>
                    <Form.Label>Tanggal Booking Mulai</Form.Label>

                    <Form.Control
                      type='date'
                      placeholder='Tanggal Booking Mulai'
                      name='ruangTanggalBooking'
                      value={ruangTanggalBooking}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    {/* <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Tanggal Booking Mulai'
                      type='date'
                      defaultValue='05/04/2022'
                      name='ruangTanggalBooking'
                      value={ruangTanggalBooking}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                  </Col>
                  {/* <Col xs={6}>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Tanggal Booking Mulai"
                      type="date"
                      defaultValue="05/04/2022"
                      name="ruangTanggalBooking"
                      value={ruangTanggalBooking}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col> */}

                  {/* <Col>

                        <TextField
                          required
                          fullWidth
                          id="outlined-password-input"
                          label="Tanggal Booking Akhir"
                          type="date"
                          defaultValue="05/04/2022"
                          name="ruangTanggalBookingAkhir"
                          value={ruangTanggalBookingAkhir}
                          onChange={(event) => this.changeTextForm(event)}
                        />
                      </Col> */}
                </Form.Group>

                {/* ) : ( */}
                {/* <Form.Group as={Row}>


                </Form.Group> */}
                {/* )
                } */}

                <Form.Group as={Row}>
                  <Col>
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Waktu dimulai'
                      type='time'
                      name='ruangWaktuMulai'
                      value={ruangWaktuMulai}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                    <Form.Label>Waktu Dimulai</Form.Label>

                    <Form.Control
                      type='time'
                      placeholder='Waktu Dimulai'
                      name='ruangWaktuMulai'
                      value={ruangWaktuMulai}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={WaktuAwalValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    {/* <TextField
                      required
                      fullWidth
                      id='outlined-password-input'
                      label='Waktu berkahir'
                      type='time'
                      name='ruangWaktuAkhir'
                      value={ruangWaktuAkhir}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                    <Form.Label>Waktu Berakhir</Form.Label>

                    <Form.Control
                      type='time'
                      placeholder='Waktu Berakhir'
                      name='ruangWaktuAkhir'
                      value={ruangWaktuAkhir}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={WaktuAkhirValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col>
                    {/* <TextField
                      required
                      fullWidth
                      type='text-area'
                      id='outlined-password-input'
                      label='Pejabat yang Hadir'
                      name='ruangRapatHadirOleh'
                      value={ruangRapatHadirOleh}
                      onChange={(event) => this.changeTextForm(event)}
                    /> */}
                    <Form.Label>Pejabat yang Hadir</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      onChange={(event) => this.changeTextForm(event)}
                      name='ruangRapatHadirOleh'
                      value={ruangRapatHadirOleh}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>
                    <Form.Group as={Row}>
                      <Col xs={4}>
                        <Form.Group>
                          <Form.File
                            label='Upload Bukti Surat Dinas'
                            onChange={(event) => this.changeImage(event)}
                          />
                        </Form.Group>
                      </Col>
                    </Form.Group>
                  </Col>
                </Form.Group>
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
                    onClick={() => this.EditDataBooking()}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
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
  getlaporanRuanganAll,
  getLaporanUser,
  getlaporanRuanganAllTanpaFill,
  getbookingRuanganAllTanpaFill,
  getBookingUser,
  deleteBookingRuangan,
  updateDataBooking,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  laporanruangan: state.laporanruangan,
  laporanUser: state,
  auth: state.auth,
  coba: state,
  idUser: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
