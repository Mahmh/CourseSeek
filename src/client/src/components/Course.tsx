import type { Course } from '../types'

export default function Course({ id, title, description, tags, author, duration, level, rating }: Course) {
    const Tags = () => (
        <span className='tags'>
            {tags.map((tag, i) => <label className='tag' key={i}>{tag}</label>)}
        </span>
    )

    return (
        <div className='course'>
            <CourseImg id={id} alt={title}/>
            <section>
                <h1>{title}</h1>
                <p>{description}</p>
                <p><b>Author:</b> {author}</p>
                <p><b>Duration:</b> {duration}</p>
                <p><b>Level:</b> {level}</p>
                <p><b>Rating:</b> {rating}</p>
                {tags && <Tags/>}
            </section>
        </div>
    )
}


const CourseImg = ({ id, alt }: { id: number, alt?: string }) => (
    <img
        src={`http://localhost:8000/img/${id}.png`}
        alt={alt}
        className='course-img'
        loading='lazy'
    />
)