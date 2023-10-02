import MainPage from '@/layout/MainPage'
import styles from './styles.module.scss'
import Link from "next/link"

export default function RegistrationConditions(){

   return(
      <MainPage>
 <div className={styles.container}>
         <h2 className={styles.title} >
            Условия регистрации
            {` (и по сути ReadMe)`}
         </h2>
        <ul className={styles.list} >
            <li className={styles.list_item} >
               <p>
                  Данное приложение является пет проектом, с помощью которого я учился и закреплял свои навыки.
                  <br/>
                  Если найдете баги/будут пожелания, можете мне написать в телеграм: @yvalenuyChes
                  <br/>
      
               </p>
            </li>
            <li className={styles.list_item} >
            <p>
               Идея данного приложения в том, чтобы заказывать билеты из Санкт-Петербурга в другие города/страны, поэтому цена на билеты в Санкт-Петербург меньше
            </p>
         </li>
       <li className={styles.list_item} >
         <p>
            Приложение подразумевает, что Вы зарегистрируетесь, привяжите банковскую карту и купите билет. Цены взяты с головы, как рестораны и достопримечательности, просто хотел показать как это могло бы выглядеть
         </p>
       </li>
      
            <li className={styles.list_item} >
               <p>
                  При регистрации можно указать любую почту, но она должна быть валидной по написанию, на данном этапе емаил рассылки нет
               </p>
            </li>
        
         <li className={styles.list_item} >
            <p>
               Внизу страницы ссылки не работают, так как лично я в них не вижу надобности, нет реального заказчика, я не копирайтер, наполнять их lorem ipsum так же не вижу смысла
            </p>
         </li>
        </ul>
         <Link className={styles.button} href={'/'} >
          Назад
         </Link>
      </div>
      </MainPage>
     
   )
}