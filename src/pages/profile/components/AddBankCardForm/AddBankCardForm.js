import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Card from "../../../../components/Card/Card"
import {Input} from "@/components/Input/Input"
import { X_RAPID_API_HOST, X_RAPID_API_KEY } from "@/keys"
import { useDispatch } from "react-redux"
import { setColor, setMessage, removeColor, removeMessage } from "@/redux/slices/AppMessage"
import Loader from "@/components/Loader/Loader"
import Cookies from 'universal-cookie'
import { Button } from "@/components/Button/Button"

import styles from './styles.module.scss'
import { closeCityPagePopup } from "@/redux/slices/closeCityPopupWindow"

export default function AddBankCardForm ({userEmail, setAddBankCard, setCreditCard, autoFocus}) {

   const [cardData, setCardData] = useState(null)
   const [email, setEmail] = useState(null)

   const [holderName, setHolderName] = useState('')
   const [cardNumber, setCardNumber] = useState('')
   const [expireDate] = useState('21/30')
   const [loading, setLoading] = useState(false)
   const [cardError, setCardError] = useState(true)

   const inputCard = useRef(null)
 

   const dispatch = useDispatch()

   useEffect(()=> {

      const cookies = new Cookies()


      if(userEmail){
         setEmail(userEmail)
      }else{
         const configuration = {
            method:'GET',
            url:'https://aic-api.onrender.com/user',
            headers: {
               Authorization: cookies.get('TOKEN')
            }
         }
         axios(configuration)
         .then(result => setEmail(result.data.email) )
         .catch(e => console.log(e))
      }
   }, [])
   
   useEffect(() => {
      if(cardNumber.length === 16){
         const options = {
            method: 'POST',
            url: 'https://bin-ip-checker.p.rapidapi.com/',
            params: {bin: `${cardNumber}`},
            headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': X_RAPID_API_KEY,
              'X-RapidAPI-Host': X_RAPID_API_HOST
            },
          };
          
          axios.request(options)
          .then(response => {
               setCardData(response.data)
            if( 
               response.data.BIN.issuer.name.split(' ').join('') === 'CJSCALFA-BANK'
               || response.data.BIN.issuer.name.split(' ').join('').substring(34,42) === 'SBERBANK'
               || response.data.BIN.issuer.name.split(' ').join('') === 'GAZPROMBANKOJSC' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'TINKOFFBANK' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'VNESHTORGBANK' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'CBOTKRITIECJSC' 
               || response.data.BIN.issuer.name.split(' ').join('') === 'JSCBROSBANK' 
            )
           {
            setCardError(false)
           }else{
            dispatch(setMessage('Карта не поддерживается')) 
            dispatch(setColor('rgb(208, 97, 97)'))
            setCardError(true)
            setTimeout(()=> {
              dispatch(removeMessage())
              dispatch(removeColor())
           }, 3000)
           }
            
           
          })
        
          .catch(err =>  {
             dispatch(setMessage('Карта не поддерживается')) 
             dispatch(setColor('rgb(208, 97, 97)'))
             setCardError(true)
             setTimeout(()=> {
               dispatch(removeMessage())
               dispatch(removeColor())
            }, 3000)
          })
   }
   }, [cardNumber])


   const cardNumberHandler = () => {
         const cardValue = inputCard.current.value
         .replace(/\D/g, '')
         .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
      inputCard.current.value = !cardValue[2]
         ? cardValue[1]
         : `${cardValue[1]} ${cardValue[2]}${`${
            cardValue[3] ? ` ${cardValue[3]}` : ''
         }`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
      const numbers = inputCard.current.value.replace(/(\D)/g, '');
      setCardNumber(numbers);
   }

    const holderNameHandler = event => {
      

          setHolderName((event.target.value).replace(/[^A-Za-z]/g, ""))
      
    }

    const handleSubmit = event => {
      event.preventDefault()
      setLoading(true)
      
      const configuration = {
         method:'post',
         url:'https://aic-api.onrender.com/add_card',
         data:{
            email,
            cardNumber:cardNumber.trim(),
            holderName:holderName.trim(),
            bankName: 
            cardData.BIN.issuer.name.split(' ').join('').substring(34,42) === "SBERBANK" 
            ? cardData.BIN.issuer.name.split(' ').join('').substring(34,42)
            : cardData.BIN.issuer.name.split(' ').join('')
            ,

            brand:cardData.BIN.brand.split(' ').join('')
         }
      }

      axios(configuration)
      .then(result => {
         dispatch(setMessage(`${result.data.message}`))
         dispatch(setColor(`${result.data.color}`))
         dispatch(closeCityPagePopup())
         if(result.data.message === 'Вы успешно привязали карту'){
            setAddBankCard(false)
            if(window !== undefined){
               localStorage.setItem('AiW_Credit_Card', `${cardNumber.trim()}` )
               setCreditCard(localStorage.getItem('AiW_Credit_Card'))
            }
            dispatch(closeCityPagePopup())
           
         }
      })
      .then(
         setTimeout(()=> {
            dispatch(removeMessage())
            dispatch(removeColor())
         }, 3000)
      )
      .catch(err => {
         console.log(err)
      })
      .finally(() => setLoading(false))
   }



   return(
      <div className={styles.container} >
       <Card
         bank={
            cardData
            ?
            cardData.BIN.issuer.name.split(' ').join('').substring(34,42) === 'SBERBANK'

               ? styles[cardData.BIN.issuer.name.split(' ').join('').substring(34,42)]
               : styles[cardData.BIN.issuer.name.split(' ').join('')]
            : null
         }
         
         brand={
            cardData
            ?  styles[cardData.BIN.brand.split(' ').join('')]
            : null
          }
         cardNumber={inputCard.current ? inputCard.current.value : ''}
         holderName={holderName}
         expire={expireDate}
       />
         <div className={styles.card_templates} >
            <div className={styles.card_templates__title}>
               Шаблоны для карт
            </div>
            <div className={styles.card_templates__buttons_container}>
               <Button 
                  title={'Сбер'} 
                  type={'button'} 
                  onClick={() => { setCardNumber('2202206111111111'), inputCard.current.value = `2202 2061 1111 1111` }} 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'Росбанк'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('5578421111111111'), inputCard.current.value =(`5578 4211 1111 1111`)}} 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'Тинькоф'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('5189011711111111'),inputCard.current.value = `5189 0117 1111 1111` }} 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'Альфа банк'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('4154291111111111'), inputCard.current.value =  `4154 2911 1111 1111`}} 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'Открытие'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('5323011111111111') ,inputCard.current.value = `5323 0111 1111 1111`} } 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'ВТБ'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('5160771111111111'),  inputCard.current.value = `5160 7711 1111 1111`  }} 
                  className={styles.card_templates__button} 
               />
               <Button 
                  title={'Газпром'} 
                  type={'button'} 
                  onClick={() => {setCardNumber('4874151111111111'),  inputCard.current.value = `4874 1511 1111 1111` }} 
                  className={styles.card_templates__button} 
               />
            </div>
           
         </div>
         <form
         onSubmit={handleSubmit}
         >
         <Input
            ref={inputCard}
            autoFocus={autoFocus}
            type="text"
            label="Номер карты"
            value={inputCard.current ? inputCard.current.value : ''}
            onChange={cardNumberHandler}
         />
         <Input
            type='text'
            name='name'
            label='Ваше имя'
            value={holderName}
            onChange={holderNameHandler}
         />
         <button 
         disabled={loading || cardNumber.length < 16 || holderName === ''|| cardError
         }  
         className={ 
            loading || 
            cardNumber.length < 16 || 
            holderName === '' || 
            cardError ? styles.button__disabled :  styles.button  
         } 
         type="submit" 
         >{loading ? <Loader/> : 'Привязать'}</button>
         </form>
       
      </div>
   )
}