import { Signal, signal } from '@preact/signals'
import type { Course } from './types'

export namespace Const {
    export const ITEMS_PER_PAGE = 9
}

export namespace Ctx {
    export const courses: Signal<Course[]> = signal([])
    export const loading = signal(false)
    export const currentPage = signal(1)
}