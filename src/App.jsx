import React, {useState, useContext, useEffect} from "react"

const appContext = React.createContext(null)

const store = {
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

console.log(store.listeners);

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

const connect = (Component) => {
    return (props) => {
        const {state, setState, subscribe} = useContext(appContext)
        const [, update] = useState({})

        useEffect(() => {
            subscribe(() => {
                update({})
            })
        }, [subscribe])

        const dispatch = (action) => {
            setState(reducer(state, action))
            // update({})
        }

        return (<Component {...props} dispatch={dispatch} state={state}/>)
    }
}


function App() {
    return (
        <appContext.Provider value={store}>
            <FirstChild/>
            <SecondChild/>
            <ThirdChild/>
        </appContext.Provider>
    );
}

const FirstChild = () => {
    console.log("FirstChild 执行了");
    return (
        <section>
            First Child
            <User/>
        </section>
    )
}
const SecondChild = () => {
    console.log("SecondChild 执行了");

    return (
        <section>
            Second Child
            <UserModifier>你好</UserModifier>
        </section>
    )
}

const ThirdChild = () => {
    console.log("ThirdChild 执行了");
    return (
        <section>
            Third Child
        </section>
    )
}

const User = connect(({state}) => {
    console.log("User 执行了");
    return (
        <div>
            User: {state.user.name}
        </div>
    )
})

const UserModifier = connect(({dispatch, state, children}) => {
    console.log("UserModifier 执行了");
    const onChange = (e) => {
        dispatch({
            type: "updeteUser",
            payload: {
                name: e.target.value
            }
        })
    }

    return (
        <div>
            {children}
            <input
                value={state.user.name}
                onChange={onChange}
            />
        </div>
    )
})

export default App;