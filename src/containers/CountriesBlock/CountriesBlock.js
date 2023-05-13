import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountrieBlockGallery from '../../components/CountrieBlockComponents/CountryBlockGallery/CountryBlockGallery'
import { Oswald } from '@next/font/google'
import styles from './CountriesBlock.module.scss'

const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})

export default function CountrieBlock() {

	const isLogin = useSelector(state => state.isAuth.isAuth)

	const controls = useAnimation()
	const [ref, inView] = useInView()


	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])

	 const titleAnimationVariants = {
		visible: {opacity : 1, y: 0, transition:{duration:1}},
		hidden: {opacity:1, y:100}
	 }


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
						На данный момент путешествия возможны только по России
					</div>
					<div className={styles.main_content__country_name}>
						<motion.div
						ref={ref}
						animate={controls}
						variants={titleAnimationVariants}
						initial='hidden'
						
						>
						
								<h3 className={osvald.className} >
									Россия
								</h3>
							
						</motion.div>
					</div>
				<CountrieBlockGallery />
			</div>
		</section>
	)
}