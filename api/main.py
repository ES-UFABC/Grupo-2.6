import uvicorn
from fastapi import FastAPI
from api.routes import routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost",
    "http://localhost:8080",
    "https://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(routes, prefix='')

if __name__ == '__main__':
    uvicorn.run("api.main:app", host="127.0.0.1", port=8000, log_level="info")