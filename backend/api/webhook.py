from fastapi import APIRouter, Request, HTTPException, Query
import os
import requests
from backend.services.groq_service import GroqService
from backend.services.vision_service import VisionService

router = APIRouter()

# matches the user's suggested env var
VERIFY_TOKEN = os.getenv("WEBHOOK_VERIFY_TOKEN", "neurospace_verify_secret_2025")
WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN") 
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")

# Initialize Services
try:
    vision_service = VisionService()
except Exception as e:
    print(f"Warning: VisionService failed to load: {e}")
    vision_service = None

groq_service = GroqService()

@router.get("/")
async def verify_webhook(
    mode: str = Query(..., alias="hub.mode"),
    token: str = Query(..., alias="hub.verify_token"),
    challenge: str = Query(..., alias="hub.challenge")
):
    """
    Handle the WhatsApp Webhook verification challenge.
    """
    if mode == "subscribe" and token == VERIFY_TOKEN:
        print("Webhook verified successfully!")
        return int(challenge)
    
    print(f"Verification failed. Received token: {token}, Expected: {VERIFY_TOKEN}")
    raise HTTPException(status_code=403, detail="Verification failed")

@router.post("/")
async def handle_message(request: Request):
    """
    Receive and process incoming WhatsApp messages.
    """
    try:
        data = await request.json()
        print("Received webhook data:", data)
        
        # Parse standard WhatsApp message structure
        entry = data.get("entry", [])[0]
        changes = entry.get("changes", [])[0]
        value = changes.get("value", {})
        messages = value.get("messages", [])
        
        if not messages:
            return {"status": "no_messages"}

        message = messages[0]
        msg_type = message.get("type")
        from_number = message.get("from")
        
        response_text = "Sorry, I didn't understand that."

        if msg_type == "text":
            # 1. Handle Text (Simplification)
            user_text = message.get("text", {}).get("body", "")
            print(f"Received text from {from_number}: {user_text}")
            
            # Call Groq/Llama
            simplified = groq_service.simplify_text(user_text)
            response_text = f"Simplified:\n{simplified}"
            
        elif msg_type == "image":
            # 2. Handle Image (Vision + Simplification)
            image_id = message.get("image", {}).get("id")
            print(f"Received image from {from_number} with ID: {image_id}")
            
            try:
                if WHATSAPP_TOKEN:
                    image_path = download_whatsapp_image(image_id, WHATSAPP_TOKEN)
                else:
                    print("WHATSAPP_TOKEN not set, skipping download.")
                    image_path = None
            except Exception as e:
                print(f"Failed to download image: {e}")
                image_path = None 
            
            if image_path:
                if vision_service:
                    print("Analyzing image with Vision Stack...")
                    vision_results = vision_service.analyze_image(image_path)
                    
                    if "error" in vision_results:
                        response_text = f"Error analyzing image: {vision_results['error']}"
                    else:
                        description = vision_results.get("description", "")
                        print(f"Vision Analysis: {description[:100]}...")
                        response_text = f"Analysis:\n{description}"
                else:
                    response_text = "Vision service unavailable."
            else:
                response_text = "Could not download image to process."

        # Send response back (Mocking the send function for now)
        print(f"Simulating Text Back to {from_number}: {response_text}")
        # send_whatsapp_message(from_number, response_text)

        return {"status": "processed"}
        
    except Exception as e:
        print(f"Error processing webhook: {e}")
        return {"status": "error", "message": str(e)}

def send_whatsapp_message(to, body):
    # Placeholder for sending message back via Meta API
    url = f"https://graph.facebook.com/v17.0/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    data = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": body}
    }
    # requests.post(url, headers=headers, json=data)

def download_whatsapp_image(media_id, token):
    """
    Download image from WhatsApp Media API.
    Returns path to temporary file.
    """
    import tempfile
    
    # 1. Get Media URL
    url = f"https://graph.facebook.com/v17.0/{media_id}"
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    media_url = resp.json().get("url")
    
    # 2. Download Content
    image_resp = requests.get(media_url, headers=headers)
    image_resp.raise_for_status()
    
    # 3. Save to Temp File
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(image_resp.content)
        tmp_path = tmp.name
        
    print(f"Downloaded image to {tmp_path}")
    return tmp_path
