import * as dispatchTypes from '../constants';



export const setQuotatioId = quotationId => dispatch => {
    dispatch({
        type: dispatchTypes.QUOTATION_ID,
        payload: quotationId,
    });
};
