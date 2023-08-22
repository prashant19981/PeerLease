import { createContext, useReducer } from "react"

const INIT = {
    // startDate:[],
    university: undefined,
    city:undefined,
    date:undefined
}

export const SearchPageContext = createContext(INIT)

const SearchReducer = (state,action) =>{
    if(action.type === 'NEW'){
        return action.payload;
    }
    if(action.type === 'RESET'){
        return INIT;
    }
    return state;

}

export const SearchPageContextProvider = ({children}) =>{
    
    const [state, dispatch] = useReducer(SearchReducer,INIT);

    return (
        <SearchPageContext.Provider
        value = {{university:state.university,city:state.city,date:state.date,dispatch}}
        >
            {children}
        </SearchPageContext.Provider>
    )
}