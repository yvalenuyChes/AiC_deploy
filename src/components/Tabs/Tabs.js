import  { useState } from 'react'
import RegistrationTab from './RegistrationTab/RegistrationTab'
import { LoginTab } from './LoginTab/LoginTab'

import styles from './styles.module.scss'
import useWindowWidth from '@/custumHooks/useWindowWidth'
import { RegstrationTabMobile } from './RegistrationTab/RegstrationTabMobile/RegstrationTabMobile'

export const Tabs = () => {
   const [firstActivateTab, toggleFirstActivateTab] = useState(true)
   const [secondActivateTab, toggleSecondActivateTab] = useState(false)


   const toggleTab = () => {
      toggleFirstActivateTab(prev =>!firstActivateTab)
      toggleSecondActivateTab(prev => !secondActivateTab)
   }

   const width = useWindowWidth()


   return (
      <div className={styles.block_form}>
         <div className={styles.labels_container}>
            <label
               onClick={toggleTab}
               title="label-first"
               className={`
               ${
                  firstActivateTab 
                  ?  styles.tab + ' ' + styles.active 
                  :  styles.tab
               }`}
            >Авторизация</label>
            <label
               onClick={toggleTab}
               title="label-second"
               className={`
               ${
                  secondActivateTab 
                  ?  styles.tab + ' ' + styles.active 
                  :  styles.tab
               }`}
            >Регистрация</label>
         </div>
         {
            firstActivateTab
               ? <LoginTab/>
               : 
               width > 767
               ?
               <RegistrationTab/>
               : <RegstrationTabMobile/>
               
         }
      </div>
   )
}