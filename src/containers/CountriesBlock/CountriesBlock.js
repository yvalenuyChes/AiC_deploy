import { useSelector } from 'react-redux'
import CountrieBlockGallery from '../../components/CountrieBlockComponents/CountryBlockGallery/CountryBlockGallery'
import { Oswald } from '@next/font/google'
import styles from './CountriesBlock.module.scss'

const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})

export default function CountrieBlock() {

	const isLogin = useSelector(state => state.isAuth.isAuth)




	return (
		<section className={styles.main_content} id="main__content">
			<div className={styles.main_content__container}>
				
				
					<div className={styles.main_content__warning} >
						{
								isLogin
								? null
								: 	<div> 
									Чтобы заказать билет, Вы должны зарегистрироваться 
									<br/>
									</div>
						}
					
						<br/>
						На данный момент пушешествия возможны только по России
					</div>
				
					
					<div className={styles.main_content__country_name} >
						<h3 className={osvald.className} >
							Россия
						</h3>
					</div>
				<CountrieBlockGallery />
			</div>
		</section>
	)
}