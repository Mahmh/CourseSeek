import { signal } from '@preact/signals'
import { useSignals } from '@preact/signals-react/runtime'
import { Request } from '../utils'
import { Ctx } from '../context'
import type { Course } from '../types'

const searchQuery = signal('')
const error = signal<string|null>(null)

export default function Search() {
    useSignals()

    const search = async () => {
        Ctx.loading.value = true
        Ctx.currentPage.value = 1

        await new Request(
            '/search',
            (data: Course[]) => {
                Ctx.courses.value = data
                Ctx.loading.value = false
            },
            (error_) => {
                error.value = error_
                Ctx.loading.value = false
            }
        ).post({ query: searchQuery.value })
    }

    const reset = async () => {
        Ctx.loading.value = true
        Ctx.currentPage.value = 1
        searchQuery.value = ''
        error.value = null

        await new Request(
            '/',
            (data: Course[]) => {
                Ctx.courses.value = data
                Ctx.loading.value = false
            },
            (error_) => {
                error.value = error_
                Ctx.loading.value = false
            }
        ).get()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') search()
    }

    return (
        <section className='search'>
            <input
                type='text'
                placeholder='Search for a course here'
                onChange={e => searchQuery.value = e.currentTarget.value}
                onKeyDown={handleKeyDown}
            />
            <button onClick={search} disabled={searchQuery.value === ''}>Search</button>
            <button onClick={reset}>Reset</button>
            {error.value && <p className='error'>{error.value}</p>}
        </section>
    )
}