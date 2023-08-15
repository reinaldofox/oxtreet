import React, { useContext } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { PessoaContext } from '../../../contexts/PessoaContext'
import "./CadastroPessoa.css";

const CadastroPessoa = (props) => {
  const pessoaContext = useContext(PessoaContext);
  const { pessoa, dispatch } = pessoaContext;

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={pessoa.nome}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
                  payload: { key: "nome", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={2}>
            <Form.Label>CPF/CNPJ</Form.Label>
            <Form.Control
              value={pessoa.cpfCnpj}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
                  payload: { key: "cpfCnpj", value: ev.target.value },
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={3}>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={pessoa.email}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
                  payload: { key: "email", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={2}>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              value={pessoa.telefone}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
                  payload: { key: "telefone", value: ev.target.value },
                })
              }
            />
          </Col>
          <Col xs={2}>
            <Form.Label>Celular</Form.Label>
            <Form.Control
              value={pessoa.celular}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
                  payload: { key: "celular", value: ev.target.value },
                })
              }
            />
          </Col>
          {props.tipo == 'pessoa' && 
            <Col xs={2}>
              <Form.Label>Origem</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className="primary">
                  {pessoa.origem || "Selecione"}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  onClick={(ev) => {
                    ev.preventDefault();
                    dispatch({
                      type: "fillpessoa",
                      payload: { key: "origem", value: ev.target.textContent },
                    });
                  }}
                >
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Mercado Livre
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Loja Online
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Instagram
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Pessoa Próxima
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Indicação
                  </Dropdown.Item>
                  <Dropdown.Item as="button" value={pessoa.canal}>
                    Venda Direta
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          }
        </Row>
        <Row className="mb-3">
          <Col xs={8}>
            <Form.Label>Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={pessoa?.info}
              onChange={(ev) =>
                dispatch({
                  type: "fillpessoa",
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

export default CadastroPessoa;
