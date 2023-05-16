import { useState, useEffect } from "react"
import { Oswald } from '@next/font/google'
import { motion,  useAnimation} from 'framer-motion'
import styles from './Accardion.module.scss'


const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})



export default function AccordionBlock({ title, content }) {

	const controls = useAnimation()

	const animation = {
		visible: { y: 0, transition:{duration:1}, display:'block',  height:200 },
		hidden: {display:'none', y: -200, transition:{duration:0.5},  height:0}
	 }

	const [active, toggleActive] = useState(false)

	useEffect(() => {
		if(active){
			controls.start('visible')
		}else{
			controls.start('hidden')
		}
		
	}, [controls, active])

	return (
		<div className={styles.accordion}>
			<div
				className={styles.accordion__summary}
				onClick={() => toggleActive(prev => !active)}
				role="button"
				tabIndex={0}
			>
				<div className={
					active 
					? `${styles.accordion__arrow + ' ' + styles.active}`
					: `${styles.accordion__arrow}`
					} />
				<h3 className={osvald.className} >{title}</h3>
			</div>
			<div className={styles.accordion__content}>
				<motion.div
					animate={controls}
					variants={animation}
					initial='hidden'
				>
					{content}
				</motion.div>
			</div>
		</div>
	)
}