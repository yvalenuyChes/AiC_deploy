import { useEffect, useState } from 'react'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import {Caveat} from 'next/font/google'

import styles from './MainContentImage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '@/components/Loader/Loader'
import { togglePopup } from '@/redux/slices/openPopup'

const caveat = Caveat({
	subsets:['cyrillic'],
	weight:'600'
})

export default function MainContentImg({ 
	limiter, 
	imgSrc, 
	title, 
	content__text_subtitle, 
	value, 
	link,
	orderLink,
	variants
}) {

	const isLogin = useSelector(state => state.isAuth.isAuth)

	const [price, setPrice] = useState()

	const dispatch = useDispatch()


	const controls = useAnimation()
	const [ref, inView] = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])

	useEffect(() => {
		axios
		.get('https://www.cbr-xml-daily.ru/daily_json.js')
		.then( result=> {
			setPrice(Math.floor(result.data.Valute.USD.Value))
		})
		.catch(e => console.log(e))
		
	}, [])

	return (
		<motion.div
		ref={ref}
		animate={controls}
		variants={variants}
		initial='hidden'
		
		>
<div className={ 
			limiter 
			? `${styles.contentCountries__wrapper} ${styles.limiter}` 
			: `${styles.contentCountries__wrapper}` 
			}>
			<div className={styles.img__wrapper}>
				<div className={styles.blockImg}>
					<Image src={imgSrc} className={styles.img_countries} alt="toorfirmImg" />
					<div className={styles.block_text}>
						<h2 className={styles.content__title + ' ' + caveat.className}>{title}</h2>
						<span className={styles.content__price}>Цена за билет: от { price ? value * price : <Loader/>} руб</span>
						<div className={styles.content__text}>
							<div className={styles.content__text_title}>Предлагаем Вам посетить...</div>
							<div className={styles.content__text_subtitleClass}>{content__text_subtitle}</div>
						</div>
					</div>
					{
						isLogin
						? 
						<Link
							href={orderLink ? orderLink : '/toSmth'}
							className={styles.link_order }
						>
							Заказать билет
						</Link>
						:
						<button
							onClick={() => dispatch(togglePopup())}
							href={'/#main__content'}
							className={`${styles.link_order + ' ' + styles.disabled}`
						}
						>
						Заказать билет
						</button>
					}
					
					<Link
						href={link ? link : '/toSmth'}
						className={styles.link}
					>Подробнее...</Link>
				</div>
			</div>
		</div>
		</motion.div>
		
	)
}