import React, { useContext, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { PessoaContext } from '../../../contexts/PessoaContext'
import API from "../../../utils/API";
// import './CadastroPessoa.css'

const CadastroEndereco = () => {
  const pessoaContext = useContext(PessoaContext);
  const { pessoa, dispatch } = pessoaContext;

  const numeroRef = useRef();

  let enderecoCep = {
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
  };

  const buscaEnderecoCep = async () => {
    // await API.fetchRequest(
    //   "GET",
    //   "https://viacep.com.br/ws/" + pessoa.endereco.cep + "/json/"
    // )
  
    await API.fetchRequest(
      "GET",
      "https://brasilapi.com.br/api/cep/v2/" + pessoa.endereco.cep
    )
      .then((data) => preencheCamposEndereco(data))
      // .catch(error => Dialog.show('info', 'Não foi possivel buscar o endereço pelo CEP'))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (pessoa.endereco.cep?.length > 7) {
      buscaEnderecoCep();
    }
  }, [pessoa.endereco.cep]);

  const preencheCamposEndereco = (data) => {
    enderecoCep = {
      rua: data.street,
      numero: "",
      bairro: data.neighborhood,
      cep: data.cep,
      complemento: "",
      cidade: data.city,
      uf: data.state,
      info: "",
    };
    dispatch({
      type: "setaddress",
      payload: { endereco: { ...enderecoCep } },
    });
    numeroRef.current.focus();
  };

  return (
    <>
      <Form>       
        <Row className="mb-3">
          <Col xs={1}>
            <Form.Label>CEP</Form.Label>
            <Form.Control
              value={pessoa.endereco?.cep}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "cep", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={4}>
            <Form.Label>Rua</Form.Label>
            <Form.Control
              value={pessoa.endereco?.rua}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: {
                    key: "rua",
                    value: ev.target.value,
                  },
                })
              }
            />
          </Col>
          <Col xs={1}>
            <Form.Label>Número</Form.Label>
            <Form.Control
              value={pessoa.endereco?.numero}
              ref={numeroRef}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "numero", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={2}>
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              value={pessoa.endereco?.complemento}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "complemento", value: ev.target.value },
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={4}>
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              value={pessoa.endereco?.bairro}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "bairro", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              value={pessoa.endereco?.cidade}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "cidade", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={1}>
            <Form.Label>UF</Form.Label>
            <Form.Control
              value={pessoa.endereco?.uf}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "uf", value: ev.target.value },
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={8}>
            <Form.Label>Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={pessoa.endereco?.info}
              onChange={(ev) =>
                dispatch({
                  type: "filladdress",
                  payload: { key: "info", value: ev.target.value },
                })
              }
            />
          </Col>
        </Row>        
      </Form>
    </>
  );
};

export default CadastroEndereco;
