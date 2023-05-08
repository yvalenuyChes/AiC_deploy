import MainContentImg from '../MainContentImage/MainContentImage'

import MSK from '../../../images/countries/MSK.png'
import SOCHI from '../../../images/countries/sochi.jpg'
import KAZ from '../../../images/countries/kazan.png'
import SPB from '../../../images/countries/SPB.png'
import BARN from '../../../images/countries/barnayl.jpg'
import VIB from '../../../images/countries/viborg.jpg'
import { VIBORG_TEXT, SOCHI_TEXT, SPB_TEXT, MSK_TEXT, BARNAYL_TEXT, KAZAN_TEXT } from '../CountryBlockText/CountryBlockText'
import styles from './CountryBlockGallery.module.scss'


export default function CountrieBlockGallery() {
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
				/>
			</div>
		</div>
	)
}