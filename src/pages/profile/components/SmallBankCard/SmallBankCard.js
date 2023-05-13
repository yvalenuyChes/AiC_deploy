import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { setColor, setMessage, removeMessage, removeColor } from '@/redux/slices/AppMessage'
import axios from 'axios'
import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'


export default function SmallBankCard ({
   cardNumber,
   brand,
   bank,
   userEmail,
   setReloadCards
}) {

   const number =  cardNumber ? cardNumber.toString() : ''

   const variants = {
		visible: {opacity : 1, transition:{duration:1}},
		hidden: {opacity:0}
	 }

   const [active, setActive] = useState(false)

   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [AiC_creditCard, setAiC_creditCard] = useState(null)

   useEffect(() => {
      setAiC_creditCard(localStorage.getItem('AiW_Credit_Card')) 
   }, [active])

   const removeCardHandler = () => {
      setLoading(true)
      const configuration = {
         method:'post',
         url:'https://aic-api.onrender.com/delete_card',
         data:{
            email: userEmail,
            cardNumber: cardNumber.toString()
         }
      }


      axios(configuration)
      .then(result=> {
         dispatch(setMessage(`${result.data.message}`))
         dispatch(setColor(`${result.data.color}`))
         setReloadCards(Date.now())
         if(window !== undefined){
            localStorage.removeItem('AiW_Credit_Card')
         }
        
      })
      .then(setTimeout(()=> {
         dispatch(removeMessage())
         dispatch(removeColor())
      }, 3000))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
   }

   useEffect(()=> {
      setReloadCards(Date.now())
   }, [AiC_creditCard])

   const selectDefoultCard = () => {
      if(window !== undefined){
         localStorage.setItem('AiW_Credit_Card', number)
       
        setAiC_creditCard(localStorage.getItem('AiW_Credit_Card'))
      }

      setReloadCards(prev => prev + Date.now())
   }

   const controls = useAnimation()
	const [ref, inView] = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])

   return(
      <motion.div
         ref={ref}
         animate={controls}
         variants={variants}
         initial='hidden'
      >
 <div
      className={
         number == AiC_creditCard
         ?    
         active
            ?  styles.smallBankCard + ' ' + styles[bank] + ' ' + styles.selectedCard + ' ' + styles.active
            :  styles.smallBankCard + ' ' + styles[bank] + ' ' + styles.selectedCard
         :     
         active
            ?   styles.smallBankCard + ' ' + styles[bank] + ' ' +  styles.active
            :   styles.smallBankCard + ' ' + styles[bank]
       
         }
         onClick={() => setActive(prev => !prev)}
         
         >
         {
            loading
            ? <div className={styles.smallBankCard__loader} ><Loader/></div>

            :
            <>
            <div className={styles.front} >
               <div className={styles.smallBankCard_number} > **** {number.substring(number.length - 4)} </div>
                  <div
                  className={styles.smallBankCard_brand + ' ' + styles[brand]}
                  />
            </div>
             <div className={styles.back} >
               <div className={styles.smallBankCard_buttons} >
                     <button 
                     disabled={!active}
                     className={styles.smallBankCard__select + ' ' + styles.smallBankCard__button}
                     onClick={selectDefoultCard}
                     >Выбрать для оплаты</button>
                     <button 
                      disabled={!active}
                     className={styles.smallBankCard__remove + ' ' + styles.smallBankCard__button} 
                     onClick={removeCardHandler}
                     >Удалить карту</button>
                  </div>
             </div>
              
            </>
            
         }
        
         </div>
      </motion.div>
     
      
   )
}