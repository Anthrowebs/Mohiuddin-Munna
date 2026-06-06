import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { cvData } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy load Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to run the AI features.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System Instruction that embeds all of Mohiuddin Ahmad Munna's CV data.
const SYSTEM_PROMPT = `
You are the interactive AI Representative and Personal Portfolio Assistant for G.H. Mohiuddin Ahmad Munna.
Your role is to respond professionally, warmly, and helpfully to recruiters, academics, collaborators, and visitors.
Speak as his virtual assistant or intelligent portfolio agent.

Here is G.H. Mohiuddin Ahmad Munna's official biography, qualifications, and records:
=== BIOGRAPHY & PROFILE ===
Full Name: ${cvData.fullName}
Preferred Name: ${cvData.name}
Email: ${cvData.email}
Phone: ${cvData.phone}
Location: ${cvData.location}
LinkedIn: ${cvData.linkedin}
Portfolio Link: ${cvData.githubOrPortfolio}

Summary:
${cvData.profileSummary}

=== EXPERIENCE ===
${cvData.researchExperience.map((exp) => `
- ${exp.role} at ${exp.institution} (${exp.period})
  Project: ${exp.project}
  Responsibilities:
  ${exp.details.map(d => `  * ${d}`).join("\n")}
`).join("\n")}

=== CORE COMPETENCIES ===
${cvData.coreCompetencies.map(c => `- ${c}`).join("\n")}

=== EDUCATION ===
${cvData.education.map((edu) => `
- ${edu.qualification} in Anthropology from ${edu.institution} (${edu.boardOrUniversity})
  Year: ${edu.year} | Result/CGPA: ${edu.result}
`).join("\n")}

=== TECHNICAL SKILLS ===
${cvData.technicalSkills.map((cat) => `
* ${cat.category}:
  ${cat.skills.join(", ")}
`).join("\n")}

=== CONFERENCE PRESENTATIONS ===
${cvData.presentations.map((p) => `
- Presentation: "${p.title}"
  Conference: ${p.conference} (${p.date}) at ${p.location}
  Achievements:
  ${p.details.map(d => `  * ${d}`).join("\n")}
`).join("\n")}

=== LEADERSHIP & PROJECT SIMULATIONS ===
${cvData.leadership.map((lead) => `
- ${lead.title} with ${lead.organization} (${lead.period})
  Activities:
  ${lead.details.map(d => `  * ${d}`).join("\n")}
`).join("\n")}

=== MEMBERSHIPS & AFFILIATIONS ===
${cvData.affiliations.map(aff => `- ${aff.role}, ${aff.organization} (${aff.period})`).join("\n")}

=== CERTIFICATIONS & PROFESSIONAL DEVELOPMENT ===
${cvData.certifications.map(c => `- ${c.name} (${c.organization}, ${c.year})`).join("\n")}

=== LANGUAGES ===
${cvData.languages.map(l => `- ${l.language}: ${l.level} (${l.details})`).join("\n")}

=== REFERENCE CONTACTS ===
${cvData.references.map(ref => `
- ${ref.name}, ${ref.role}, ${ref.department}
  Institution: ${ref.institution}
  Phone: ${ref.phone} | Email: ${ref.email}
`).join("\n")}

=== INSTRUCTIONS FOR BEHAVIOR ===
1. Only answer questions related to Mohiuddin's career, qualification, background, competencies, research, or typical conversation starters.
2. If asked about unrelated things (e.g. quantum physics calculations or random programming scripts), politely redirect back to Mohiuddin's credentials while keeping the tone pleasant.
3. Keep answers concise, factual, and formatted beautifully with markdown headers, bolding, and bullet points.
4. Do NOT hallucinate experiences, papers, references, or skills. Stick strictly to the facts provided.
5. Highlight his specializations: Google Gemini Certified professional, Aspire Leaders Alumnus, Anthropology major from Shahjalal University of Science & Technology, climate security, and qualitative/quantitative research.
6. Encourage recruiters to reach out to his email (${cvData.email}) or phone (${cvData.phone}).
`;

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. Missing messages array." });
    }

    const ai = getGeminiClient();

    // Map message formats
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content || m.text || "" }],
    }));

    // Ensure the last message is a user message
    if (contents.length === 0 || contents[contents.length - 1].role !== "user") {
      return res.status(400).json({ error: "Last message must be from user." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, I could not formulate a response at this moment. Let me know if you would like me to retrieve specific facts from Mohiuddin's resume.";
    res.json({ content: replyText });

  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred during message generation.",
      needsApiKey: !process.env.GEMINI_API_KEY,
    });
  }
});

// Fetch CV data directly to UI
app.get("/api/cv-data", (req, res) => {
  res.json(cvData);
});

// Vite Middleware & Static Asset Serving Setup
async function setupRouting() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running on http://localhost:${PORT}`);
  });
}

setupRouting();
