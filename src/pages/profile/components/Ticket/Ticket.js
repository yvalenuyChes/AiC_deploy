import { useEffect } from 'react'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import moment from 'moment'

import styles from './style.module.scss'

export default function Ticket({
   city,
   personNumber,
   dateFrom,
   dateCome,
   price
}){

   const variants = {
		visible: {opacity : 1, transition:{duration:1}},
		hidden: {opacity:0}
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
      <div className={styles.ticket} >
               <h4 className={styles.ticket__title} >Билет в {city}</h4>
               <div className={styles.ticket__person_number} >Количество человек {personNumber}</div>
               <div className={styles.ticket__dates} >
                  <div className={styles.ticket__date_from} >{moment(dateFrom).utc().format('DD-MM-YYYY')} </div>
                  <div className={styles.ticket__date_come} >{moment(dateCome).utc().format('DD-MM-YYYY')} </div>
               </div>   
               <div className={styles.ticket__price} >Цена: {price} руб.</div>
            </div>
      </motion.div>
     
   )
}