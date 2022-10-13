import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './configuration/serviceWorkerRegistration';
import reportWebVitals from './configuration/reportWebVitals';
import config from "devextreme/core/config"
import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages,  } from "devextreme/localization";

config({
    editorStylingMode: "outlined",
    defaultCurrency: 'COP',
    defaultDateType: 'date',
    defaultUseCurrencyAccountingStyle: true,
})

loadMessages(deMessages);
locale(navigator.language)

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>);

serviceWorkerRegistration.unregister();
reportWebVitals();
