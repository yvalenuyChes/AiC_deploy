import { useEffect } from 'react'
import Image from 'next/image'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Oswald } from '@next/font/google'
import styles from './AdvantageBlockItem.module.scss'


const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})

export default function AdvantagesItem({ title, subtitle, img, variants }) {


	const controls = useAnimation()
	const [ref, inView] = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])


	return (
		<motion.div
			ref={ref}
			animate={controls}
			variants={variants}
			initial='hidden'
			className={styles.motionDiv}
		>
			<div className={styles.advantages__item}>
					
					<h3 className={ osvald.className + ' ' + styles.advantages__item_title }>{title}</h3>
					<div className={styles.advantages__item_subtitle}>{subtitle}</div>
					<div className={styles.advantages__item_img}>
						<Image src={img} alt="" />
					</div>
				
			</div>
		</motion.div>
		
	)
}