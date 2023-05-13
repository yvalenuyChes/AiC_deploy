import Image from 'next/image'
import { Oswald } from '@next/font/google'
import styles from './AdvantageBlockItem.module.scss'


const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})

export default function AdvantagesItem({ title, subtitle, img }) {
	return (
		<div className={styles.advantages__item}>
		
				<h3 className={ osvald.className + ' ' + styles.advantages__item_title }>{title}</h3>
				<div className={styles.advantages__item_subtitle}>{subtitle}</div>
				<div className={styles.advantages__item_img}>
					<Image src={img} alt="" />
				</div>
			
		</div>
	)
}