import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../core/firebaseConfig';

const GlobalContext = React.createContext()

export function GlobalProvider({children}) {
    const [coreUser, coreLoading] = useAuthState(auth);
    const [user, loading] = useDocumentData(
      firestore.doc(`users/${coreUser && coreUser.email}`),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );
    const [isLoggedIn, setisLoggedInCore] = React.useState(sessionStorage.isLoggedIn || false)
    
    function setisLoggedIn(val){
        if(!val) delete sessionStorage.isLoggedIn
        else sessionStorage.setItem('isLoggedIn', 'true')
        setisLoggedInCore(val)
    }
  return (
    <GlobalContext.Provider value={{user, isLoggedIn, setisLoggedIn, loading: loading || coreLoading}} children={children} />
  )
}

export const useGlobalContext = () => React.useContext(GlobalContext)
