import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import { View } from 'react-native';
import { Assunto } from '../../../models/assunto';

export class Principal extends Component {

    constructor(props) {
        super(props);
        this.state = {loading:true, assuntos:[]};

        this.visualizarAssunto = this.visualizarAssunto.bind(this);
    }

    componentDidMount() {
        Assunto.getAll().subscribe(assuntos => {
            this.setState({assuntos:assuntos});
            this.setState({loading:false});
        });
    }

    visualizarAssunto(assunto) {
        this.props.navigation.navigate('VisualizarAssunto', {assuntoId:assunto.pk()});
    }

    listaAssuntos = (assuntos) => {
        return (
            assuntos.map((assunto, i) => (
                <ListItem title={assunto.nome}
                    key={i}
                    bottomDivider={true}
                    onPress={() => this.visualizarAssunto(assunto)} />
            ))
        )
    }

    render() {
        return (
            <View>
                {this.state.loading ? <Text>Carregando assuntos...</Text> : this.listaAssuntos(this.state.assuntos)}
            </View>
        );
    }

}