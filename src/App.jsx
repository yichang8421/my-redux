import {appContext, store, connect} from "./redux"

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

const User = connect(state => {
    return {user: state.user}
})(
    ({user}) => {
        console.log("User 执行了");
        return (
            <div>
                User: {user.name}
            </div>
        )
    })

const UserModifier = connect()(
    ({dispatch, state, children}) => {
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