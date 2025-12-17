import os
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("HF_TOKEN") or os.getenv("HUGGINGFACE_TOKEN")
if token:
    print(f"HF_TOKEN found: {token[:5]}...")
else:
    print("HF_TOKEN NOT found.")
