'use client'
import { createContext, useState } from 'react';

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [dispositivos, setDispositivos] = useState([]);
    const [selectedDispositivo, setSelectedDispositivo] = useState(0);
    
    
    const handleSelectDispositivo = (dispositivo) => {
        setSelectedDispositivo(dispositivo)
    };

    return (
        <DataContext.Provider value={{ data, setData, dispositivos, setDispositivos, selectedDispositivo, handleSelectDispositivo }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;