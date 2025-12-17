class VisionService:
    def __init__(self):
        print("VisionService initialized in MOCK/MAINTENANCE mode.")

    def analyze_image(self, image_path: str):
        """
        Mock analysis to allow system to function during API outages.
        """
        return {
            "description": "[System Notice]: Vision AI is currently undergoing maintenance (Hugging Face / Groq Service Outage). Image received but not analyzed.",
            "status": "mock_success"
        }
