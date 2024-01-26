import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Login from '@renderer/Pages/Login'

const Layout = lazy(() => import('@renderer/layout'))
const About = lazy(() => import('@renderer/Pages/about'))
const Map = lazy(() => import('@renderer/Pages/Map'))
const Page2 = lazy(() => import('@renderer/Pages/about copy 2'))

const withLoadingComponent = (comp: JSX.Element) => <React.Suspense>{comp}</React.Suspense>

const NavigateIntercept = () => {
    return <Navigate to="/login" />
}

const routes = [
    {
        path: '/',
        element: <NavigateIntercept />
    },
    {
        path: '/',
        element: withLoadingComponent(<Layout />),
        auth: true,
        children: [
            {
                path: '/ipcCommunication',
                element: withLoadingComponent(<About />),
                meta: {
                    about: 'test'
                },
                auth: true
            },
            {
                path: '/map',
                element: withLoadingComponent(<Map />)
            },
            {
                path: '/page2',
                element: withLoadingComponent(<Page2 />)
            }
        ]
    },
    {
        path: '/login',
        element: withLoadingComponent(<Login />)
    }
]

export default routes
