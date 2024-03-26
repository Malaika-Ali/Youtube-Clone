import React, {createContext,useState,useEffect} from "react";

import { fetchDataFromApi} from "../utils/api"

export const Context= createContext();

export const AppContext=(props)=>{
    const [loading, setloading] = useState(false)
    const [searchResults, setsearchResults] = useState([])
    const [selectCategories, setselectCategories] = useState("New")
    const [mobileMenu, setmobileMenu] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    // const [lightMode, setLightMode] = useState(false)

    // the value of light mode is initially set to what was stored locally in the local storage
    const [lightMode, setLightMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode ? JSON.parse(savedMode) : false;
      });

    //   light mode's value is saved into local storage whenever changed
      useEffect(() => {
        localStorage.setItem('themeMode', JSON.stringify(lightMode));
      }, [lightMode]);
    


    useEffect(()=>{
        fetchSelectedCategoryData(selectCategories)
    },[selectCategories])

    const fetchSelectedCategoryData=(query)=>{
            setloading(true)
            fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
                console.log(contents)
                setsearchResults(contents)
                setloading(false)
            })
    }

    return(
        <Context.Provider value={{
            loading,
            setloading,
            searchResults,
            selectCategories,
            setselectCategories,
            lightMode,
            setLightMode,
            mobileMenu,
            setmobileMenu,
            showSidebar,
            setShowSidebar
        }}>
            {props.children}
        </Context.Provider>
    )
}