import React from 'react'
import Form from 'react-bootstrap/Form'

const Input = (props) => {

  return (
    <Form.Group className={props.className} controlId={props.id}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type}  value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
      <Form.Text className="text-muted">
        {props.infoText}
      </Form.Text>
    </Form.Group>
  )
}

const Select = (props) => {
  return (
    <Form.Group className="mb-3">
    <Form.Label>{props.label}</Form.Label>
    <Form.Select value={props.value} onChange={props.onChange}>
      {
        props.options.map((option) => (
          <option key={option.id} value={option.value}>{option.value} </option>
        ))
      }
    </Form.Select>
  </Form.Group>
  )
}
export default Input
export { Select }
