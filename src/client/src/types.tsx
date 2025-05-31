export interface Course {
    id: number
    title: string
    description: string
    tags: string[]
    author: string
    duration: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    rating: number
}