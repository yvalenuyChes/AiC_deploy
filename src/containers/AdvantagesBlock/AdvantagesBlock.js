import {useEffect} from 'react'
import { useAnimation} from 'framer-motion'
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
	
	const squereLeftAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: -100}
	 }

	 const squereRightAnimationVariants = {
		visible: {opacity : 1, x: 0, transition:{duration:1}},
		hidden: {opacity:0, x: 100}
	 }


	return (
		<section className={styles.advantagesBlock} id="advantages">
			<div className={styles.advantagesBlock__title}>
				<h2 className={osvald.className} >Почему именно наша фирма?</h2>
			</div>
			<div className={styles.advantagesBlock__body}>
					<AdvantagesItem
						title="Огромный выбор"
						subtitle={FIRST_ITEM_TEXT}
						img={planet}
						variants={squereLeftAnimationVariants}
					/>
					<AdvantagesItem
						title="Надежность"
						subtitle={SECOND_ITEM_TEXT}
						img={tip}
						variants={squereRightAnimationVariants}
					/>
					<AdvantagesItem
						title="Работаем для вас"
						subtitle={THIRD_ITEM_TEXT}
						img={hands}
						variants={squereLeftAnimationVariants}
					/>
					<AdvantagesItem
						title="Стабильность"
						subtitle={FOURTH_ITEM_TEXT}
						img={ten}
						variants={squereRightAnimationVariants}
					/>
			</div>
		</section >
	)
}