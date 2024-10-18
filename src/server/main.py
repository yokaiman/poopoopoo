import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from rss_parser import Parser
import requests
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Logging setup
logging.basicConfig(filename='logs/app.log', level=logging.INFO)
logger = logging.getLogger(__name__)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    source_url = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic models
class RSSFeed(BaseModel):
    url: str

class LLMConfig(BaseModel):
    name: str
    type: str

class BlogPostPrompt(BaseModel):
    prompt: str

class Automation(BaseModel):
    name: str
    schedule: str

class ProxyConfig(BaseModel):
    url: str

# LLM setup
LLM_TYPE = os.getenv("LLM_TYPE", "local")
if LLM_TYPE == "local":
    model_name = "gpt2"  # You can change this to any locally available model
    model = AutoModelForCausalLM.from_pretrained(f"models/{model_name}")
    tokenizer = AutoTokenizer.from_pretrained(f"models/{model_name}")
    llm = pipeline("text-generation", model=model, tokenizer=tokenizer)
else:
    # Use an API-based model (you'll need to implement this part)
    llm = None

# Proxy setup
PROXY_URL = os.getenv("PROXY_URL", "")
if PROXY_URL:
    proxies = {
        "http": PROXY_URL,
        "https": PROXY_URL
    }
else:
    proxies = None

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/rss-feeds")
async def add_rss_feed(feed: RSSFeed, db: SessionLocal = Depends(get_db)):
    try:
        # Logic to add RSS feed to the database
        logger.info(f"Adding RSS feed: {feed.url}")
        # Implement database logic here
        return {"message": "RSS feed added successfully"}
    except Exception as e:
        logger.error(f"Error adding RSS feed: {str(e)}")
        raise HTTPException(status_code=500, detail="Error adding RSS feed")

@app.get("/rss-feeds")
async def get_rss_feeds(db: SessionLocal = Depends(get_db)):
    try:
        # Logic to retrieve RSS feeds from the database
        logger.info("Retrieving RSS feeds")
        # Implement database logic here
        return {"feeds": []}
    except Exception as e:
        logger.error(f"Error retrieving RSS feeds: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving RSS feeds")

@app.post("/llm-config")
async def add_llm_config(config: LLMConfig):
    try:
        logger.info(f"Adding LLM configuration: {config.name}, Type: {config.type}")
        # Implement logic to save LLM configuration
        return {"message": "LLM configuration added successfully"}
    except Exception as e:
        logger.error(f"Error adding LLM configuration: {str(e)}")
        raise HTTPException(status_code=500, detail="Error adding LLM configuration")

@app.get("/llm-config")
async def get_llm_configs():
    try:
        logger.info("Retrieving LLM configurations")
        # Implement logic to retrieve LLM configurations
        return {"configs": []}
    except Exception as e:
        logger.error(f"Error retrieving LLM configurations: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving LLM configurations")

@app.post("/generate-post")
async def generate_blog_post(prompt: BlogPostPrompt, db: SessionLocal = Depends(get_db)):
    try:
        logger.info(f"Generating blog post with prompt: {prompt.prompt}")
        if LLM_TYPE == "local":
            generated_text = llm(prompt.prompt, max_length=500, num_return_sequences=1)[0]['generated_text']
        else:
            # Implement API-based generation here
            generated_text = "API-based generation not implemented yet."
        
        # Save generated post to database
        new_post = BlogPost(title=prompt.prompt, content=generated_text)
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        
        return {"generated_post": generated_text}
    except Exception as e:
        logger.error(f"Error generating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating blog post")

@app.post("/automations")
async def add_automation(automation: Automation):
    try:
        logger.info(f"Adding automation: {automation.name}, Schedule: {automation.schedule}")
        # Implement logic to add automation
        return {"message": "Automation added successfully"}
    except Exception as e:
        logger.error(f"Error adding automation: {str(e)}")
        raise HTTPException(status_code=500, detail="Error adding automation")

@app.get("/automations")
async def get_automations():
    try:
        logger.info("Retrieving automations")
        # Implement logic to retrieve automations
        return {"automations": []}
    except Exception as e:
        logger.error(f"Error retrieving automations: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving automations")

@app.post("/proxy-config")
async def set_proxy_config(config: ProxyConfig):
    try:
        logger.info(f"Setting proxy configuration: {config.url}")
        global PROXY_URL, proxies
        PROXY_URL = config.url
        if PROXY_URL:
            proxies = {
                "http": PROXY_URL,
                "https": PROXY_URL
            }
        else:
            proxies = None
        return {"message": "Proxy configuration updated successfully"}
    except Exception as e:
        logger.error(f"Error setting proxy configuration: {str(e)}")
        raise HTTPException(status_code=500, detail="Error setting proxy configuration")

@app.get("/logs")
async def get_logs(lines: Optional[int] = 100):
    try:
        with open('logs/app.log', 'r') as log_file:
            return {"logs": log_file.readlines()[-lines:]}
    except Exception as e:
        logger.error(f"Error retrieving logs: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving logs")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)