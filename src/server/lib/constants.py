import os, torch

# Misc
WEB_SERVER_URL = 'http://localhost:5173'
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) 
DATA_DIR = os.path.join(CURRENT_DIR, '../data')

# Search engine
VECTORDB_DIR = os.path.join(DATA_DIR, 'vectordb')
EMBEDDER_CONFIG = dict(
    model_name='sentence-transformers/all-mpnet-base-v2',
    model_kwargs={
        'device': 'cuda' if torch.cuda.is_available() else 'cpu'
    }
)