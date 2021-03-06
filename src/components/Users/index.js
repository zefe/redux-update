import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';
import Spinner from '../General/Spinner';
import ErrorFatal from '../General/ErrorFatal';
import Tabla from '../../components/Users/Tabla';

class Users extends Component {

    componentDidMount() {
        //si no hay usuarios ve y traerlos
        if (!this.props.usuarios.length) {
            this.props.traerTodos();
        }
        //si ya tenemos usuarios no hagas nada
    }

    ponerContenido = () => {
        if (this.props.cargando) {
            return (
                <Spinner />
            );
        }

        if (this.props.error) {
            return (
                <ErrorFatal mensaje={this.props.error} />
            );
        }

        return <Tabla />
    };





    render() {
        return (
            <div>
                <h1>Usuarios</h1><br></br>
                {this.ponerContenido()}
            </div>
        )
    }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps, usuariosActions)(Users);
