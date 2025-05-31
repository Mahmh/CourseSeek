from textwrap import dedent
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.schema import Document
import os, shutil, json
from lib.constants import DATA_DIR, VECTORDB_DIR, EMBEDDER_CONFIG

def get_courses() -> list[dict]:
    """Returns a list of all stored courses."""
    with open(f'{DATA_DIR}/courses.json', 'r') as file:
        courses = json.load(file)
    return courses


def load_courses_to_vectordb():
    if os.path.exists(VECTORDB_DIR):
        print(f'⚠️ Vector DB already exists at: {VECTORDB_DIR}')
        shutil.rmtree(VECTORDB_DIR)
        print(f'🗑️ Deleted existing Vector DB at: {VECTORDB_DIR}')

    # Load JSON
    with open(f'{DATA_DIR}/courses.json', 'r', encoding='utf-8') as f:
        courses = json.load(f)

    # Convert to LangChain Document objects
    docs = []
    for course in courses:
        content = dedent(f"""
            Title: {course['title']}
            Tags: {', '.join(course['tags'])}
            Level: {course['level']}
            Description: {course['description']}
        """)
        metadata = {
            'id': course['id'],
            'title': course['title'],
            'tags': ', '.join(course.get('tags', [])),
            'author': course.get('author'),
            'duration': course.get('duration'),
            'level': course.get('level'),
            'rating': course.get('rating')
        }
        docs.append(Document(page_content=content, metadata=metadata))

    # Load SentenceTransformer via HuggingFaceEmbeddings
    embeddings = HuggingFaceEmbeddings(**EMBEDDER_CONFIG)

    # Create & persist vector DB
    Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory=VECTORDB_DIR,
        collection_metadata={'hnsw:space': 'cosine'}
    )
    print(f'✅ Vector DB saved to: {VECTORDB_DIR}')