# CourseSeek – Semantic Course Search App
CourseSeek is a demo web application that lets users search for online courses using **natural language**. It leverages **semantic embeddings** and **vector similarity** to provide smart, intuitive search results — even when keywords don't match exactly.

## Why This Project?
Recruiters and developers often face basic keyword match search. CourseSeek demonstrates how **semantic search** can improve UX by matching user *intent* — not just text.

Built as part of my AI/NLP portfolio to showcase:
- Real-world application of **embeddings**
- Use of **vector databases** or similarity search
- Clean **full-stack** architecture and UI

## Features
- Search using natural language (e.g., *"courses about neural networks for vision"*)
- Dynamically ranked course cards using embedding similarity
- Clean, responsive UI with hover animations
- Easily extendable to other domains (e.g., job boards, product catalogs)

## How It Works
<img src='./search_engine.png' alt='Search Engine Architecture' height=350>

1. All course titles & descriptions are embedded into vectors using a pretrained sentence transformer.
2. User queries are embedded and compared to each course using **cosine similarity**.
3. The top-k most relevant courses are displayed in ranked order.

## Tech Stack
Frontend:
- React + TypeScript + Vite
- SCSS

Backend:
- FastAPI
- JSON DB

AI / NLP:
- SentenceTransformers
- FAISS or cosine sim

## Set up Locally
```bash
git clone https://github.com/Mahmh/CourseSeek.git
cd CourseSeek
bash up.bash
```