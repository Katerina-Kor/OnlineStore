import { FC, ReactNode, createContext, useState } from 'react';
import tokenStorageInstance from '../../utils/tokenStorage/tokenStorage';

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<boolean>(false);
export const ChangeAuthContext = createContext<(newValue: boolean) => void>(
  () => {}
);

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(
    !!tokenStorageInstance.getToken()
  );

  return (
    <AuthContext.Provider value={isLogged}>
      <ChangeAuthContext.Provider value={setIsLogged}>
        {children}
      </ChangeAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
