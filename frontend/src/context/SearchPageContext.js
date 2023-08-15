import { createContext, useReducer } from "react"

const INIT = {
    // startDate:[],
    university: undefined,
    city:undefined,
    roomType:undefined
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
        value = {{uni:state.university,city:state.city,type:state.roomType,dispatch}}
        >
            {children}
        </SearchPageContext.Provider>
    )
}