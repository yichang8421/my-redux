import React, {useState, useContext} from "react"

const appContext = React.createContext(null)

function App() {
    const [appState, setAppState] = useState({
        user: {
            name: "andy8421",
            age: 18
        }
    })
    return (
        <appContext.Provider value={{appState, setAppState}}>
            <FirstChild/>
            <SecondChild/>
            <ThirdChild/>
        </appContext.Provider>
    );
}

const FirstChild = () => {
    return (
        <section>
            First Child
            <User/>
        </section>
    )
}
const SecondChild = () => <section>
    Second Child
    <UserModifier>你好</UserModifier>
</section>

function ThirdChild() {
    return (
        <section>
            Third Child
        </section>
    )
}

const User = () => {
    const {appState} = useContext(appContext)
    return (
        <div>
            User: {appState.user.name}
        </div>
    )
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

const connect = (Component) => {
    return (props) => {
        const {appState, setAppState} = useContext(appContext)
        const dispatch = (action) => {
            setAppState(() => {
                return reducer(appState, action)
            })
        }

        return (<Component {...props} dispatch={dispatch} state={appState}/>)
    }
}

const UserModifier = connect(({dispatch, state, children}) => {
    return (
        <div>
            {children}
            <input
                value={state.user.name}
                onChange={(e) => {
                    dispatch({
                        type: "updeteUser",
                        payload: {
                            name: e.target.value
                        }
                    })
                }}
            />
        </div>
    )
})

export default App;