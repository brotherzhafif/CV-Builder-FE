import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (accessToken) {

      // Jika ada token, dispatch login action
      dispatch({ type: 'LOGIN', payload: user });
    } else if (user) {
      // Jika tidak ada token tetapi ada user, berarti user login tanpa token
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
