import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = (props) => {

    const putRows = () => props.usuarios.map((usuario, key) => (
        <tr key={usuario.id}>
            <td>
                {usuario.name}
            </td>
            <td>
                {usuario.email}
            </td>
            <td>
                {usuario.website}
            </td>
            <td>
                <Link to={`/publicaciones/${key}`}>
                    <div className="eye-solid3 icon"></div>
                </Link>
            </td>
        </tr>
    ));

    return (
        <div>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Enlace</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        putRows()
                    }
                </tbody>
            </table>
        </div>
    );
};

const mapSateToProps = (reducers) => {
    return reducers.usuariosReducer;
};

export default connect(mapSateToProps)(Tabla);
