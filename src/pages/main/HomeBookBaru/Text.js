import { Component } from 'react';
import TextField from '@mui/material/TextField';
import { Row, Col, Form } from 'react-bootstrap';
class Text extends Component {
  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.props.onChange({
      ...this.props.value,
      [name]: value,
    });
  };

  render() {
    const { value: user } = this.props;
    return (
      <>
        <Form.Group as={Row}>
          <Col>
            {/* <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Nama Barang"
              name="barang"
              value={user.barang}
              onChange={this.handleChange}
            /> */}
            <Form.Control
              type='text'
              placeholder='Nama Barang'
              name='barang'
              value={user.barang}
              onChange={(event) => this.handleChange(event)}
            />
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='Jumlah Barang'
              name='jumlahBarang'
              value={user.jumlahBarang}
              onChange={(event) => this.handleChange(event)}
            />
          </Col>
          <Col>
            <Form.Control
              type='text'
              placeholder='Kualitas Barang'
              name='kualitasBarang'
              value={user.kualitasBarang}
              onChange={(event) => this.handleChange(event)}
            />
          </Col>
        </Form.Group>
      </>
    );
  }
}

export default Text;
