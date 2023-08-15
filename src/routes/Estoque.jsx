import React from 'react';
import CadastroProduto from '../components/forms/Produto/CadastroProduto';
import OxTable from '../components/layout/Table';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Estoque = () => {

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>

    <Tabs variant="pills" className="mb-3" >
      
      <Tab eventKey="produtos" title="Produtos">
        <hr />
        <OxTable />
      </Tab>

      <Tab eventKey="adicionar" title="Adicionar">
        <hr />
        <CadastroProduto />      
      </Tab>

      <Tab eventKey="pesquisar" title="Pesquisar">
      <hr />
      Aqui será o formulário de pesquisa
      </Tab>
      
      <Tab eventKey="grades" title="Grades">
      <hr />
          <h5>Grades</h5>
          Filtrar grades por um select de produtos
        </Tab>
        
    </Tabs>    

    {/* <Modal show={show} onHide={handleClose} size="xl" centered backdrop="static">

      <Modal.Header className='text-center' closeButton>          
        <h5> Cadastrar novo produto </h5>
      </Modal.Header>

      <Modal.Body>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Label>Modelo</Form.Label>
          <Form.Control id='modelo' />
        </Col>
        <Col xs={3}>
          <Form.Label>Tipo</Form.Label>
          <Form.Control id='tipo' />
        </Col>
        <Col xs={3}>
          <Form.Label>Fabricante</Form.Label>
          <Form.Select id='fornecedorid'>
            <option>Escolha...</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>
          <Form.Label>Cor</Form.Label>
          <Form.Select>
            <option>Escolha...</option>              
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Form.Label>Tamanho</Form.Label>
          <Form.Select>
            <option>Escolha...</option>              
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Form.Label>SKU</Form.Label>
          <Form.Control />
        </Col>
        <Col xs={2}>
          <Form.Label>Código de Barra</Form.Label>
          <Form.Control />
        </Col>
        <Col xs={2}>
          <Form.Label>Preço Compra</Form.Label>
          <Form.Control />
        </Col>
        <Col xs={2}>
          <Form.Label>Preço Venda</Form.Label>
          <Form.Control />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col >
          <Form.Label>Info</Form.Label>
          <Form.Control as="textarea" />
        </Col>
      </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" type="submit"> Vender </Button>
        <Button variant="danger" onClick={handleClose} > Cancelar </Button>
      </Modal.Footer>

    </Modal>       */}
    </>
  )
}

export default Estoque