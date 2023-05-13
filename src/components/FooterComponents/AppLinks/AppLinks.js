import Image from 'next/image'
import { Oswald } from '@next/font/google'
import classes from './AppLinks.module.scss'
// import appleApp from '../../img/apps/apple.jpg'
// import googleApp from '../../img/apps/GoogleAppStore.png'

const osvald = Oswald({
	subsets:['cyrillic'],
	weight:'400'

})


export default function AppLinks() {
	return (
		<div className={classes.footer__apps}>
			<h2 className={
				`
				${osvald.className}
				${classes.footer__title} 
				${classes.footer__appTitle} 
				
				`
				}>Скачайте наше приложение</h2>
			<div className={classes.appleApp}>
				<Image  src={require('../../../images/apps/apple.jpg')} alt="appleApp" className={classes.appleApp} />
			</div>
			<div className={classes.googleApp}>
				<Image  src={require('../../../images/apps/GoogleAppStore.png')} alt="appleApp" className={classes.googleApp} />
			</div>
		</div >
	)
}