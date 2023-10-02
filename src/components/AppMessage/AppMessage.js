
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion,  useAnimation} from 'framer-motion'
import styles from './styles.module.scss'
import { removeColor, removeMessage } from '@/redux/slices/AppMessage'


export const AppMessage = () => {

   const controls = useAnimation()

	const animation = {
		visible: { y: 0, transition:{duration:1}, display:'block'},
		hidden: {display:'none', y: 50, transition:{duration:1}}
	 }

   const message = useSelector(state => state.appMessage.appMessage)
   const borderColor =  useSelector(state => state.appMessage.color)


   const dispatch = useDispatch()

   const removeHandler = () => {
      dispatch(removeMessage())
      dispatch(removeColor())
   }

   useEffect(() => {
		if(message){
			controls.start('visible')
		}else{
			controls.start('hidden')
		}
		
	}, [controls, message])


   return(
      message
      ?
      <motion.div
      animate={controls}
      variants={animation}
      initial='hidden'
   >
         <div 
            className={styles.messageContainer} 
            style={ borderColor ? {border: `2px solid ${borderColor}`} : ''} 
            onClick={removeHandler}
         >
          
               {message}
           
           
         </div>
      </motion.div>
        : null
     
   )
}