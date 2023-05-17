import styles from  './styles.module.scss'


export default function Card({
   bank,
   cardNumber,
   expire,
   holderName,
   brand
}){
   return(
      <div
      className={
         bank 
         ?  styles.card + ' ' + bank
         : styles.card
      }
      >
         <div
            className={styles.number}
         >
            {cardNumber}
         </div>
         <div
            className={styles.expire}
         >
            {expire}
         </div>
        <div
         className={styles.holder_name}
        > {holderName} 
        </div> 
        <div
        className={
         brand
         ? styles.brand + ' ' + brand
         : styles.brand
        }
        />
      </div>
   )
}