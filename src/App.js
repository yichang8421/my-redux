import React, {useState, useContext} from "react"

const appContext = React.createContext(null)

const store = {
    state: {
        user: {name: "andy8421", age: 18}
    },
    setState(newState) {
        console.log(newState)
        store.state = newState
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
    const {state} = useContext(appContext)
    return (
        <div>
            User: {state.user.name}
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
        const {state, setState} = useContext(appContext)
        const [, update] = useState({})
        const dispatch = (action) => {
            setState(reducer(state, action))
            // 此处 setState 是 App 的 setState 方法。不是 React 提供的 setState 方法。

            update({})
            // 调用 App 的 setState 方法后，store 的值发生改变。此时调用 update(),将使当前组件重新渲染。
        }

        return (<Component {...props} dispatch={dispatch} state={state}/>)
    }
}

const UserModifier = connect(({dispatch, state, children}) => {
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