import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jsPDF from 'jspdf';
import { DataGrid } from '@mui/x-data-grid';
import styles from './modalPDF.module.css';
import { Table } from 'react-bootstrap';

const GenerateInvoice = () => {
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'letter',
  });
  pdf
    .html(document.querySelector('#invoiceCapture'), {
      width: pdf.internal.pageSize.getWidth(),
      windowWidth: 1200,
      margin: [20, 5, 20, 20],
      html2canvas: { scale: 0.47 },
    })
    .then(() => {
      pdf.save('laporan.pdf');
    });
};
class InvoiceModal extends React.Component {
  render() {
    const time1 = new Date(this.props.FromDate);
    const timeFromDate = time1.toLocaleDateString('en', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    const time2 = new Date(this.props.ToDate);
    const timeToDate = time2.toLocaleDateString('en', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    });
    return (
      <div>
        <Modal size='xl' show={this.props.show} onHide={this.props.closeModal}>
          <div id='invoiceCapture'>
            <h2 className={`${styles.centertext} mt-5`}>
              LAPORAN PEMINJAMAN RUANG RAPAT DITJEN P2P ko
            </h2>
            <h2 className={`${styles.centertext} mt-5`}>
              PERIODE {timeFromDate} - {timeToDate}
            </h2>
            <div className='p-4'>
              {this.props.ruangDirektorat === 'Sekertariat P2P' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>Total Unit kerja Tu. Dirjen</td>
                      <td>: {this.props.arrayTuDirjen.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Tu.sesditjen</td>
                      <td>: {this.props.arrayTuSesDitJen.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Subag Adum Sekertariat P2P</td>
                      <td>: {this.props.arraySubagAdum.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Program dan Informasi</td>
                      <td>: {this.props.arrayProgramdanInforma.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Hukum, Organisasi dan Hubungan
                        Masyarakat
                      </td>
                      <td>: {this.props.arrayHukum.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Keuangan dan BMN</td>
                      <td>: {this.props.arrayKeuangandanBMN.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Kepegawaian dan Umum</td>
                      <td>: {this.props.arrayKepegdanUmum.length}</td>
                    </tr>
                    <tr>
                      <td>Total User Peminjam Per Direktorat</td>
                      <td>: {this.props.arraydirektorat.length}</td>
                    </tr>
                  </table>
                </div>
              ) : (
                ''
              )}

              {/* ==||== */}

              {this.props.ruangDirektorat === 'P2PM' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>Total Unit kerja Subag Adum P2PM :</td>
                      <td>{this.props.arraySubagAdumP2PM.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Turbeckulosis dan infeksisaluran
                        pernapasan akut (ISPA) :
                      </td>
                      <td>{this.props.arrayISPA.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja HIV, Penyakit Infeksi Menular Seksual
                        (PIMS), Hepatitis dan (PISP) :
                      </td>
                      <td>{this.props.arrayHIVPIMS.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Neglected Disease (Penyakit Tropis
                        Terabaikan) :
                      </td>
                      <td>{this.props.arrayNeglected.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Zoonosis dan Penyakit Akibat Gigitan
                        Hewan Berbisa dan Tanaman Beracun :
                      </td>
                      <td>{this.props.arrayZoonosis.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Penyakit Tular Vektor :</td>
                      <td>{this.props.arrayPenyakitTular.length}</td>
                    </tr>
                  </table>{' '}
                </div>
              ) : (
                ''
              )}

              {/* ==||== */}

              {this.props.ruangDirektorat === 'Pengelolaan  Imunisasi' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>
                        Total Unit kerja Subag Adum Pengelolaan Imunisasi :
                      </td>
                      <td>{this.props.arraySubagAdumPengelolaan.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Imunisasi Dasar dan Anak Usia di bawah
                        dua tahun (Baduta) :
                      </td>
                      <td>{this.props.arrayImunisasiBaduta.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Imunisasi Tambahan Dan Khusus :</td>
                      <td>{this.props.arrayImunisasiTambahan.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Imunisasi Wanita Usia Subur (WUS) dan
                        (PD31),(KIPI) :
                      </td>
                      <td>{this.props.arrayImunisasiWanitaUsiaSubur.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Imunisasi Usia Sekolah dan Sumber Daya
                        Imunisasi :
                      </td>
                      <td>{this.props.arrayImunisasiUsiaSekolah.length}</td>
                    </tr>
                  </table>
                </div>
              ) : (
                ''
              )}

              {/* ==||== */}

              {this.props.ruangDirektorat === 'P2PTM' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>Total Unit kerja Subag Adum P2PTM :</td>
                      <td>{this.props.arraySubagAdump2ptm.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Gangguan Indra Dan Funsional :</td>
                      <td>{this.props.arrayGangguanIndra.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Diabetes Melitus dan Gangguan Metabolik
                        :
                      </td>
                      <td>{this.props.arrayDiabetesMilitus.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Jantung Dan Pembulu Darah :</td>
                      <td>{this.props.arrayJantungdanPembuludarah.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Kangker dan Kelainan Darah :</td>
                      <td>{this.props.arrayKangerdanKelainanDarah.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Paru Kronik dan Gangguan Imunologi :
                      </td>
                      <td>{this.props.arrayParuKroni.length}</td>
                    </tr>
                  </table>
                </div>
              ) : (
                ''
              )}

              {/* ==||== */}

              {this.props.ruangDirektorat === 'Penyehatan Lingkungan (PL)' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>Total Unit kerja Subag Adum PL :</td>
                      <td>{this.props.arraySubagAdumPL.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Penyehatan Air dan Sanitasi Dasar :
                      </td>
                      <td>{this.props.arrayPenyehatanAir.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Penyehatan Pangan :</td>
                      <td>{this.props.arrayPenyehatanPangan.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Penyehatan Udara,Tanah dan Kawasan :
                      </td>
                      <td>{this.props.arrayPenyehatanUdara.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Pengamanan Limbah dan Radiasi :</td>
                      <td>{this.props.arrayPengamananLimbah.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Adaptasi Perubahan Iklim dan
                        Kebencanaan Lingkungan :
                      </td>
                      <td>{this.props.arrayAdaptasiPerubahan.length}</td>
                    </tr>
                  </table>
                </div>
              ) : (
                ''
              )}

              {/* ==||== */}

              {this.props.ruangDirektorat === 'SUKARKES' ? (
                <div>
                  <table className={styles.table}>
                    <tr>
                      <td>Total Unit kerja Subag Adum SUKARKES :</td>
                      <td>{this.props.arraySubagAdumSuarkes.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Kekarantinaan Kesehatan :</td>
                      <td>{this.props.arrayKekarantinaankesehatan.length}</td>
                    </tr>
                    <tr>
                      <td>
                        Total Unit kerja Pengelolaan Laboratorium Kesehatan
                        Masyarakat :
                      </td>
                      <td>{this.props.arrayPengelolaanLaboratorium.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Pengendalian Vektor :</td>
                      <td>{this.props.arrayPengendalianVetor.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Penyakit Infeksi Emerging :</td>
                      <td>{this.props.arrayPenyakitInfeksi.length}</td>
                    </tr>
                    <tr>
                      <td>Total Unit kerja Surveilans :</td>
                      <td>{this.props.arraySurveilans.length}</td>
                    </tr>
                  </table>
                </div>
              ) : (
                ''
              )}

              <div className='mt-5 mb-5'>
                {/* <div >
                  <DataGrid
                    autoHeight
                    rows={this.props.data}
                    columns={this.props.columns}
                    pageSize={[this.props.data.length]}
                    rowsPerPageOptions={[this.props.data.length]}
                  />
                </div> */}
                <div>
                  {/* {(this.props.dataLaporanTanggal.length > 0 && this.props.ruangDirektorat.length > 0) ? (this.props.selectedFilter.length > 0 ? (
                    <DataGrid
                      autoHeight
                      rows={this.props.element}
                      columns={this.props.columns}
                      pageSize={[this.props.element.length]}
                      rowsPerPageOptions={[this.props.element.length]}
                      getRowHeight={() => 100}
                    />) : (
                    <DataGrid
                      autoHeight
                      rows={this.props.arraydirektorat}
                      columns={this.props.columns}
                      pageSize={[this.props.arraydirektorat.length]}
                      rowsPerPageOptions={[this.props.arraydirektorat.length]}
                      getRowHeight={() => 100}
                    />
                  )) : (
                    <DataGrid
                      autoHeight
                      rows={this.props.dataLaporanTanggal}
                      columns={this.props.columns}
                      pageSize={[this.props.dataLaporanTanggal.length]}
                      rowsPerPageOptions={[this.props.dataLaporanTanggal.length]}
                      getRowHeight={() => 100}
                    />
                  )} */}

                  <div className='mt-5'>
                    <Table bordered hover variant='white'>
                      <thead className='text-center'>
                        <tr className={styles.witdthKolom}>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Unit Kerja</th>
                          <th>Keterangan Kegiatan Acara</th>
                          <th>Tanggal Mulai</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      {this.props.dataLaporanTanggal.map((item, index) => {
                        console.log(
                          'Data bismillah',
                          this.props.dataLaporanTanggal
                        );
                        return (
                          <tbody>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.booking_ruangan_nama}</td>
                              <td>{item.booking_ruangan_unitkerja}</td>
                              <td>
                                {item.booking_ruangan_keterangan_kegiatan_acara}
                              </td>
                              <td>
                                {new Date(
                                  parseInt(item.booking_ruangan_tanggal)
                                ).toLocaleDateString('en-CA')}
                              </td>
                              <td>{item.booking_ruangan_email}</td>
                              <td>{item.status_booking_ruangan}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pb-4 px-4'>
            <Row>
              <Col>
                <Button
                  variant='outline-primary'
                  className='d-block w-100 mt-3 mt-md-0'
                  onClick={GenerateInvoice}
                >
                  Download PDF
                </Button>
              </Col>
            </Row>
          </div>
          {/* </Modal > */}
        </Modal>
        <hr className='mt-4 mb-3' />
      </div>
    );
  }
}

export default InvoiceModal;
