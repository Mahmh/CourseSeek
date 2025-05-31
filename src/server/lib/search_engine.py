from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from lib.constants import VECTORDB_DIR, EMBEDDER_CONFIG

def search_courses(query: str, top_k: int = 15, distance_threshold: float = .7) -> list[dict]:
    """Semantic search using cosine similarity (1 - distance)."""
    print('QUERY:', query)
    embeddings = HuggingFaceEmbeddings(**EMBEDDER_CONFIG)
    vectordb = Chroma(
        persist_directory=VECTORDB_DIR,
        embedding_function=embeddings,
        collection_metadata={'hnsw:space': 'cosine'}
    )

    results_with_scores = vectordb.similarity_search_with_score(query, k=top_k)

    results = []
    for doc, score in results_with_scores:
        print(doc.metadata['title'], score)
        if score <= distance_threshold:
            results.append(doc)

    return [
        {
            'id': doc.metadata['id'],
            'title': doc.metadata['title'],
            'description': doc.page_content,
            'tags': doc.metadata.get('tags').split(', '),
            'author': doc.metadata.get('author'),
            'duration': doc.metadata.get('duration'),
            'level': doc.metadata.get('level'),
            'rating': doc.metadata.get('rating')
        }
        for doc in results
    ]