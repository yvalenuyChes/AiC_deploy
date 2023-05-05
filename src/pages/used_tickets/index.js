import Loader from "@/components/Loader/Loader"
import { useState, useEffect } from "react"
import axios from "axios"
import  Ticket  from "../profile/components/Ticket/Ticket"
import MainPage from "@/layout/MainPage"
import styles from './styles.module.scss'
import Cookies from 'universal-cookie'

export default function UsedTickets(){

   const [userData, setUserData] = useState(null)

   useEffect(()=>{
      const cookies = new Cookies()

      const configuration = {
         method:'GET',
         url:'https://aic-api.onrender.com/user',
         headers: {
            Authorization: cookies.get('TOKEN')
         }
      }
      axios(configuration)
      .then(result => setUserData(result.data) )
      .catch(e => console.log(e))
}, [])

   


   return(
      <MainPage>
      <div className={styles.container} >
         <h2>Использованные билеты</h2>
         {
            userData
            ?
               userData.tickets  !==  0
               ?  
               <div className={styles.used_tickets_container}  >
                  {userData.tickets.map((ticket, key) => {
                  if(ticket.dateCome > (new Date().toISOString())){
                     return null
                  }else{
                     return(
                        <Ticket
                        city={ticket.name}
                        personNumber={ticket.personNumber}
                        dateFrom={ticket.dateFrom}
                        dateCome={ticket.dateCome}
                        price={ticket.price}
                        key={key}
                       />
                     )
                  }
                 
               })}
               </div>
               
              

               : <div>Нет использованных билетов</div>
            : <Loader/>
         }
      </div>
      </MainPage>
      
   )
}