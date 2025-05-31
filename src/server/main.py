from contextlib import asynccontextmanager
from fastapi import FastAPI, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from lib.data import get_courses, load_courses_to_vectordb
from lib.search_engine import search_courses
from lib.constants import DATA_DIR, WEB_SERVER_URL

@asynccontextmanager
async def _lifespan(app: FastAPI):
    load_courses_to_vectordb()
    yield


app = FastAPI(lifespan=_lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[WEB_SERVER_URL],
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=['*'],
    allow_credentials=True
)

@app.get('/img/{course_id}.png')
def serve_image(course_id: int):
    return FileResponse(f'{DATA_DIR}/img/{course_id}.png', media_type='image/png')


@app.post('/search')
def search_courses_(query: str = Body(..., embed=True)):
    return search_courses(query)


@app.get('/')
def root():
    return get_courses()