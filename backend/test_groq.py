from backend.services.groq_service import GroqService
from dotenv import load_dotenv
import os

def test_groq():
    load_dotenv()
    key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_KEY") or os.getenv("groq_key")
    if not key:
        print("FAIL: GROQ_API_KEY (or GROQ_KEY) not found in environment.")
        return

    print(f"GROQ_API_KEY found: {key[:5]}...")
    
    service = GroqService()
    print("Attempting to simplify text...")
    result = service.simplify_text("The patient presents with acute nasopharyngitis and pyrexia.")
    print("\n--- Result ---")
    print(result)
    print("--------------\n")

if __name__ == "__main__":
    test_groq()
