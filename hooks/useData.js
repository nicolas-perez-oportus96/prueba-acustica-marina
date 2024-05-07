import { useContext } from 'react';
import DataContext from '../context/data.context'
export const useData = () =>{
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useMyContext debe ser utilizado dentro de un proveedor MyContext');
    }
    return context;
    
};