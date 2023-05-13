import { useDispatch } from 'react-redux'
import Link from 'next/link'
import {toggleNavOpen} from '../../../redux/slices/openNav'
import styles from './NavBarComponents.module.scss'

export function MainPageTransitions() {

	const dispatch = useDispatch()

	return (
		<ul className="navMobileList">
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#main__content'>
				Заказ билета
				</Link>
			</li>
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#advantages'>
						Преимущества фирмы
				</Link>
			</li>
			<li
				className={styles.navMobileLink}
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/#footer'>
						Дополнительная информация
				</Link>
			</li>
		</ul>

	)
}

export function OrderTicketTransition() {

	const dispatch = useDispatch()

	return (
		<ul>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/moscow'>
						Москва
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/saint_petersburg'>
						Санкт-Петербург
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/viborg'>
						Выборг
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/kazan'>
						Казань
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/sochi'>
						Сочи
				</Link>
			</li>
			<li
				className="navMobileLink"
				onClick={() => {dispatch(toggleNavOpen())}}
			>
				<Link
					href='/cities/barnayl'>
						Барнаул
				</Link>
			</li>
		</ul>
	)
}