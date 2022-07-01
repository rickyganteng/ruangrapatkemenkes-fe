import { Component } from "react";
import TextField from '@mui/material/TextField';
import { Row, Col, Form } from "react-bootstrap";
class Text extends Component {
  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.props.onChange({
      ...this.props.value,
      [name]: value
    });
  };

  render() {
    const { value: user } = this.props;
    console.log('qqqq', this.props);
    return (
      <>
        <Form.Group as={Row}>
          <Col>
            <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Nama Barang"
              name="barang"
              value={user.barang}
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Jumlah Barang"
              name="jumlahBarang"
              value={user.jumlahBarang}
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Kualitas Barang"
              name="kualitasBarang"
              value={user.kualitasBarang}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default Text;
