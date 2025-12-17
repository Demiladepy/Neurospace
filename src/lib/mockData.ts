export const sentinelAnalysis = {
  isSafe: false,
  issues: [
    { id: 1, label: 'Television On', confidence: 0.98, box: { x: 10, y: 20, w: 30, h: 25 }, action: 'Turn off the TV to reduce visual noise.' },
    { id: 2, label: 'Cluttered Table', confidence: 0.92, box: { x: 50, y: 60, w: 40, h: 30 }, action: 'Clear the table. Only essentials allowed.' },
    { id: 3, label: 'Dim Lighting', confidence: 0.85, box: { x: 80, y: 10, w: 15, h: 15 }, action: 'Increase light brightness for focus.' },
  ]
};

export const textbookContent = {
  original: `The Local Government is the third tier of government in Nigeria. It is closest to the people. It is responsible for the maintenance of law and order, construction of feeder roads, and provision of primary healthcare. The Chairman heads the executive arm of the local government.`,
  personalized: `Imagine the Local Government is like **Spider-Man's Neighborhood Watch**. 
  
  Just like **Spider-Man** is the hero closest to the people in Queens, the **Local Government** is the government closest to your family! 
  
  🕸️ **Missions:**
  - **Keeping Peace:** Like Spidey stops bad guys, they keep law and order.
  - **Building Webs (Roads):** They fix the small roads (feeder roads) that lead to your house.
  - **Healing:** They built the clinic nearby, just like a superhero medical center!
  
  The **Chairman** is like the leader of the spider-team!`
};

export const rescueTrigger = {
  detected: true,
  reason: "High-Stress Vocal Pattern (Crying/Screaming)",
  dbLevel: 85,
  intervention: "Sensory Overload Detected. Initiating Calm Protocol.",
  audioFile: "/calm-ocean.mp3" // Placeholder
};
