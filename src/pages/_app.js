import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
import { AnimatePresence } from 'framer-motion'


import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '../styles/_styles.scss'


export default function App({ Component, ...rest }) {


  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  const router = useRouter()

  return <Provider store={store} >
    <AnimatePresence mode='wait' >
      <motion.div
        style={{overflow:'hidden'}}
        transition={{
          duration: 0.75
        }}
        key={router.route}
        initial='initialState'
        animate='animateState'
        exit='exitState'
        variants={{
          initialState:{
            opacity:0,
            clipPath:'polygon(0 0, 100% 0,  100% 100%, 0 100%)'
          },
          animateState:{
            opacity:1,
            clipPath:'polygon(0 0, 100% 0,  100% 100%, 0 100%)'
          },

          exitState:{
          clipPath:'polygon(50% 0, 50% 0,  50% 100%, 50% 100%)'
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    
    </AnimatePresence>
  </Provider>
   
}
