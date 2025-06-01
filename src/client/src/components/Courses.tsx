import { useSignals } from '@preact/signals-react/runtime'
import { Ctx, Const } from '../context'
import type { Course as CourseType } from '../types'
import Course from './Course'

export default function Courses() {
    useSignals()
    const totalCourses = Ctx.courses.value.length
    const totalPages = Math.ceil(totalCourses / Const.ITEMS_PER_PAGE)
    const paginatedCourses = Ctx.courses.value.slice(
        (Ctx.currentPage.value - 1) * Const.ITEMS_PER_PAGE,
        Ctx.currentPage.value * Const.ITEMS_PER_PAGE
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
        <button onClick={() => Ctx.currentPage.value--} disabled={Ctx.currentPage.value === 1}>Prev</button>
        <span>Page {Ctx.currentPage.value} of {totalPages}</span>
        <button onClick={() => Ctx.currentPage.value++} disabled={Ctx.currentPage.value === totalPages}>Next</button>
    </div>
)