import React, {useContext, useEffect, useState} from "react";

export const appContext = React.createContext(null)

export const store = {
    state: {
        user: {name: "andy8421", age: 18}
    },
    setState(newState) {
        store.state = newState
        store.listeners.map(fn => fn(store.state))
    },
    listeners: [],
    subscribe(fn) {
        store.listeners.push(fn)
        return () => {
            const index = store.listeners.indexOf(fn)
            store.listeners.splice(index, 1)
        }
    }
}

const reducer = (state, {type, payload}) => {
    if (type === "updeteUser") {
        return ({
            ...state,
            user: {
                ...state.user,
                ...payload
            }
        })
    } else {
        return state
    }
}

export const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState, subscribe} = useContext(appContext)
        const [, update] = useState({})
        const data = selector ? selector(state) : {state}

        useEffect(() => {
            subscribe(() => {
                update({})
            })
        }, [subscribe])

        const dispatch = (action) => {
            setState(reducer(state, action))
            // update({})
        }

        return (<Component {...props} {...data} dispatch={dispatch}/>)
    }
}

// export const connect = function (selector) {
//     return function (Component) {
//         return (props) => {
//             const {state, setState, subscribe} = useContext(appContext)
//             const [, update] = useState({})
//             const data = selector ? selector(state) : {state}
//
//             useEffect(() => {
//                 subscribe(() => {
//                     update({})
//                 })
//             }, [subscribe])
//
//             const dispatch = (action) => {
//                 setState(reducer(state, action))
//                 // update({})
//             }
//
//             return (<Component {...props} {...data} dispatch={dispatch}/>)
//         }
//     }
// }