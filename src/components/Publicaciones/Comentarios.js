import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import ErrorFatal from '../General/ErrorFatal';

const Comentarios = (props) => {

    if (props.coment_error) {
        return <ErrorFatal mensaje={props.coment_error} />
    }

    if (props.coment_cargando && !props.comentarios.length) {
        return <Spinner />
    }

    const ponerComentarios = () => (
        props.comentarios.map((comentario) => (
            <li key={comentario.id}>
                <b>
                    <u>
                        {comentario.email}
                    </u>
                </b>
                <br />
                {comentario.body}
            </li>
        ))
    );

    return (
        <ul>
            {ponerComentarios()}
        </ul>
    )
}

const mapSateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapSateToProps)(Comentarios);
