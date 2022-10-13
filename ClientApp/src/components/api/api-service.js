import {createStore} from 'devextreme-aspnet-data-nojquery';
import ArrayStore from "devextreme/data/array_store";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import {toast} from "react-hot-toast";

const apiUrl = '/api/';
let token = localStorage.getItem('token') || '';

export const setToken = (t) => {
    token = t;
    localStorage.setItem('token', t);
}

export const getToken = () => token;


export const getDsOptions = (url, options = {}) => {
    return new DataSource({
        store: getDs(url.toLowerCase(), options),
        ...options
    });
}

export const getDsOptionsLookup = (url, options) => {
    return {
        store: getDs(url.toLowerCase(), options),
        ...options
    }
}

export const getDsLookup = (api, options  = {}, display = 'name', key = 'id') => {
    options = {...options, ...{
        select: [key, display],
    }}

    return {
        dataSource: getDsOptionsLookup(api, {
            paginate: true,
            pageSize: 5,
            ...options,
        }),
        valueExpr: key,
        displayExpr: display,
        paginate: true,
        pageSize: 5,
        ...options,
    };
}

export const getArray = (array, pageSize = 8) => {
    return {
        store: new ArrayStore({
            key: "Id",
            data: array,
        }),
        paginate: true,
        pageSize: pageSize,
    }
}

export const getDs = (api, customOptions = {}) => {
    const url = apiUrl + api.toLowerCase();
    return createStore({
        key:  'id',
        loadUrl: url,
        insertUrl: url,
        updateUrl: url,
        deleteUrl: url,
        onBeforeSend: (operation, ajaxSettings) => {
            ajaxSettings.headers = {
                'Authorization': token
            };
        },
        ...customOptions
    });
};

export const insertFile = async (api, values, file) => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("values", JSON.stringify(values));
    let response = await fetch('/api/archivos', {method: 'POST', body: formData,});
    return await response.json();
};

export const downloadFile = async (values) => {
    await toast.promise(downloadFileBack(values), {
        error: "Error al descargar el archivo!",
        success: "Archivo descargado correctamente!",
        loading: "Descargando archivo...",
    });
}

const downloadFileBack = async (values, modo = "ruta") => {
    let formData = new FormData();
    values.modo = modo;
    formData.append("values", JSON.stringify(values));
    let response = await fetch('/api/downloadFile', {method: 'POST', body: formData,})
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = response.headers.get('Content-Disposition').split(';')[1].split('=')[1].replace(/\"/g, '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
