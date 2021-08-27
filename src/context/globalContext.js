import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../core/firebaseConfig';

const GlobalContext = React.createContext()

export function GlobalProvider({children}) {
  const [user, setuser] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [coreUser, coreLoading] = useAuthState(auth);
  const [isLoggedIn, setisLoggedInCore] = React.useState(sessionStorage.isLoggedIn || false)
    
    function setisLoggedIn(val){
        if(!val) delete sessionStorage.isLoggedIn
        else sessionStorage.setItem('isLoggedIn', 'true')
        setisLoggedInCore(val)
    }

    async function handleSignIn(){
      if(coreLoading) return 
      if(coreUser){
        const userRef = firestore.doc(`users/${coreUser.email}`);
        const user = await userRef.get() || {};
        if(user.exists) setuser(user.data())  
      }
      setloading(false)
    }

    React.useEffect(() => {
      handleSignIn()      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coreUser])
  return (
    <GlobalContext.Provider value={{user, setuser, isLoggedIn, setisLoggedIn, loading: loading || coreLoading}} children={children} />
  )
}

export const useGlobalContext = () => React.useContext(GlobalContext)
