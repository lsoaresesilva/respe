import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Usuario from '../../models/usuario';


export class Login extends Component {

    //usuario;

    constructor(props) {
        super(props);
        this.state = { usuario: new Usuario(null) }
        this.entrar = this.entrar.bind(this);
    }

    entrar() {
        Usuario.logar(this.state.usuario).subscribe(resultado => {
            if(resultado)
                this.props.navigation.navigate('Principal');
            else{
                alert("Usuário ou senha inválidos.");
            }
        }, err => {
            alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        });
    }

    render() {
        
        return (
            <View style={{flex: 1, flexDirection: 'column', width:'100%', height:'100%', justifyContent: 'center'}}>
                
                    <Text style={{width:'80%'}}>E-mail</Text>
                    <Input style={{width:'80%'}} placeholder="Digite aqui o seu e-mail."
                            onChangeText={email => {
                                this.setState(
                                    (state, props) => ({
                                        //state.usuario.email = email;
                                        usuario: { ...state.usuario, email: email }
                                    })
                                )
                            }}
                            />
                    
                    <Text >Senha</Text>
                    <Input  
                            placeholder="Digite aqui a sua senha."
                            onChangeText={senha => {
                                this.setState(
                                    (state, props) => ({
                                        //state.usuario.email = email;
                                        usuario: { ...state.usuario, senha: senha }
                                    })
                                )
                            }}
                        />
                    <View style={{flexDirection:'row', marginTop:10, justifyContent:'center'}}>
                        <Button onPress={this.entrar} title="Entrar" style={{width:'200px'}} />
                    </View>
                    
            </View>
        );
    }

}