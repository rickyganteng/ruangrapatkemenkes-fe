import React, { Component } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Card from "../../../components/CardUpdate/CardUpdate";
import axiosApiIntances from "../../../utils/axios";
import ReactPaginate from "react-paginate";
import { Button, Image, Container, Row, Col, Form, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from "./Homebook.module.css";
import { connect } from "react-redux";
import { getPremiereAll, postRuangan, deleteRuangan, getFasilitasRuangan, getRuanganById, updateDataRuangan } from "../../../redux/action/ruangan"
import { getbookingRuanganAll, postbookingRuangan, getbookingRuanganAllTanpaFill, deleteBookingRuangan, updateDataBooking } from "../../../redux/action/bookingRuangan"
import { getwaitinglistAllTanpaFill, deletewaitinglist, postwaitinglist, postWaitingListLebihSatu } from "../../../redux/action/waitingList"
import { postlaporanRuangan } from "../../../redux/action/laporanRuangan"
import { getBookingUser, getWaitingListUser } from "../../../redux/action/user"
import { DataGrid } from '@mui/x-data-grid';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import dummy from "../../../assets/img/no_image.jpg";
import TextField from '@mui/material/TextField';
import Footer from "../../../components/Footer/Footer";
import Text from "./Text"

const inputOpenFileRef = React.createRef();
class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.auth.data.id);

    this.state = {
      idRuanganDelete: "",
      showModalDeleteRuangan: false,
      idr: "",
      id: "",
      users: [
        {
          key: Date.now(),
          jumlahBarang: "",
          barang: "",
          kualitasBarang: ""
        }
      ],
      actionPilihan: "",
      photoSuratDinas: '',
      dropDownVal: "Sort By",
      sortBy: "id_r ASC",
      search: "%%",
      sortBy2: "id ASC",
      search2: "%%",
      dropDownVal2: "Pilih Unit Kerja",
      dropDownVal3: "Pilih Direktorat",
      phoneNumberValid: "valid",
      NIPValid: "valid",
      EmailValid: "valid",
      WaktuAkhirValid: "valid",
      WaktuAwalValid: "valid",
      msg: "",
      namaruang: "",
      modalMsg: "",
      msgNotif: "",
      page: 1,
      page2: 1,
      limit: 4,
      limit2: 4,
      dataMovPlayNow: [],
      dataMovUpcoming: [],
      tmpDataMovUpcoming: [],
      foo: [],
      direktorat: ["Sekertariat P2P", "P2PM", "Pengelolaan  Imunisasi", "P2PTM", "Penyehatan Lingkungan (PL)", "SUKARKES"],
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


      unitkerja: [
        "Sekertariat P2P (Program dan Informasi)",
        "Sekertariat P2P (Hukum, Organisasi dan Hubungan Masyarakat)",
        "Sekertariat P2P (Keuangan dan BMN)"
      ],

      pagination: {},
      paginationn: {},
      isShowView1: false,
      smShow: false,
      smShowInput: false,
      showw: false,
      showModalSucces: false,
      showModalFasilitas: false,
      showModalEditFasilitas: false,
      photoShow: false,
      photoShowPdf: false,
      isUpdate: false,

      form: {
        NamaRuang: "",
        LantaiRuang: "",
        TempatRuang: "",
        JumlahKursi: "",
        nomorPengelola: "",
        namaPengelola: "",

        ruangNamaPeminjam: "",
        ruangNIP: "",
        ruangNoHP: "",
        ruangEmail: "",
        ruangSatker: "",
        ruangDirektorat: "",
        ruangTanggalBooking: "",
        ruangKeteranganAcara: "",
        ruangRapatHadirOleh: "",
        ruangPenanggungJawab: "",
        ruangYangDigunakan: "",
        ruangWaktuMulai: "",
        ruangWaktuAkhir: "",
        ruangBuktiSuratDinas: null,
        image: null,
        idUserr: this.props.auth.data.id,

        laporanruangNamaPeminjam: "",
        laporanruangNIP: "",
        laporanruangNoHP: "",
        laporanruangEmail: "",
        laporanruangSatker: "",
        laporanruangDirektorat: "",
        laporanruangTanggalBooking: "",
        laporanruangKeteranganAcara: "",
        laporanruangRapatHadirOleh: "",
        laporanruangPenanggungJawab: "",
        laporanruangYangDigunakan: "",
        laporanruangWaktuMulai: "",
        laporanruangWaktuAkhir: "",
        laporanruangBuktiSuratDinas: null,

      }
    };
  }
  componentDidMount() {
    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
    this.getData6();

  }


  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ page: 1 }, () => {
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        this.getData4();
        this.getData5();
        this.getData6();

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

  getData = () => {
    const { page2, limit2, sortBy2, search2 } = this.state;

    this.props.getbookingRuanganAllTanpaFill(page2, limit2, sortBy2, search2);
  };
  getData1 = () => {
    const { page, limit, sortBy, search } = this.state;
    this.props.getPremiereAll(page, limit, sortBy, search);
  };
  getData2 = () => {
    const { page2, limit2, sortBy2, search2 } = this.state;
    this.props.getbookingRuanganAll(page2, limit2, sortBy2, search2);
  };
  getData3 = () => {
    const iduser = localStorage.getItem("user");
    this.props.getBookingUser(iduser);
  };
  getData4 = () => {
    this.props.getwaitinglistAllTanpaFill();
  };
  getData5 = () => {
    console.log(localStorage.getItem("user"));
    const iduser = localStorage.getItem("user");
    this.props.getWaitingListUser(iduser);
  };
  getData6 = (params) => {
    if (params !== undefined) {
      this.props.getFasilitasRuangan(params);
      this.props.getRuanganById(params);
    }
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
  handlePageClick2 = (event) => {
    const selectedPage1 = event.selected + 1;
    this.setState({ page: selectedPage1 }, () => {
      this.getData1();
    });
  };
  postData = () => {
    const { form } = this.state;
    console.log(form);
    delete form.ruangBuktiSuratDinas;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.ruangEmail === "" &&
      form.ruangKeteranganAcara === "" &&
      form.ruangRapatHadirOleh === "" &&
      form.ruangNamaPeminjam === "" &&
      form.ruangNIP === "" &&
      form.ruangNoHP === "" &&
      form.ruangSatker === "" &&
      form.ruangDirektorat === [] &&
      form.ruangTanggalBooking === "" &&
      form.ruangPenanggungJawab === "" &&
      form.ruangYangDigunakan === "" &&
      form.ruangWaktuMulai === "" &&
      form.ruangWaktuAkhir === "" &&
      form.ruangBuktiSuratDinas === null &&
      form.image === null &&
      form.idUserr === null &&
      this.state.phoneNumberValid === "Invalid" &&
      this.state.NIPValid === "Invalid" &&
      this.state.EmailValid === "Invalid" &&
      this.state.WaktuAkhirValid === "Invalid"
    ) {
      this.setState({
        showw: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else if (
      form.ruangEmail !== "" &&
      form.ruangKeteranganAcara !== "" &&
      form.ruangRapatHadirOleh !== "" &&
      form.ruangNamaPeminjam !== "" &&
      form.ruangNIP !== "" &&
      form.ruangNoHP !== "" &&
      form.ruangSatker !== "" &&
      form.ruangDirektorat !== [] &&
      form.ruangTanggalBooking !== "" &&
      form.ruangPenanggungJawab !== "" &&
      form.ruangYangDigunakan !== "" &&
      form.ruangWaktuMulai !== "" &&
      form.ruangWaktuAkhir !== "" &&
      form.ruangBuktiSuratDinas !== null &&
      form.image !== null &&
      form.idUserr !== null &&
      this.state.phoneNumberValid === "valid" &&
      this.state.NIPValid === "valid" &&
      this.state.EmailValid === "valid" &&
      this.state.WaktuAkhirValid === "valid"
    ) {
      this.props
        .postWaitingListLebihSatu(formData, this.state.form.idUserr)
        .then((res) => {
          this.setState(
            {
              msg: res.value.data.msg,
              modalMsg: "Submit Data Booking Succes !",
              show: true,
              smShow: false,
              dropDownVal2: "Pilih Unit Kerja",
              dropDownVal3: "Pilih Direktorat",
              showModalSucces: true
            },
            () => {
              this.getData();
              this.getData1();
              this.getData2();
              this.getData3();
              this.getData4();
              this.getData5();
              this.getData6();
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

    } else {
      this.setState({
        showw: true,
        msgNotif: "Isi data dengan benar !"
      });
    }

  };

  postDataRuangan = (data) => {

    const { form } = this.state;
    delete form.ruangBuktiSuratDinas;
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (
      form.NamaRuang === "" ||
      form.LantaiRuang === "" ||
      form.TempatRuang === "" ||
      form.JumlahKursi === "" ||
      form.namaPengelola === "" ||
      form.nomorPengelola === "" ||
      form.image == null) {

      this.setState({
        showw: true,
        msgNotif: "Lengkapi data dengan benar !"
      });
    } else {
      this.props
        .postRuangan(formData)
        .then((res) => {
          const { users } = this.state
          const dataBook = {
            id: res.value.data.data.id,
            users: users
          };

          axiosApiIntances
            .post("ruangan/fasilitas", dataBook)
            .then((res) => {
              this.setState({
                modalMsg: "Booking Succes !",
                showModal: true,
              });
              setTimeout(() => {
                this.setState({ showModal: false });
                this.props.history.push(`/`);
              }, 2000);
            })
            .catch((err) => {
              this.setState({
                modalMsg: "Booking Failed !",
                showModal: true,
              });
            });
          this.setState(
            {
              modalMsg: "Submit Data Ruangan Succes !",
              show: true,
              smShow: false,
              dropDownVal2: "Pilih Unit Kerja",
              dropDownVal3: "Pilih Direktorat",
              showModalSucces: true
            },
            () => {
              this.getData();
              this.getData1();
              this.getData2();
              this.getData3();
              this.getData4();
              this.getData5();
              this.getData6();
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
    };
  }
  postDataFasilitasRuangan = (data) => {
    const { users, idr } = this.state
    const dataBook = {
      id: idr,
      users: users
    };
    axiosApiIntances
      .post("ruangan/fasilitas", dataBook)
      .then((res) => {
        this.setState({
          modalMsg: "Booking Succes !",
          showModal: true,
        });
        setTimeout(() => {
          this.setState({ showModal: false });
          this.props.history.push(`/`);
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Booking Failed !",
          showModal: true,
        });
      });
    this.setState(
      {
        modalMsg: "Submit Data Ruangan Succes !",
        show: true,
        smShow: false,
        dropDownVal2: "Pilih Unit Kerja",
        dropDownVal3: "Pilih Direktorat",
        showModalSucces: true
      },
      () => {
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        this.getData4();
        this.getData5();
        this.getData6();
      }
    );
    this.resetForm();



  }

  resetForm = () => {
    this.setState({
      users: [
        {
          key: Date.now(),
          jumlahBarang: "",
          barang: "",
          kualitasBarang: ""
        }
      ],
      dropDownVal2: "Pilih Unit Kerja",
      dropDownVal3: "Pilih Direktorat",
      form: {
        ...this.state.form,
        NamaRuang: "",
        LantaiRuang: "",
        TempatRuang: "",
        JumlahKursi: "",
        nomorPengelola: "",
        namaPengelola: "",
        ruangNamaPeminjam: "",
        ruangNIP: "",
        ruangNoHP: "",
        ruangEmail: "",
        ruangSatker: "",
        ruangDirektorat: [],
        ruangTanggalBooking: "",
        ruangKeteranganAcara: "",
        ruangRapatHadirOleh: "",
        ruangPenanggungJawab: "",
        ruangYangDigunakan: "",
        ruangWaktuMulai: "",
        ruangWaktuAkhir: "",
        ruangBuktiSuratDinas: null,
        image: null,
        idUserr: this.props.auth.data.id,

        laporanruangNamaPeminjam: "",
        laporanruangNIP: "",
        laporanruangNoHP: "",
        laporanruangEmail: "",
        laporanruangSatker: "",
        laporanruangDirektorat: "",
        laporanruangTanggalBooking: "",
        laporanruangKeteranganAcara: "",
        laporanruangRapatHadirOleh: "",
        laporanruangPenanggungJawab: "",
        laporanruangYangDigunakan: "",
        laporanruangWaktuMulai: "",
        laporanruangWaktuAkhir: "",
        laporanruangBuktiSuratDinas: null,
      },
    });
  };
  EditDataBooking = () => {
    const { form, id } = this.state;
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
            modalMsg: "Update Data Booking Succes !",
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
            this.getData6();
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
  EditDataRuangan = () => {
    const { form, id } = this.state;

    delete form.movieImage;
    if (!form.image) {
      delete form.image;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    this.props
      .updateDataRuangan(id, formData)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Update Data Booking Succes !",
            show: true,
            isUpdate: false,
            smShow: false,
            showModalSucces: true,
            smShowInput: false
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
            this.getData6();
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

  EditDataFasilitas = (data) => {
    this.setState({
      showModalEditFasilitas: true,
      id: data.fasilitas_ruangan_id,
      idr: data.id_r,
      users: [
        {
          key: Date.now(),
          jumlahBarang: data.jumlah_barang,
          barang: data.nama_barang,
          kualitasBarang: data.fasilitas_barang
        }
      ],
    })
  };
  EditDataFasilitasConfirm = () => {
    const { users, id, idr } = this.state
    const dataBook = {
      id: id,
      idr: idr,
      users: users
    };

    axiosApiIntances
      .patch(`ruangan/fasilitas/${dataBook.id}`, dataBook)
      .then((res) => {
        this.setState({
          modalMsg: "Edit Succes !",
          showModal: true,
        });
        setTimeout(() => {
          this.setState({
            showModal: false,
            showModalEditFasilitas: false,
            showModalFasilitas: false
          });
          this.props.history.push(`/`);
        }, 2000);
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Edit Failed !",
          showModal: true,
        });
      });
    this.setState(
      {
        modalMsg: "Submit Data Ruangan Succes !",
        show: true,
        smShow: false,
        dropDownVal2: "Pilih Unit Kerja",
        dropDownVal3: "Pilih Direktorat",
        showModalSucces: true
      },
      () => {
        this.getData();
        this.getData1();
        this.getData2();
        this.getData3();
        this.getData4();
        this.getData5();
        this.getData6();
      }
    );
    this.resetForm();
  }
  setUpdateRuangan = (data) => {

    this.setState({
      id: data.id_r,
      isUpdate: true,
      smShowInput: true,
      form: {
        NamaRuang: data.namaruang_r,
        LantaiRuang: data.ruangan_lantai,
        TempatRuang: data.alamat_gedung,
        JumlahKursi: data.jumlah_kursi,
        ruangBuktiSuratDinas: `http://192.168.50.23:3002/backend1/api/${data.image_ruangan}`,
        nomorPengelola: data.ruangan_nomor_pengelola,
        namaPengelola: data.ruangan_nama_pengelola,
      }

    })
  }

  setUpdate = (data) => {
    this.setState({
      smShow: true,
      isUpdate: true,
      id: data.row.id,
      dropDownVal2: data.row.booking_ruangan_unitkerja,
      dropDownVal3: data.row.booking_ruangan_direktorat,
      form: {
        ruangNamaPeminjam: data.row.booking_ruangan_nama,
        ruangNIP: data.row.booking_ruangan_nip,
        ruangNoHP: data.row.booking_ruangan_nohp,
        ruangEmail: data.row.booking_ruangan_email,
        ruangSatker: data.row.booking_ruangan_unitkerja,
        ruangDirektorat: data.row.booking_ruangan_direktorat,
        ruangTanggalBooking: data.row.booking_ruangan_tanggal,
        ruangKeteranganAcara: data.row.booking_ruangan_keterangan_kegiatan_acara,
        ruangRapatHadirOleh: data.row.booking_ruang_rapat_hadir_oleh,
        ruangPenanggungJawab: data.row.booking_ruangan_penaggung_jawab,
        ruangYangDigunakan: data.row.booking_ruangan_ruangan,
        ruangWaktuMulai: data.row.booking_ruangan_waktu_penggunaan_awal,
        ruangWaktuAkhir: data.row.booking_ruangan_waktu_penggunaan_akhir,
        idUserr: data.row.id_peminjam,
        ruangBuktiSuratDinas: `http://192.168.50.23:3002/backend1/api/${data.row.booking_ruangan_surat_dinas}`,
        image: null,

      },
    });
  };
  sendData = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.EditDataBooking();
    } else {
      this.postData();
    }
  };
  sendDataRuangan = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.EditDataRuangan();
    } else {
      this.postDataRuangan();
    }
  };
  handleSelect = (event) => {
    this.setState({
      dropDownVal: event.split("-")[0],
      sortBy: event.split("-")[1],
    });
  };

  Fasilititas = (params) => {
    this.setState(
      {
        showModalFasilitas: true,
        idr: params.id_r
      },
      () => {
        this.getData6(params.id_r);
      }
    )
  }

  setSmShow = (event) => {
    this.setState({
      form: {
        ruangYangDigunakan: event.namaruang_r
      },
      smShow: true,
    });
  };
  setPhotoShow = (event) => {
    this.setState({
      photoShow: true,
      namaruang: event.namaruang_r
    });
  };
  modalClose = (event) => {
    this.setState({
      isUpdate: false,
      smShow: false,
      smShowInput: false
    });
    this.resetForm();
  };
  modalPhotoClose = (event) => {
    this.setState({
      showModalDeleteRuangan: false,
      photoShow: false,
      photoShowPdf: false,
      showw: false,
      showModalFasilitas: false,
      showModalSucces: false
    });
  };
  modalEditClose = () => {
    this.setState({
      showModalEditFasilitas: false,
    })
  }
  modalDelete = (data) => {
    this.setState({
      idRuanganDelete: data,
      showModalDeleteRuangan: true,
    })
  }
  deleteDataRuangan = (id) => {
    this.props
      .deleteRuangan(this.state.idRuanganDelete)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Ruangan Deleted !",
            show: true,
            showModalSucces: true
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
            this.getData6();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };

  deleteDataBook = (id) => {
    this.props
      .deletewaitinglist(id)
      .then((res) => {
        this.setState(
          {
            modalMsg: "Booking Ruangan Deleted !",
            show: true,
          },
          () => {
            this.getData();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
            this.getData6();
          }
        );
      })
      .catch((err) => {
        this.setState({
          modalMsg: "Deleted Failed !",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ show: false });
        }, 1000);
      });
  };



  changeTextForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "ruangNoHP") {
      /^[0-9]+$/.test(value) && value.length <= 12
        ? this.setState({ phoneNumberValid: "valid" })
        : this.setState({
          phoneNumberValid: "Invalid",
          msg: "Masukkan nomor tidak lebih dari 12 angka",
        });
    }
    else if (name === "ruangNIP") {
      /^[0-9]+$/.test(value)
        ? this.setState({ NIPValid: "valid" })
        : this.setState({
          NIPValid: "Invalid",
          msg: "Masukkan nomor NIP dengan angka",
        });
    }
    else if (name === "ruangEmail") {
      /* eslint-disable no-useless-escape */
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? this.setState({ EmailValid: "valid" })
        : this.setState({
          EmailValid: "Invalid",
          msg: "Masukkan email dengan benar",
        });
    }
    else if (name === "ruangWaktuAkhir") {
      this.state.form.ruangWaktuMulai < value
        ? this.setState({ WaktuAkhirValid: "valid" })
        : this.setState({
          WaktuAkhirValid: "Invalid",
          msg: "Masukkan Waktu lebih dari Waktu Mulai",
        });
    }
    this.setState({
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
      foo: this.state.namaUnitKerja[event.target.value]
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

  showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  postBookingData = (data) => {
    const ID = data.id
    axiosApiIntances
      .post("bookingruangan", data)
      .then((res) => {

        this.deleteDataBook(ID);
        setTimeout(() => {
          this.props.history.push(`/`);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeText = (event) => {
    this.setState({ [event.target.name]: "%" + event.target.value + "%" });
  };
  handleSelesai = (e) => {
    this.setState({
      actionPilihan: "Selesai",
    })
    const laporan = {
      ruangNamaPeminjam: e.row.booking_ruangan_nama,
      ruangNIP: e.row.booking_ruangan_nip,
      ruangNoHP: e.row.booking_ruangan_nohp,
      ruangEmail: e.row.booking_ruangan_email,
      ruangSatker: e.row.booking_ruangan_unitkerja,
      ruangDirektorat: e.row.booking_ruangan_direktorat,
      ruangTanggalBooking: e.row.booking_ruangan_tanggal,
      ruangKeteranganAcara: e.row.booking_ruangan_keterangan_kegiatan_acara,
      ruangRapatHadirOleh: e.row.booking_ruang_rapat_hadir_oleh,
      ruangPenanggungJawab: e.row.booking_ruangan_penaggung_jawab,
      ruangYangDigunakan: e.row.booking_ruangan_ruangan,
      ruangWaktuMulai: e.row.booking_ruangan_waktu_penggunaan_awal,
      ruangWaktuAkhir: e.row.booking_ruangan_waktu_penggunaan_akhir,
      idUserr: e.row.id_peminjam,
      image: e.row.booking_ruangan_surat_dinas,
      ruangBuktiSuratDinas: e.row.booking_ruangan_surat_dinas,
      id: e.row.id
    }
    this.postBookingData(laporan);

  };
  handleSelectUnitKerja = (event) => {
    this.setState({
      dropDownVal2: event,
      form: {
        ...this.state.form,
        ruangSatker: event,
      }
    });
  };

  handleImageTable = (moon) => {
    let filePdf = moon.row.booking_ruangan_surat_dinas
    let pos = filePdf.indexOf(".pdf");

    if (pos > 1) {
      this.setState({
        photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
        photoShowPdf: true,
      })
    } else {
      this.setState({

        photoSuratDinas: moon.row.booking_ruangan_surat_dinas,
        photoShow: true,
      });

    }
  };

  onChange = (inputUser) => {

    this.setState((prevState) => {
      const newUsers = prevState.users.map((element) => {
        if (element.key === inputUser.key) return inputUser;
        return element;
      });
      return { users: newUsers };
    });
  };

  addElement = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      users: prevState.users.concat({
        key: Date.now(),
        jumlahBarang: "",
        barang: "",
        kualitasBarang: ""
      })
    }));
  };

  removeElement = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.key !== id)
    }));
  };

  setSmShowInput = (event) => {
    this.setState({
      smShowInput: true
    });
  };

  render() {

    const {
      NamaRuang,
      LantaiRuang,
      TempatRuang,
      JumlahKursi,
      nomorPengelola,
      namaPengelola,


      ruangBuktiSuratDinas,
      ruangDirektorat,
      ruangEmail,
      ruangKeteranganAcara,
      ruangRapatHadirOleh,
      ruangNIP,
      ruangNamaPeminjam,
      ruangNoHP,
      ruangPenanggungJawab,
      ruangSatker,
      ruangTanggalBooking,
      ruangWaktuAkhir,
      ruangWaktuMulai,
      ruangYangDigunakan,
    } = this.state.form;
    const {
      users,
      dropDownVal,
      smShow,
      smShowInput,
      photoShow,
      photoShowPdf,
      photoSuratDinas,
      msgNotif,
      showw,
      isUpdate,
      modalMsg,
      showModalSucces,
      foo,
      phoneNumberValid,
      NIPValid,
      EmailValid,
      WaktuAkhirValid,
      WaktuAwalValid,
      msg,
      showModalFasilitas,
      showModalEditFasilitas,
      showModalDeleteRuangan
    } = this.state;
    const { dataRuangan, paginationn, dataFasById, dataRuanganById } = this.props.ruangan;
    const { waitingtanpafill } = this.props.waitingList;
    const { data } = this.props.auth;


    const columns = [

      { field: 'booking_ruangan_nama', headerName: 'Nama', width: 130 },
      { field: 'booking_ruangan_nip', headerName: 'NIP', width: 130 },
      { field: 'booking_ruangan_unitkerja', headerName: 'Unit Kerja', width: 130 },
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
      { field: 'booking_ruangan_nohp', headerName: 'No HP', width: 130 },
      { field: 'booking_ruangan_direktorat', headerName: 'Direktorat', width: 130 },
      { field: 'booking_ruangan_email', headerName: 'Email', width: 170 },
      { field: 'booking_ruangan_penaggung_jawab', headerName: 'Penanggung Jawab', width: 130 },
      { field: 'booking_ruangan_keterangan_kegiatan_acara', headerName: 'Keterangan Kegiatan Acara', width: 130 },
      { field: 'booking_ruang_rapat_hadir_oleh', headerName: 'Rapat yang Hadir', width: 130 },
      { field: 'booking_ruangan_ruangan', headerName: 'Ruangan', width: 130 },
      { field: 'booking_ruangan_waktu_penggunaan_awal', headerName: 'Waktu Mulai', width: 130 },
      { field: 'booking_ruangan_waktu_penggunaan_akhir', headerName: 'Waktu Selesai', width: 130 },
      {
        field: 'suratdinasbooking_ruangan_surat_dinas', headerName: 'Surat Dinas', width: 80, renderCell: (params) => {
          return (
            <Button onClick={() => this.handleImageTable(params)} variant="outline-primary">View</Button>
          )

        }
      },
      {
        field: 'action', headerName: 'Status', width: 120, renderCell: (params) => {
          return (

            data.user_role === "admin" ? (
              <Col>
                <Button onClick={() => this.handleSelesai(params)}
                  variant="danger">Acc</Button>
              </Col>
            ) : (
              <div
                className={` mt-1  mx-auto`}
              >Process Admin</div>
            )
          )
        }
      },

    ];
    return (
      <>

        <NavBar isAdminPage={false} />
        <Container className="mt-5">
          <Row>
            <Col xs={2}>
              {data.user_role === "admin" ? (
                <Button onClick={() => this.setSmShowInput()}>Input Ruangan</Button>

              ) : (
                "")}
            </Col>
            <Col></Col>
            <Col xs={2}>
              <DropdownButton
                className={`${styles.dropDown} mb-2 text-right`}
                variant="secondary"
                title={dropDownVal}
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Name A to Z-namaruang_r ASC"
                >
                  Sort by Name A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Name Z to A-namaruang_r DESC"
                >
                  Sort by Name Z-A
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Latest Release Date-ruangan_created_at ASC"
                >
                  News by Release Date
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.semi}
                  eventKey="By Oldest Release Date-ruangan_created_at DESC"
                >
                  last by Release Date
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col lg={3}>
              <Form className={styles.searchInput}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Cari Nama Unit Kerja..."
                    name="search"
                    onChange={(event) => this.changeText(event)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <div
            className={`${styles.bgDiv} ${styles.semi} pt-5 pb-5 pl-4 pr-4`}
          >
            <Row>
              {dataRuangan.map((item, key) => {
                return (
                  <Col lg={3} md={4} key={key} className="mb-2">
                    < Card
                      data={item}
                      handleFasilitas={this.Fasilititas.bind(this)}
                      handleUpdate={this.setUpdateRuangan.bind(this)}
                      handleDelete={this.modalDelete.bind(this)}
                      btBooking={this.setSmShow.bind(this)}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>

        <Container >
          <div className="d-flex justify-content-center">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={paginationn.totalPage ? paginationn.totalPage : 0}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick2}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </Container>
        <Container className="mt-5">
          <h3>Data Waiting List</h3>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={waitingtanpafill}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowHeight={() => 100}
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
                {isUpdate ? "Update" : "Input"} Booking
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
                      label="Nama Peminjam"
                      name="ruangNamaPeminjam"
                      value={ruangNamaPeminjam}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="NIP Peminjam"
                      name="ruangNIP"
                      value={ruangNIP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={NIPValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="No Hp"
                      type="text"
                      name="ruangNoHP"
                      value={ruangNoHP}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={phoneNumberValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>

                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Email"
                      name="ruangEmail"
                      value={ruangEmail}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={EmailValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>

                  <Col >

                    <InputLabel id="demo-simple-select-helper-label"> Direktorat</InputLabel>
                    <Select

                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select"
                      value={ruangDirektorat}
                      name="ruangDirektorat"
                      onChange={(event) => this.changeTextFormDirektorat(event)}
                    >
                      {this.state.direktorat.length > 0 ? (
                        this.state.direktorat.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>{index + 1}. {item}</MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Unit Kerja Not Found !!!</p>
                      )}
                    </Select>
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      label="Penanggung Jawab"
                      name="ruangPenanggungJawab"
                      value={ruangPenanggungJawab}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>



                </Form.Group>
                <Form.Group as={Row}>
                  <Col xs={6}>
                    <InputLabel id="demo-simple-select-helper-label"> Unit Kerja</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select"
                      value={ruangSatker}
                      name="ruangSatker"
                      onChange={(event) => this.changeTextForm(event)}
                    >
                      {foo.length > 0 ? (
                        foo.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}
                            >{index + 1}. {item}</MenuItem>
                          );
                        })
                      ) : (
                        <p className={styles.notFound}>Please select Direktorat !!!</p>
                      )}
                    </Select>
                  </Col>


                  <Col>
                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Ruangan yang Digunakan"
                      type="text"
                      name="ruangYangDigunakan"
                      value={ruangYangDigunakan}
                      onChange={(event) => this.changeTextForm(event)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                </Form.Group>
                <Form.Group as={Row}>

                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Keterangan Acara"
                      name="ruangKeteranganAcara"
                      value={ruangKeteranganAcara}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col xs={6}>

                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col>

                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Waktu dimulai"
                      type="time"
                      name="ruangWaktuMulai"
                      value={ruangWaktuMulai}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                    <Form.Control.Feedback type={WaktuAwalValid}>
                      <p className={styles.warning}>{msg}</p>
                    </Form.Control.Feedback>
                  </Col>
                  <Col>

                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Waktu berkahir"
                      type="time"
                      name="ruangWaktuAkhir"
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
                    <TextField
                      required
                      fullWidth
                      type="text-area"
                      id="outlined-password-input"
                      label="Pejabat yang Hadir"
                      name="ruangRapatHadirOleh"
                      value={ruangRapatHadirOleh}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>

                  <Col>
                    <Form.Group as={Row}>
                      <Col xs={4}>

                        <Form.Group>
                          <Form.File
                            label="Upload Bukti Surat Dinas"
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

                    variant="outline-primary">Cancel</Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendData()}
                  >
                    {isUpdate ? "Update" : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal >

          <Modal
            centered
            show={photoShowPdf}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Body>
              <Col>
                <object width="100%" height="400" data={`http://192.168.50.23:3002/backend1/api/${photoSuratDinas}`} type="application/pdf"> </object>
              </Col>
            </Modal.Body>
          </Modal>

          <Modal
            size="xl"
            centered
            show={photoShow}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Photo Surat Dinas
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Col>
                <Image
                  className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                  src={`http://192.168.50.23:3002/backend1/api/${photoSuratDinas}`}
                  fluid
                />
              </Col>
            </Modal.Body>
          </Modal >

          <Modal
            size="xl"
            centered
            backdrop="static"
            keyboard={false}
            show={smShowInput}
            onHide={() => this.modalClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {isUpdate ? "Update" : "Input"}  Data Ruangan
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
                      label="Nama Ruang"
                      name="NamaRuang"
                      value={NamaRuang}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Lantai Ruang"
                      name="LantaiRuang"
                      value={LantaiRuang}
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
                      label="Tempat Ruang"
                      type="text"
                      name="TempatRuang"
                      value={TempatRuang}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Jumlah Kursi"
                      name="JumlahKursi"
                      value={JumlahKursi}
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
                      label="Nama Pengelola"
                      type="text"
                      name="namaPengelola"
                      value={namaPengelola}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                  <Col>

                    <TextField
                      required
                      fullWidth
                      id="outlined-password-input"
                      label="Nomor HP Pengelola"
                      name="nomorPengelola"
                      value={nomorPengelola}
                      onChange={(event) => this.changeTextForm(event)}
                    />
                  </Col>
                </Form.Group>

                {/* ///////////////////////// */}

                {isUpdate ? ("") : (
                  <div>
                    <span>Fasilitas :</span>

                    {users.map((user) => (
                      <React.Fragment key={user.key}>
                        <Form.Group as={Row} key={user.key}>
                          <Col>
                            <Text
                              value={user}
                              onChange={(inputUser) => this.onChange(inputUser)}
                            />
                          </Col>

                          <Col xs={2}>

                            {users.length !== 1 && (
                              <span
                                className={styles.boldremove}
                                type="button"
                                onClick={() => this.removeElement(user.key)}
                              >
                                Hapus
                              </span>)
                            }

                          </Col>
                        </Form.Group>
                      </React.Fragment>
                    ))}
                    <Col xs={2}>
                      <span type="button" className={styles.boldtambah} onClick={this.addElement}>
                        Tambah Lainya +
                      </span>
                    </Col>
                  </div>
                )}



                {/* ///////////////////////// */}


                <Form.Group as={Row}>
                  <Col>
                    <Form.Group as={Row}>
                      <Col xs={4}>
                        <Form.Group>
                          <Form.Label>Upload Foto Ruangan</Form.Label>
                          <div className={styles.rowEdit}>
                            <div
                              className={styles.edit}
                              onChange={(event) => this.changeImage(event)}
                              onClick={this.showOpenFileDlg}
                            >
                              <AddAPhotoIcon />
                              <input
                                ref={inputOpenFileRef}
                                type="file"
                                style={{ display: "none" }}
                              />
                            </div>
                            <img
                              src="/iconDelete.png"
                              alt=""
                              className={styles.iconDelete}
                              onClick={this.deleteImage}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Image
                          className={`${styles.hero} p-4 mb-4 d-block mx-auto`}
                          src={ruangBuktiSuratDinas ? ruangBuktiSuratDinas : dummy}
                          fluid
                        />
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

                    variant="outline-primary">Cancel</Button>
                </Col>
                <Col xs={2}>
                  <Button
                    className={styles.btSubmit}
                    variant="primary"
                    onClick={() => this.sendDataRuangan()}
                  >
                    {isUpdate ? "Update" : "Submit"}

                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal >

          <Modal
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
          <Modal
            centered
            show={showModalSucces}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              {modalMsg}
            </Modal.Body>
          </Modal >

          <Modal
            centered
            show={showModalDeleteRuangan}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              Apakah Anda Yakin Ingin Menghapus ?
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-end">
                <Row>
                  <Col>
                    <Button
                      variant="outline-primary"
                      onClick={() => this.modalPhotoClose()}
                    >Tidak</Button>
                  </Col>
                  <Col                >
                    <Button
                      variant="outline-danger"
                      onClick={() => this.deleteDataRuangan(data)}
                    >Yakin</Button>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Modal >

          <Modal
            size="xl"
            centered
            show={showModalFasilitas}
            onHide={() => this.modalPhotoClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={3}>
                  <div >Penanggung Jawab Ruangan </div>
                </Col>
                {dataRuanganById.length === 0 ? "" :
                  <Col>
                    : <span className="font-weight-bold">{dataRuanganById[0].ruangan_nama_pengelola}</span>
                  </Col>}

              </Row>
              <Row>
                <Col sm={3}>
                  <div >Contact Person  </div>
                </Col>
                {dataRuanganById.length === 0 ? "" :
                  <Col>
                    : <span className="font-weight-bold">{dataRuanganById[0].ruangan_nomor_pengelola}</span>
                  </Col>
                }

              </Row>
              <h5 className={"mt-5"}>Fasilitas yang Ada di Ruangan :</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Nama Barang </th>
                    <th className="text-center">Jumlah Barang</th>
                    <th className="text-center">Kualitas Barang</th>
                    {this.props.auth.data.user_role === "admin" ? (<th className="d-flex justify-content-center">Action</th>) : (null)}
                  </tr>
                </thead>
                <tbody>
                  {dataFasById === undefined ?
                    ("") : (dataFasById.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td> {item.nama_barang}</td>
                          <td> {item.jumlah_barang}</td>
                          <td> {item.fasilitas_barang}</td>
                          {
                            this.props.auth.data.user_role === "admin" ? (<td className="text-center"> <Col><Button onClick={() => this.EditDataFasilitas(item)}>Update</Button></Col></td>)
                              : ("")
                          }
                        </tr>
                      );
                    }))}
                </tbody>
              </Table>

              {this.props.auth.data.user_role === "admin" ? (
                <div>
                  <Col>
                    <span className={"mt-5"}>Add Fasilitas</span>
                    {users.map((user, index) => (

                      <Text
                        key={index}
                        value={user}
                        onChange={(inputUser) => this.onChange(inputUser)}
                      />
                    ))}

                    <span type="button" className={`${styles.boldtambah} mb-5`} onClick={this.addElement}>
                      Tambah Lainya +
                    </span>
                  </Col>
                  <div className="d-flex justify-content-end">
                    <Button
                      className={styles.btSubmit}
                      variant="primary"
                      onClick={() => this.postDataFasilitasRuangan()}
                    >Submit</Button></div>
                </div>) : ("")}

            </Modal.Body>
          </Modal >

          <Modal
            centered
            show={showModalEditFasilitas}
            onHide={() => this.modalEditClose()}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              ini edit fasilitas
              {users.map((user) => (
                <React.Fragment key={user.key}>
                  <Form.Group as={Row} key={user.key}>
                    <Col>
                      <Text
                        value={user}
                        onChange={(inputUser) => this.onChange(inputUser)}
                      />
                    </Col>

                    <Col xs={2}>

                      {users.length !== 1 && (
                        <span
                          className={styles.boldremove}
                          type="button"
                          onClick={() => this.removeElement(user.key)}
                        >
                          Hapus
                        </span>)
                      }

                    </Col>
                  </Form.Group>
                </React.Fragment>
              ))}
              <Button onClick={() => this.EditDataFasilitasConfirm()}>Submit</Button>
            </Modal.Body>
          </Modal >
          <Footer />
        </Container >

      </>
    );
  }
}
const mapDispatchToProps = { getPremiereAll, postRuangan, deleteRuangan, getbookingRuanganAll, postbookingRuangan, postwaitinglist, postWaitingListLebihSatu, getbookingRuanganAllTanpaFill, getwaitinglistAllTanpaFill, postlaporanRuangan, deleteBookingRuangan, getBookingUser, getWaitingListUser, updateDataBooking, deletewaitinglist, getFasilitasRuangan, getRuanganById, updateDataRuangan };

const mapStateToProps = (state) => ({
  movie: state.movie,
  ruangan: state.ruangan,
  bookingruangan: state.bookingruangan,
  idUser: state.user,
  auth: state.auth,
  datacoba: state.waitingList,
  waitingList: state.waitingList
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
