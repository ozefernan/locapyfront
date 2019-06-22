import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../css/home.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//JQUERY
import $ from 'jquery';
//JQUERY MASKS
import InputMask from 'react-input-mask';
//Componte de requests HTTPS
import axios from 'axios';
//Toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

class CadastroLocador extends Component {
    state = {
        toIndex: false,
    }
    redirectToIndex() {
        setTimeout(() => {
            this.setState(() => ({
                toIndex: true
            }))
        }, 5000);
    }
    ValidaCampos(campos) {
        //Valida campos vazios
        if (campos.nome_fantasia === '' ||
            campos.razao_social === '' ||
            campos.inscricao_estadual === '' ||
            campos.cnpj === '' ||
            campos.endereco === '' ||
            campos.telefone === '' ||
            campos.usuario === '' ||
            campos.email === '' ||
            campos.senha === '' ||
            campos.Termo === '') {
            return { "isValid": false, "msg": "Todos os campos são obrigatórios!" };
        }
        if (campos.perfil.usuario.password.length < 8) {
            return { "isValid": false, "msg": "A senha precisa ter pelo menos 8 dígitos!" };
        }
        return { "isValid": true }
    }
    ValidaTermo(termo) {
        if (termo) {
            return { "isValid": true };
        } else {
            return { "isValid": false, "msg": "Você precisa aceitar o termo" };
        }
    }

    PostLocador(e) {
        e.preventDefault();
        var url = 'http://localhost:8000/cadastro/locador/';
        var data = {};
        var header = {
            'Content-Type': "application/json",
        }
        data.nome_fantasia = $('#nome_fantasia').val();
        data.razao_social = $('#razao_social').val();
        data.inscricao_estadual = $('#inscricao_estadual').val();
        data.cnpj = $('#cnpj').val().replace(/[\.-/-]/g, "");
        data.endereco = $('#endereco').val();
        data.telefone = $('#telefone').val().replace(/[\(\)\.\s-]+/g, "");
        data.perfil = {
            "usuario": {
                "username": $('#usuario').val(),
                "email": $('#email').val(),
                "password": $('#senha').val(),
            }
        }
        var CheckTermo = $('#Termo').is(':checked');
        var valid = this.ValidaCampos(data);
        //Validação do termo.
        valid = this.ValidaTermo(CheckTermo);


        if (valid.isValid) {
            axios.post(url, data, header)
                .then(response => {
                    toast.success("Locador cadastrado com sucesso!");
                    this.redirectToIndex();
                })
                .catch(error => {
                    try {
                        var errorResponse = JSON.parse(JSON.stringify(error));
                        var errorMessages = [];

                        if (!errorResponse.response || errorResponse.response.status == 500) {
                            errorMessages.push("Erro interno no servidor...");
                        }
                        else if (errorResponse.response.status === 400) {
                            if (errorResponse.response.data.cnpj) {
                                errorMessages.push("CNPJ: " + errorResponse.response.data.cnpj[0])
                            }
                            if (errorResponse.response.data.perfil) {
                                if (errorResponse.response.data.perfil.usuario.username) {
                                    errorMessages.push("Username: " + errorResponse.response.data.perfil.usuario.username[0])
                                }
                                if (errorResponse.response.data.perfil.usuario.email) {
                                    errorMessages.push("E-Mail: " + errorResponse.response.data.perfil.usuario.email[0])
                                }
                            }
                        }
                        errorMessages.forEach(element => {
                            toast.error(element);
                        })
                    }
                    catch{
                        toast.error("Erro interno...");
                    }
                });
        }
        else {
            toast.error(valid.msg);
        }
    }
    componentDidMount() {
        toast.configure({
            autoClose: 5000,
        });
    }
    render() {
        if (this.state.toIndex === true) {
            return <Redirect to='/' />
        }
        return (
            <body>
                <div className='form'>
                    <div className="conteudoForm">
                        <form className="form-group" type="POST" id="formLocador">
                            <div className="userSection">
                                <button className="imagemusu">
                                    <div></div>
                                </button>
                                <div className="inputUserSection">
                                    <div className="form-group usu">
                                        <label htmlFor="usuario">Usuário</label>
                                        <div className="userDiv">
                                            <InputMask className="form-control" guide={true} id="usuario" placeholder="Digite o nome de usuário..." required />
                                        </div>
                                    </div>

                                    <div className="form-group usu">
                                        <label htmlFor="email">E-mail</label>
                                        <div className="userDiv">
                                            <InputMask className="form-control" type="email" guide={true} id="email" placeholder="Digite o Email..." required />
                                        </div>

                                    </div>

                                    <div className="form-group usu">
                                        <label htmlFor="senha">Senha</label>
                                        <div className="userDiv">
                                            <InputMask type="password" className="form-control" mask="" guide={true} id="senha" placeholder="Digite a Senha..." required />
                                        </div>

                                    </div>

                                    <div className="form-group usu">
                                        <label htmlFor="senha">Confirma Senha</label>
                                        <div className="userDiv">
                                            <InputMask type="password" className="form-control" mask="" guide={true} id="senha" placeholder="Digite novamente a Senha..." required />
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <hr className="mb-3"></hr>

                            <div className='row'>
                                <div className="form-group col-md-12">
                                    <label htmlFor="razao_social">Razão Social</label>
                                    <InputMask className="form-control" guide={true} id="razao_social" placeholder="Digite a razão social..." required />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="form-group col-md-9">
                                    <label htmlFor="nome_fantasia">Nome Fantasia</label>
                                    <InputMask className="form-control" guide={true} id="nome_fantasia" placeholder="Digite o nome fantasia..." required />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="telefone">Telefone</label>
                                    <InputMask className="form-control" mask="(99)99999-9999" guide={true} id="telefone" placeholder="Digite o telefone..." required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="cnpj">CNPJ</label>
                                    <InputMask className="form-control" mask="99.999.999/9999-99" guide={true} id="cnpj" placeholder="Digite o CNPJ..." required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inscricao_estadual">Inscrição Estadual</label>
                                    <InputMask maxLength="12" className="form-control" guide={true} id="inscricao_estadual" placeholder="Digite a inscrição estadual..." required />
                                </div>
                            </div>

                            <div className='row'>
                                <div className="form-group col-md-12">
                                    <label htmlFor="endereco">Endereço</label>
                                    <InputMask className="form-control" guide={true} id="endereco" placeholder="Digite o endereço..." required />
                                </div>
                            </div>

                            <hr className="mb-4"></hr>

                            <div className="form-check">
                                <input type="checkbox" id='Termo' name='Termo' className="form-check-input" />
                                <label className="form-check-label" htmlFor="Termo">Eu li e concordo com os termos de uso</label>
                            </div>

                            <div className="buttonSection">
                                <button type="submit" className="btn btn-cadastra" onClick={(e) => this.PostLocador(e)}>Cadastrar</button>
                            </div>
                            <ToastContainer />
                        </form>
                    </div>
                </div>
            </body>
        );
    }
}

export default CadastroLocador;
