import * as type from './types';


interface CurrencyData {
    id: number;
    prefix: string;
    short_key: string;
    rate: number;
    is_active: boolean;
}

export const getCurrency = (limit:number,page:number) => ({
    type: type.GET_CURRENCY_REQUESTED,
    payload: {limit,page},
});

export const selectCurrency = (currency: CurrencyData) => ({
    type: type.SELECT_CURRENCY_REQUESTED,
    payload: currency,
});

export const addCurrency = (formData: CurrencyData) => ({
    type: type.ADD_CURRENCY_REQUESTED,
    payload: formData,
});