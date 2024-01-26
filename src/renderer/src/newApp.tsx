import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './router'

const router = createHashRouter(routes)

const app = () => <RouterProvider router={router} />

export default app
