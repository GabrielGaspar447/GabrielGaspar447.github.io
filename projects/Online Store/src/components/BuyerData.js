import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class BuyerData extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      cpf: '',
      email: '',
      tel: '',
      cep: '',
      end: '',
    };
  }

  inputHandler = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, cpf, email, tel, cep, end } = this.state;
    return (
      <div>
        <span>Informações do comprador</span>
        <input
          type="text"
          onChange={ this.inputHandler }
          value={ name }
          name="name"
          placeholder="Nome Completo"
        />
        <input
          type="text"
          onChange={ this.inputHandler }
          value={ cpf }
          name="cpf"
          placeholder="CPF"
        />
        <input
          type="email"
          onChange={ this.inputHandler }
          value={ email }
          name="email"
          placeholder="Email"
        />
        <input
          type="text"
          onChange={ this.inputHandler }
          value={ tel }
          name="tel"
          placeholder="Telefone"
        />
        <input
          type="text"
          onChange={ this.inputHandler }
          value={ cep }
          name="cep"
          placeholder="CEP"
        />
        <input
          type="text"
          onChange={ this.inputHandler }
          value={ end }
          name="end"
          placeholder="Endereço"
        />
      </div>
    );
  }
}

export default BuyerData;
