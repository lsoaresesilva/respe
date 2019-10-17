import React, {Component} from 'react'
import {Text} from 'react-native-elements';
import { Assunto } from '../../../models/assunto';

export class VisualizarAssunto extends Component{

    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.state = {loading:true, assunto: {}};
        this.dadosAssunto = this.dadosAssunto.bind(this);
        Assunto.get(navigation.getParam("assuntoId")).subscribe(assunto=>{
            this.setState({assunto:assunto});
            this.setState({loading:false});
        });
    }

    dadosAssunto = () => {
        return (
            <Text>{this.state.assunto.nome}</Text>
        );
    }

    render(){
        return (
            (this.state.loading?<Text>Carregando assunto...</Text>:this.dadosAssunto())
            
        );
    }
}