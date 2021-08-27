import { useToast } from '@chakra-ui/react';
import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../core/firebaseConfig';

const GlobalContext = React.createContext()

export function GlobalProvider({children}) {
  const [user, setuser] = React.useState(null)
  const [loading, setloading] = React.useState(true)
  const [coreUser, coreLoading, error] = useAuthState(auth);
  const [isLoggedIn, setisLoggedInCore] = React.useState(sessionStorage.isLoggedIn || false)
  const toast = useToast()
  function successToaster(description, duration){
    toast({
      title: 'Success',
      description,
      status: 'success',
      duration: duration || 1000,
      isClosable: true,
      position: 'top'
    })
  }
  function errorToaster(description, duration){
    toast({
      title: 'Error',
      description,
      status: 'error',
      duration,
      isClosable: true,
      position: 'top'
    })
  }

    function setisLoggedIn(val){
        if(!val) delete sessionStorage.isLoggedIn
        else sessionStorage.setItem('isLoggedIn', 'true')
        setisLoggedInCore(val)
    }

    async function handleSignIn(){
      try{
        if(coreUser && !coreLoading){
          const userRef = firestore.doc(`users/${coreUser.email}`);
          const user = await userRef.get() || {};
          if(user.exists) {
            setuser(user.data()) 
          } 
          setloading(false)
        }
        if((!coreUser && !coreLoading) || error) {
          delete sessionStorage.isLoggedIn
          setloading(false)
        }
      }catch(e){
        console.log('log: error', e)
        setloading(false)
      }
    }

    React.useEffect(() => {
      handleSignIn()      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coreLoading])
  return (
    <GlobalContext.Provider
      value={{
        user,
        setuser,
        isLoggedIn,
        setisLoggedIn,
        loading: coreLoading || loading,
        successToaster,
        errorToaster
      }}
      children={children}
    />
  );
}

export const useGlobalContext = () => React.useContext(GlobalContext)
