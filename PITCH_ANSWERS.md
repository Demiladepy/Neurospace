# NeuroSpace: Pitch Survival Guide

## 1. The "Teacher" Question
**Q:** "Teachers won't have time to scan 20 books. How do you integrate?"
**A:** "We use a **Classroom Node** model. 
1. **Broadcast Mode**: Teacher snaps ONE photo of the board/textbook. The AI generates the personalized variants and broadcasts them to all student tablets instantly.
2. **Quiet Time**: The app is primarily for self-paced 'Decoder' sessions, acting as a specialized aide while the teacher focuses on 1-on-1s."

## 2. The "Data" Question
**Q:** "Won't this consume 500MB data in 2 days?"
**A:** "We use an **Edge-First** architecture.
1. **TinyML**: Initial room scanning (object detection) runs locally on the device (TensorFlow.js/Lite) where possible.
2. **Compression**: Images are downscaled/quantized before upload.
3. **Text-Only Transfer**: The heavy lifting (rewriting) returns just KB of text. Audio is generated client-side or cached."

## 3. The "Expertise/Liability" Question
**Q:** "Llama is not a doctor. What about liability?"
**A:** "NeuroSpace is a **Regulation Tool**, not a Treatment Tool.
1. **Safety Layer**: We have a strict 'Red Zone' classifier. If self-harm or extreme distress is detected, the AI *stops* and displays emergency contacts/parent alerts.
2. **Generic Interventions**: We only use universally safe, non-medical sensory techniques (rhythmic breathing, brown noise) approved by general child psychology standards, avoiding specific medical advice."
