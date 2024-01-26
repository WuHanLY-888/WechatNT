import { RouterProvider, createHashRouter } from 'react-router-dom'
import router from './router'
import 'antd/dist/reset.css'
// import TitleBar from './components/titleBar'
// import BeforeEnter from './router/beforeEnter';

// function BeforeEnter() {
//     console.log('BeforeEnter')

//     const Outlet = createHashRouter(router)
//     // const location = useLocation()
//     // console.log(location)

//     return Outlet
// }

function App() {
    const routers = createHashRouter(router)
    return (
        <div>
            {/* <TitleBar /> */}
            {/* <BeforeEnter /> */}
            <RouterProvider router={routers} />
        </div>
    )
}

export default App
