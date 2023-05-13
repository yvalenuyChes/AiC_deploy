import {useEffect} from 'react'
import { motion,  useAnimation} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import AdvantagesItem from '../../components/AdvantageBlockItem/AdvantageBlockItem'
import { 
   FIRST_ITEM_TEXT, 
   FOURTH_ITEM_TEXT, 
   SECOND_ITEM_TEXT, 
   THIRD_ITEM_TEXT 
} from '../../components/AdvantageBlockItem/AdvantageBlockText/AdvantageBlockText'
import { Oswald } from '@next/font/google'
import styles from './AdvantagesBlock.module.scss'

import planet from '../../images/advantagesImg/planet.svg'
import tip from '../../images/advantagesImg/tip.svg'
import hands from '../../images/advantagesImg/hands.svg'
import ten from '../../images/advantagesImg/number.svg'


const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})

export default function Advantages() {


	const controls = useAnimation()
	const [ref, inView] = useInView()

	
	const squereLeftAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: -100}
	 }

	 const squereRightAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: 100}
	 }

	 useEffect(() => {
		if(inView){
			controls.start('visible')
		}
		
	}, [controls, inView])

	return (
		<section className={styles.advantagesBlock} id="advantages">
			<div className={styles.advantagesBlock__title}>
				<h2 className={osvald.className} >Почему именно наша фирма?</h2>
			</div>
			<div className={styles.advantagesBlock__body}>
				<motion.div
					ref={ref}
					animate={controls}
					variants={squereLeftAnimationVariants}
					initial='hidden'
					className={styles.motionDiv}
				>
					<AdvantagesItem
						title="Огромный выбор"
						subtitle={FIRST_ITEM_TEXT}
						img={planet}
					/>
				</motion.div>
				<motion.div
					ref={ref}
					animate={controls}
					variants={squereRightAnimationVariants}
					initial='hidden'
					className={styles.motionDiv}
				>
					<AdvantagesItem
						title="Надежность"
						subtitle={SECOND_ITEM_TEXT}
						img={tip}
					/>
				</motion.div>
				<motion.div
					ref={ref}
					animate={controls}
					variants={squereLeftAnimationVariants}
					initial='hidden'
					className={styles.motionDiv}
				>
					<AdvantagesItem
						title="Работаем для вас"
						subtitle={THIRD_ITEM_TEXT}
						img={hands}
					/>
				</motion.div>
				<motion.div
					
					ref={ref}
					animate={controls}
					variants={squereRightAnimationVariants}
					initial='hidden'
					className={styles.motionDiv}
				>
					<AdvantagesItem
						title="Стабильность"
						subtitle={FOURTH_ITEM_TEXT}
						img={ten}
					/>
				</motion.div>
				
			</div>
		</section >
	)
}