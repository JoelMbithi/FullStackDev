import { createContext } from "react";
import { doctors as originalDoctors } from "../assets/assets";

export const AppContext = createContext();
const currencySymbol = '$';

// Remove duplicates from the doctors array
const doctors = Array.from(new Map(originalDoctors.map(doc => [doc._id, doc])).values());

console.log("Doctors Array in Context (Unique):", doctors);

const AppContextProvider = (props) => {
    const value = { doctors, currencySymbol };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
