# NeuroSpace Backend
Python FastAPI backend for NeuroSpace (Dyslexia & Autism support).

## Features
- **WhatsApp Webhook**: Interface for users.
- **Groq (Llama 3)**: Simplifies text for dyslexia.
- **Vision Stack**:
    - **SAM (Segment Anything)**: For masking/segmenting objects.
    - **DINOv2**: For understanding image context.
    - **EasyOCR**: Extracting text from images.

## Setup
1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
    *Note: PyTorch installation may take time.*

2.  **Environment Variables (`.env`)**:
    Ensure the following are set in your root `.env`:
    ```env
    GROQ_API_KEY=gsk_...
    WHATSAPP_VERIFY_TOKEN=...
    WHATSAPP_TOKEN=...
    PHONE_NUMBER_ID=...
    ```

3.  **Run Server**:
    ```bash
    uvicorn backend.main:app --reload
    ```
    The server runs on `http://localhost:8000`.

## Testing
- **Groq Integration**: `python -m backend.test_groq`
- **Vision Integration**: `python -m backend.test_vision` (Requires internet to download model weights on first run).
