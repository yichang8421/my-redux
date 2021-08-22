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
    <UserModifier/>
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


const UserModifier = () => {
    const {appState, setAppState} = useContext(appContext)
    return (
        <div>
            <input
                value={appState.user.name}
                onChange={(e) => {
                    setAppState(() => {
                        return ({
                            ...appState,
                            user: {
                                ...appState.user,
                                name: e.target.value
                            }
                        })
                    })
                }}
            />
        </div>
    )
}

export default App;