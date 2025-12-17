from groq import Groq
import os
from dotenv import load_dotenv

def list_models():
    load_dotenv()
    api_key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_KEY") or os.getenv("groq_key")
    if not api_key:
        print("No API key found.")
        return

    client = Groq(api_key=api_key)
    try:
        models = client.models.list()
        print("Available Models:")
        with open("backend/all_models.txt", "w") as f:
            for m in models.data:
                f.write(f"{m.id}\n")
        print("Models saved to backend/all_models.txt")
    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    list_models()
