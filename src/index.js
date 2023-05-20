import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {IntlProviderWrapper} from "./utilities/Internationalization";
import Index from "./layouts/spinner";
import './index.scss';
import Global from "./utilities/Global";
import {BrowserRouter} from "react-router-dom";

const LazyApp = lazy(() => import("./App"))
ReactDOM.render(
  <Suspense fallback={<Index/>}>
    <BrowserRouter>
      <IntlProviderWrapper>
        <Global>
          <LazyApp/>
        </Global>
      </IntlProviderWrapper>
    </BrowserRouter>
  </Suspense>
  , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
