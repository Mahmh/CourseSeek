import Search from "./Search";

export default function Banner() {
    return (
        <div id='banner'>
            <section>
                <h1>CourseSeek</h1>
                <p>Search over 100+ online tech courses with AI-powered semantic search</p>
            </section>
            <Search/>
        </div>
    )
}