import * as dispatchTypes from '../constants';

let initialState = {
    jobid: null,
    jobDetail: '',
    navigateToJob: false,
    orderId: null,
    orderStatus: null,
    quoteCreated: false,
    quoteApproved: false,
    jobClosed: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.JOB_ID:
            return { ...state, jobId: action.payload };
        case dispatchTypes.SHOW_JOB_DETAIL:
            return { ...state, jobDetail: action.payload, navigateToJob: action.payloadShow };
        case dispatchTypes.ORDER_ID:
            return { ...state, orderId: action.payload };
        case dispatchTypes.ORDER_STATUS:
            return { ...state, orderStatus: action.payload };
        case dispatchTypes.QUOTE_CREATED:
            return { ...state, quoteCreated: action.payload };
        case dispatchTypes.QUOTE_APPROVED:
            return { ...state, quoteApproved: action.payload };
        case dispatchTypes.JOB_CLOSED:
            return { ...state, jobClosed: action.payload };
        default:
            return state;
    }
}