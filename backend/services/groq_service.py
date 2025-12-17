import os
from groq import Groq

class GroqService:
    def __init__(self):
        # Support both GROQ_API_KEY and GROQ_KEY (and lowercase variants)
        self.api_key = os.getenv("GROQ_API_KEY") or os.getenv("GROQ_KEY") or os.getenv("groq_key")
        
        if not self.api_key:
            print("Warning: GROQ_API_KEY (or GROQ_KEY) not found in environment variables")
            self.client = None
        else:
            self.client = Groq(api_key=self.api_key)

    def simplify_text(self, text: str) -> str:
        if not self.client:
            return "Error: Groq API key not configured."

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for neurodivergent users. Simplify the following text to make it easier to read and understand, suitable for someone with dyslexia. Keep the meaning but use simpler words and shorter sentences."},
                    {"role": "user", "content": text}
                ],
                model="llama-3.3-70b-versatile",
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"****** ERROR in GroqService: {e} ******")
            return f"Error: {str(e)}"
