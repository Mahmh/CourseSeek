import { Signal, signal } from '@preact/signals'
import type { Course } from './types'

export namespace Ctx {
    export const courses: Signal<Course[]> = signal([])
    export const loading = signal(false)
}