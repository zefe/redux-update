import {
    ACTUALIZAR,
    CARGANDO,
    ERROR,
    COMENT_CARGANDO,
    COMENT_ERROR,
    COMENT_ACTUALIZAR
} from '../types/publicacionesTypes'; //Action type

//Estado inicial de usarios
const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    coment_cargando: false,
    coment_error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
                cargando: false,
                error: ''
            }

        case CARGANDO:
            return {
                ...state,
                cargando: true
            };

        case ERROR:
            return {
                ...state,
                error: action.payload,
                cargando: false
            };

        case COMENT_ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
                coment_cargando: false,
                coment_error: ''
            }

        case COMENT_CARGANDO:
            return {
                ...state,
                coment_cargando: true
            };

        case COMENT_ERROR:
            return {
                ...state,
                coment_error: action.payload,
                coment_cargando: false
            };

        default: return state;
    }
}