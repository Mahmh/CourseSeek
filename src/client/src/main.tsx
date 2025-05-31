import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useSignals } from '@preact/signals-react/runtime'
import { Request } from './utils'
import { Ctx } from './context'
import type { Course } from './types'
import Banner from './components/Banner'
import Courses from './components/Courses'
import './styles/main.css'

export default function App() {
    useSignals()

    const getAllCourses = async () => {
        Ctx.loading.value = true
        await new Request(
            '/',
            (data: Course[]) => {
                Ctx.courses.value = data
                Ctx.loading.value = false
            },
            (error) => {
                console.error('Failed to fetch courses:', error)
                Ctx.loading.value = false
            }
        ).get()
    }

    useEffect(() => {
        getAllCourses()
    }, [])

    return (
        <>
            <Banner/>
            <Courses/>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
)