import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FaxIcon from '@mui/icons-material/Fax';
import FacebookIcon from '@mui/icons-material/Facebook';
class Footer extends Component {
  render() {
    return (
      <>
        <footer className="mt-5">
          <Container fluid>
            <Row>
              <Col sm={4}>
                <p className={styles.bold}>
                  Kontak kami :
                </p>
                <p className={styles.semi11}>
                  <MailIcon /> : ruangrapat.ditjenp2p@gmail.com
                </p>
                <p className={styles.semi11}>
                  <p className="mr-1"><ContactPhoneIcon /> : Ibu Vera : +62 812-9317-4371 </p>
                  <p className={styles.margin}>   Bapak Wahyu : +62 895-3485-32700</p>
                </p>
                <p className={styles.semi11}>
                  <FaxIcon /> : 021-52921669
                </p>

              </Col>

              <Col sm={4}>
                <p className={styles.bold}>Alamat :</p>
                <p className={styles.semi}>
                  Jalan H.R Rasuna Said Blok X-5 Kavling 4-0 Jakarta 12950
                </p>
              </Col>
              <Col sm={4}>
                <p className={styles.bold}>Media Sosial</p>
                <p className={styles.semi}>
                  <InstagramIcon />  ditjenp2p
                </p>
                <p className={styles.semi}>
                  <FacebookIcon /> Ditjen PdanPp Kemkes
                </p>
              </Col>
            </Row>
            <Row className={`${styles.copyright} text-center mt-1`}>
              <Col>
                <p>COPYRIGHT 2022 KEMENTERIAN KESEHATAN REPUBLIK INDONESIA.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
