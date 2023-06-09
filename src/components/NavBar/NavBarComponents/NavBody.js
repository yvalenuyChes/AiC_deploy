
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'universal-cookie'
import Link from 'next/link'
import { MainPageTransitions, OrderTicketTransition } from './NavLinks'
import AccordionBlock from '../../Accardion/Accardion'

import { toggleNavOpen } from '@/redux/slices/openNav'
import { togglePopup } from '@/redux/slices/openPopup'
import styles from './NavBarComponents.module.scss'
import { setAuthFalse } from '@/redux/slices/isAuth';




export default function NavBody() {

	

	const cookies = new Cookies()

	const isLogin = useSelector(state => state.isAuth.isAuth)

	const logout = () => {
		cookies.remove('TOKEN', {path: '/'})
		if(window !== undefined){
			localStorage.removeItem('AiW_Credit_Card')
		}
		dispatch(setAuthFalse())
		dispatch(toggleNavOpen())
	}

	const navOpen = useSelector(state => state.navOpen.navOpen)

	const dispatch = useDispatch()

	function PopupHandler (){
		dispatch((toggleNavOpen()))
		dispatch((togglePopup()))
	}


	return (
		<div className={navOpen ? `${styles.nav_phones__body + ' ' + styles.active}` : `${styles.nav_phones__body}`}  >
			<div className={styles.nav_phones__body_itemWrapper}>
				<div className={styles.nav_phones__body_item}>
					<AccordionBlock
						title="Главная"
						content={<MainPageTransitions />}
					/>
				</div>
				<div className={styles.nav_phones__body_item}>
					<AccordionBlock
						title="Города"
						content={<OrderTicketTransition />}
					/>
				</div>
				<div className={styles.nav_phones__body_item}>
				</div>
				<div
					onClick={() => dispatch(toggleNavOpen())}
					className={styles.nav_phones__body_item + ' ' + styles.navMobileLink}
				>
					{
						isLogin
						? <Link href="/profile">
								Личный кабинет
						  </Link>
						: null
					}
					
				</div>
				<div className={`${styles.nav_phones__body_item + ' ' + styles.login}`}>
				{isLogin 
				?
					<div
						onClick={ () => logout()}
						id="auth"
					>Выйти</div>
				:
						<div
						onClick={ PopupHandler}
						id="auth"
					>Авторизация</div>
				}			
				
				
				</div>
			</div>
		</div >
	)
}