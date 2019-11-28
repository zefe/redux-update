import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import ErrorFatal from '../General/ErrorFatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component {
    //async para asegurarnos de que primero nos traiga los usuarios, despues los posts del usuarios
    async componentDidMount() {
        //destructuring
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;
        //si no tenemos usuarios
        if (!this.props.usuariosReducer.usuarios.length) {
            //traemos usuarios
            await usuariosTraerTodos();
        }
        //manejar el error
        if (this.props.usuariosReducer.error) {
            return;
        }
        //si en 'publicacione_key' tiene el atributo key del usuario, si esta ahi es porque ya fuimos a buscar
        //las publicaciones y ya se las pusimos
        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])) {
            //si no traemos publicaciones
            publicacionesTraerPorUsuario(key);
        }
    }

    //aca si pidemos destructurar el usuarios reducer
    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if (usuariosReducer.error) {
            return <ErrorFatal mensaje={usuariosReducer.error} />
        }

        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner />
        }
        const nombre = usuariosReducer.usuarios[key].name;
        return (
            <h1>Publicaciones de {nombre} </h1>
        )
    };

    //
    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;
        //Si no hay usuarios no retorno nada, por que arriba ya estamos retornando Spinner
        if (!usuarios.length) return;
        if (usuariosReducer.error) return;
        //Si esta cargando, esta llendo por las publicaciones 
        if (publicacionesReducer.cargando) {
            return <Spinner />
        }
        //Si no fue exitoso retornamos el error
        if (publicacionesReducer.error) {
            return <ErrorFatal mensaje={publicacionesReducer.error} />
        }
        //En dado caso de que las publicaciones no tengan nada, retornamos nada
        if (!publicaciones.length) return;
        // ya que tenemos usuarios y publicaciones, necesitamos saber ir a las publicaciones y traerlas
        if (!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];
        //Si todo sale bien
        return publicaciones[publicaciones_key].map((publicacion) => (
            <div
                className='pub_titulo'
                key={publicaciones.id}
                onClick={() => alert(publicacion.id)}
            >
                <h2>
                    {publicacion.title}
                </h2>
                <h3>
                    {publicacion.body}
                </h3>
            </div>
        ));

    };

    render() {
        console.log(this.props)
        return (
            <div>
                {/*this.props.match.params.key */}
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer
    };
};

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
