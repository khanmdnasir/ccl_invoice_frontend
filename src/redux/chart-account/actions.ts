import * as type from './types';


export const getChartAccount = (limit:number,page:number) => ({
    type: type.GET_CHARTACCOUNT_REQUESTED,
    payload: {limit,page},
});


export const addChartOfAccount  = (formData: any) => ({
    type: type.ADD_CHART_OF_ACCOUNT_REQUESTED,
    payload: formData,
});

