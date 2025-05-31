import { useSignals } from '@preact/signals-react/runtime'
import { signal } from '@preact/signals'
import { Ctx } from '../context'
import type { Course as CourseType } from '../types'
import Course from './Course'

const currentPage = signal(1)
const ITEMS_PER_PAGE = 9

export default function Courses() {
    useSignals()
    const totalCourses = Ctx.courses.value.length
    const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE)
    const paginatedCourses = Ctx.courses.value.slice(
        (currentPage.value - 1) * ITEMS_PER_PAGE,
        currentPage.value * ITEMS_PER_PAGE
    ) as CourseType[]

    if (Ctx.loading.value) return (
        <div id='courses'>
            <p className='msg-p'>Loading...</p>
        </div>
    )

    return <>
        <div id='courses'>
            {totalCourses > 0 
            ? <>{paginatedCourses.map((c, i) => <Course {...c} key={i} />)}</>
            : <p className='msg-p'>No results</p>
            }
        </div>
        {totalCourses > 0 && <Pagination totalPages={totalPages}/>}
    </>
}


const Pagination = ({ totalPages }: { totalPages: number }) => (
    <div className='pagination'>
        <button onClick={() => currentPage.value--} disabled={currentPage.value === 1}>Prev</button>
        <span>Page {currentPage.value} of {totalPages}</span>
        <button onClick={() => currentPage.value++} disabled={currentPage.value === totalPages}>Next</button>
    </div>
)