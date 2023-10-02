import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {isAuth} from './slices/isAuth';
import { navOpen } from './slices/openNav';
import {openPopup} from './slices/openPopup';
import { appMessage } from './slices/AppMessage';
import { cityPagePopup } from './slices/closeCityPopupWindow';

 const store = () =>
  configureStore({
    reducer: {
       [navOpen.name]: navOpen.reducer,
       [openPopup.name]: openPopup.reducer,
       [isAuth.name]: isAuth.reducer,
       [appMessage.name] : appMessage.reducer,
       [cityPagePopup.name]: cityPagePopup.reducer
    },
    devTools: true,
  })

export const wrapper = createWrapper(store)