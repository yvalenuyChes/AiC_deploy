import { useEffect, useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Backdrop, Fade, Modal } from '@mui/material'
import ModalBody from '../components/NavBar/NavBarComponents/ModalWindow/NavModalBody'
import { setAuthTrue } from '@/redux/slices/isAuth'
import Cookies from 'universal-cookie'
import ButtonToTop from '../components/ButtonToTop/ButtonToTop'
import NavBar from '../components/NavBar/NavBar'
import { AppMessage } from '@/components/AppMessage/AppMessage'

import styles from './styles.module.scss'
import Loader from '@/components/Loader/Loader'

export default function MainPage({ children }) {

	const ref = createRef(null)
	const popupOpen = useSelector(state => state.openPopup.openPopup)
	const cookies = new Cookies()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	const navOpen = useSelector(state => state.navOpen.navOpen)
	
	useEffect(()=> {
	  if(cookies.get('TOKEN')){
		 dispatch(setAuthTrue())
	  }
	  window.addEventListener('scroll', handleScroll)
	  const wrapper = document.querySelector(`.${styles.wrapper}`)
	  if(navOpen){
		  wrapper.classList.add(`${styles.blur}`)
	  }else{
		  wrapper.classList.remove(`${styles.blur}`)
	  }
	  setLoading(false)
	  return () => {
		  window.removeEventListener('scroll', handleScroll)
	  }
	  
	}, [navOpen])


	

	const [scrolling, toggleScrolling] = useState(false)
	let [lastScrolling, toggleLastScrolling] = useState(0)
	const [directionDown, toggleDirectionDown] = useState(false)

	const handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop


		if (scrollTop > lastScrolling && !directionDown) {
			toggleScrolling(true)
			toggleDirectionDown(true)
		} else if (scrollTop < lastScrolling) {
			toggleScrolling(false)
			toggleDirectionDown(false)
		}
		toggleLastScrolling(lastScrolling = scrollTop)
	}

	return (
		<>
			{scrolling ? null : <NavBar />}

				<main className={styles.wrapper}>
					{
						loading
						? <div className={styles.loader} >  <Loader/> </div>
						:	children
					
					}
				</main>
				<AppMessage/>
				<ButtonToTop />
				<div>
					<Modal
						style={{overflow:'auto'}}
						disablePortal
						open={popupOpen}
						slots={{ backdrop: Backdrop }}
						closeAfterTransition
						slotProps={{
						  backdrop: {
							 timeout: 500,
						  },
						}}
					>
						<Fade in={popupOpen} timeout={500} >
							<div>
								{<ModalBody ref={ref} />}
							</div>
						
						</Fade>
							
						
					
					</Modal>
				</div>	
		</>
	)
}