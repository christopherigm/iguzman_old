import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from 'src/routes';
import {
  Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController,
  PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale,
  RadialLinearScale, TimeScale, TimeSeriesScale, Filler, Legend, Title, Tooltip
} from 'chart.js';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y, Autoplay, Manipulation,
  EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs
} from 'swiper';
import 'swiper/scss';
import 'swiper/css/bundle';
// import reportWebVitals from './reportWebVitals';
import 'src/constants/Constants.scss';
import { Provider } from 'react-redux';
import store, {
  persistor
} from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'rrmc/dist/cjs/index.css';

const container: any = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

Chart.register(
  ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController,
  PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale,
  RadialLinearScale, TimeScale, TimeSeriesScale, Filler, Legend, Title, Tooltip
);

// https://swiperjs.com/demos
SwiperCore.use([
  Navigation, Pagination, Scrollbar, A11y, Autoplay, Manipulation,
  EffectFade, EffectCube, EffectFlip, EffectFlip, EffectCoverflow, Thumbs
]);
