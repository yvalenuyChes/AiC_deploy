import { useEffect } from 'react'
import MainContentImg from '../MainContentImage/MainContentImage'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MSK from '../../../images/countries/MSK.png'
import SOCHI from '../../../images/countries/sochi.jpg'
import KAZ from '../../../images/countries/kazan.jpg'
import SPB from '../../../images/countries/spb.jpg'
import BARN from '../../../images/countries/barnayl.jpg'
import VIB from '../../../images/countries/viborg.jpg'
import { VIBORG_TEXT, SOCHI_TEXT, SPB_TEXT, MSK_TEXT, BARNAYL_TEXT, KAZAN_TEXT } from '../CountryBlockText/CountryBlockText'
import styles from './CountryBlockGallery.module.scss'



export default function CountrieBlockGallery() {

	const controls = useAnimation()
	const [ref, inView] = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])

	const bigPictureAnimationVariants = {
		visible: {opacity : 1, y: 0, transition:{duration:1}},
		hidden: {opacity:0, y:100}
	 }

	 const smallPictureLeftAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: -100}
	 }

	 const smallPictureRightAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: 100}
	 }


	return (
		<div className={styles.imgGallary}>
			
				<div className={styles.niderlands}>
					<MainContentImg
						limiter= {true}
						imgSrc={MSK}
						title="Москва"
						content__text_subtitle={MSK_TEXT}
						value='200'
						link={'/cities/moscow'}
						orderLink={'cities/moscow#moscow_order_ticket'}
						variants={bigPictureAnimationVariants}
					/>
				</div>
			
		
			<div className={styles.maldives}>
				<MainContentImg
					imgSrc={SOCHI}
					title="Сочи"
					content__text_subtitle={SOCHI_TEXT}
					value='500'
					link={'/cities/sochi'}
					orderLink={'/cities/sochi#sochi_order_ticket'}
					variants={smallPictureLeftAnimationVariants}
				/>
			</div>
			<div className={styles.vengria}>
					<MainContentImg
						imgSrc={KAZ}
						title="Казань"
						content__text_subtitle={KAZAN_TEXT}
						value='250'
						link={'/cities/kazan'}
						orderLink={'cities/kazan#kazan_order_ticket'}
						variants={smallPictureRightAnimationVariants}
					/>
			
			</div>
			<div className={styles.mram}>

					<MainContentImg
						limiter={true}
						imgSrc={SPB}
						title="Санкт-Петербург"
						content__text_subtitle={SPB_TEXT}
						value='100'
						link={'/cities/saint_petersburg'}
						orderLink={'/cities/saint_petersburg#spb_order_ticket'}
						variants={bigPictureAnimationVariants}
					/>
			
			</div>
			<div className={styles.newYork}>
					<MainContentImg
						imgSrc={BARN}
						title="Барнаул"
						content__text_subtitle={BARNAYL_TEXT}
						value='350'
						link={'/cities/barnayl'}
						orderLink={'cities/barnayl#barnayl_order_ticket'}
						variants={smallPictureLeftAnimationVariants}
					/>
			
			</div>
			<div className={styles.kanada}>
					<MainContentImg
						imgSrc={VIB}
						title="Выборг"
						content__text_subtitle={VIBORG_TEXT}
						value='120'
						link={'/cities/viborg'}
						orderLink={'/cities/viborg#viborg_order_ticket'}
						variants={smallPictureRightAnimationVariants}
					/>
				
			</div>
		</div>
	)
}