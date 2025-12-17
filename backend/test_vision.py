from backend.services.vision_service import VisionService
import requests
from PIL import Image
from io import BytesIO
import os

from dotenv import load_dotenv

def test_groq_vision():
    load_dotenv()
    service = VisionService()
    
    # Download a sample image (document-like or scene)
    url = "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" # "Hello" text or sign usually
    print(f"Downloading sample image from {url}...")
    response = requests.get(url)
    
    # Save to temp file
    temp_path = "temp_test_image.jpg"
    with open(temp_path, "wb") as f:
        f.write(response.content)
    
    print("Analyzing image with Groq Vision...")
    results = service.analyze_image(temp_path)
    
    print("\n--- Analysis Results ---")
    if "error" in results:
        print(f"ERROR: {results['error']}")
    else:
        print(results.get("description"))
    print("------------------------\n")
    
    # Cleanup
    if os.path.exists(temp_path):
        os.remove(temp_path)

if __name__ == "__main__":
    test_groq_vision()
