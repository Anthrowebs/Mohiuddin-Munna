export interface Education {
  qualification: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  result: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResearchExperience {
  role: string;
  period: string;
  institution: string;
  project: string;
  details: string[];
}

export interface Presentation {
  conference: string;
  date: string;
  location: string;
  title: string;
  details: string[];
}

export interface LeadershipExperience {
  title: string;
  organization: string;
  period: string;
  details: string[];
}

export interface Certification {
  name: string;
  organization: string;
  year: string;
}

export interface Reference {
  name: string;
  role: string;
  department: string;
  institution: string;
  phone: string;
  email: string;
}

export interface CVData {
  name: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  githubOrPortfolio: string;
  profileSummary: string;
  coreCompetencies: string[];
  education: Education[];
  technicalSkills: SkillCategory[];
  researchExperience: ResearchExperience[];
  presentations: Presentation[];
  leadership: LeadershipExperience[];
  affiliations: Array<{ organization: string; role: string; period: string }>;
  certifications: Certification[];
  languages: Array<{ language: string; level: string; details: string }>;
  references: Reference[];
}

export const cvData: CVData = {
  name: "Mohiuddin Munna",
  fullName: "G.H. Mohiuddin Ahmad Munna",
  title: "Researcher & Data Analyst | CRM Administrator | AI Educator",
  email: "mohiuddinmunna308@gmail.com",
  phone: "+880 1625-482308",
  location: "Sylhet, Bangladesh",
  linkedin: "https://www.linkedin.com/in/anthrowebs-mohiuddinmunna",
  githubOrPortfolio: "https://portfolio-mohiuddinmunna.vercel.app", // standard portfolio format
  profileSummary: `A highly skilled professional with expertise in data analysis, project management, CRM administration, web development, and AI-assisted productivity. Have practical experience in coordinating multiple projects across development, academic, and digital sectors. Proficient in Power BI, SPSS, ATLAS.ti, SurveyCTO, HubSpot, WordPress, Trello, ClickUp, Microsoft 365, and Google Workspace, with certifications from Google, Microsoft, and the University of Maryland. Selected as an Aspire Leaders Alumnus by the Aspire Institute, USA and recognised as both a Google Certified Educator and Gemini Certified professional. Fluent in English and Bengali, adept at working independently or within teams, and equally effective in office, field, or remote environments.`,
  coreCompetencies: [
    "Data Analysis & Visualisation",
    "Remote & Digital Work",
    "Project Management",
    "Report Writing & Documentation",
    "Digital Content Creation",
    "Web Development",
    "AI Assisted Productivity",
    "Client & Stakeholder Management",
    "Cross-Cultural Communication",
    "Public Speaking & Presentation",
    "Team Collaboration",
    "CRM Administration",
    "Process Improvement",
    "Academic & Professional Writing",
    "Time Management"
  ],
  education: [
    {
      qualification: "MSS (Anthropology)",
      institution: "Shahjalal University of Science & Technology",
      boardOrUniversity: "SUST",
      year: "2026 (Expected)",
      result: "Enrolled"
    },
    {
      qualification: "BSS (Anthropology)",
      institution: "Shahjalal University of Science & Technology",
      boardOrUniversity: "SUST",
      year: "2023",
      result: "3.44 / 4.00"
    },
    {
      qualification: "HSC (Science)",
      institution: "Jalalabad Cantonment Public School & College",
      boardOrUniversity: "Sylhet Board",
      year: "2019",
      result: "5.00 / 5.00"
    },
    {
      qualification: "SSC (Science)",
      institution: "Chhatak Cement Factory High School",
      boardOrUniversity: "Sylhet Board",
      year: "2017",
      result: "5.00 / 5.00"
    }
  ],
  technicalSkills: [
    {
      category: "Research & Data Analysis",
      skills: ["SPSS", "ATLAS.ti", "SurveyCTO", "Power BI", "EndNote 20"]
    },
    {
      category: "Design & Web",
      skills: ["WordPress", "Elementor", "Canva", "Figma", "CMS"]
    },
    {
      category: "Office & Productivity",
      skills: ["Microsoft 365 (Word, Excel, PowerPoint)", "Google Workspace", "Teams", "Zoom"]
    },
    {
      category: "CRM & Project Management",
      skills: ["HubSpot", "OnePageCRM", "Monday CRM", "Trello", "ClickUp"]
    },
    {
      category: "AI & Emerging Tech",
      skills: ["Google Gemini", "Claude", "Perplexity", "ChatGPT", "NotebookLM", "Microsoft Copilot", "Generative AI Tools"]
    }
  ],
  researchExperience: [
    {
      role: "Research Assistant",
      period: "March 2025 – March 2026",
      institution: "Department of Anthropology, SUST | Government-Directed University Research",
      project: "Conceptualizing “Pedagogical Competence” of Sexual & Reproductive Health (SRH): A qualitative exploration into the discursive barriers to SRH in the Bangladesh sexuality education curriculum.",
      details: [
        "Conducted in-depth interviews and focus group discussions (FGDs) with study participants across field sites.",
        "Built participant rapport and maintained ethical field observation practices throughout data collection.",
        "Managed transcription of recorded interviews.",
        "Contributed to manuscript drafting for academic publication."
      ]
    },
    {
      role: "Research Assistant",
      period: "Sep 2024 – Sep 2025",
      institution: "Bangladesh Climate Change Trust | Ministry of Environment, Forests & Climate Change · SUST",
      project: "The Interpretation of the Itna-Mithamoin-Austogram Highway and Climate Security: A qualitative Analysis of Haor Ecologies in Bangladesh.",
      details: [
        "Conducted field interviews in remote Haor communities and recorded detailed participant observation notes.",
        "Carried out systematic thematic analysis of qualitative data and prepared structured field reports.",
        "Contributed to manuscript."
      ]
    },
    {
      role: "Research Assistant",
      period: "Jul 2024 – Jul 2025",
      institution: "University Research Centre, SUST",
      project: "A Qualitative Exploration of the Perception Towards Cervical Cancer and its screening Behaviors Among the Tea-Laborer in Sylhet, Bangladesh.",
      details: [
        "Administered semi-structured interviews and managed informed consent processes with community participants.",
        "Maintained detailed field notes and performed systematic data coding using qualitative analysis protocols.",
        "Contributed to manuscript writing."
      ]
    },
    {
      role: "Research Assistant",
      period: "Jun 2024 – Jun 2025",
      institution: "Department of Anthropology, SUST",
      project: "Disabled Lives, Disabled Rights: A Multisite Qualitative Exploration into the Everyday Life of Students with Disabilities in Public Universities in Bangladesh.",
      details: [
        "Conducted multisite fieldwork and participant interviews across multiple university campuses in Bangladesh.",
        "Compiled observation reports, managed transcription, and performed data coding across a large qualitative dataset.",
        "Contributed to literature review."
      ]
    },
    {
      role: "Transcriber",
      period: "March 2025",
      institution: "Christian Aid",
      project: "End-line Study of Gender Transformative Climate Resilient Microfinance Project.",
      details: [
        "Accurately transcribed primary qualitative interview data for an international NGO end-line study."
      ]
    }
  ],
  presentations: [
    {
      conference: "RUEC International Research Conference",
      date: "September 6–7, 2025",
      location: "Rajshahi University, Bangladesh",
      title: "Youth as Active Social Agents: A Qualitative Case Study of Student-Run KIN School at Shahjalal University of Science and Technology.",
      details: [
        "Poster presentation on youth as active social agents in student-led educational initiatives.",
        "Contributed to discussions on institutional change and youth-driven reform."
      ]
    },
    {
      conference: "International Conference on Anthropology of Nepal and the Himalayas",
      date: "July 20–21, 2025",
      location: "Tribhuvan University, Nepal",
      title: "Cultural Resilience in Transforming world: Challenges and Opportunities for Meitei Manipuri Cultural Heritage Preservation in Bangladesh.",
      details: [
        "Presented Undergraduate thesis research on cultural identity, displacement, and community resilience to an international academic audience.",
        "Received substantive feedback from international scholars on heritage dynamics and postcolonial frameworks."
      ]
    }
  ],
  leadership: [
    {
      title: "Siemens Project Manager Job Simulation",
      organization: "Forage",
      period: "March 2026",
      details: [
        "Completed a practical, real-world project management simulation focused on corporate planning and performance monitoring.",
        "Developed Key Performance Indicators (KPIs) and designed project dashboards to track outcomes across workstreams.",
        "Applied project planning, risk tracking, and execution strategies within a structured business environment."
      ]
    },
    {
      title: "Aspire Leaders Program (Cohort 5)",
      organization: "Aspire Institute, USA",
      period: "October – December 2025",
      details: [
        "Selected from a global applicant pool to join a highly competitive international cohort of emerging leaders (9-week global programme).",
        "Completed training in strengths-based leadership, AI integration in professional settings, and digital transformation strategy.",
        "Designed and executed a community impact project addressing a real local development challenge."
      ]
    },
    {
      title: "UNESCO Youth Hackathon 2025",
      organization: "UNESCO",
      period: "September – October 2025",
      details: [
        "Submitted a youth-driven innovation project addressing global and local social challenges aligned with SDG frameworks.",
        "Collaborated with peers to develop scalable, evidence-based solutions for community-level problems."
      ]
    },
    {
      title: "12th International Youth Conference",
      organization: "International Organization of Youth, USA",
      period: "September 2025",
      details: [
        "Participated in global policy discussions on youth leadership, governance, and social development alongside international delegates in a virtual format."
      ]
    },
    {
      title: "International Youth Day 'Generation SDG'",
      organization: "Eco Prescription",
      period: "August 2025",
      details: [
        "Served as Official Notetaker — captured key discussions, SDG-linked insights, and outcomes for institutional records and publication."
      ]
    }
  ],
  affiliations: [
    {
      organization: "ASEAN Youth Organization",
      role: "Member",
      period: "May 2026 – Present"
    },
    {
      organization: "Freire Institute",
      role: "Professional Member",
      period: "April 2026 – Present"
    },
    {
      organization: "International Peace Bureau (IPB)",
      role: "Individual Member",
      period: "May 2026 – Present"
    },
    {
      organization: "Amnesty International",
      role: "International Member",
      period: "April 2026 – Present"
    }
  ],
  certifications: [
    { name: "AI and Career Empowerment", organization: "University of Maryland, Smith School of Business", year: "2026" },
    { name: "Analyzing Data with Power BI", organization: "Analytics Vidhya", year: "2026" },
    { name: "Cyber Hygiene Training", organization: "The Asia Foundation & SAJIDA Foundation", year: "2026" },
    { name: "Design Power BI Reports", organization: "Microsoft", year: "2026" },
    { name: "Get Started Building with Power BI", organization: "Microsoft", year: "2026" },
    { name: "Project Management Foundations", organization: "Simplilearn", year: "2026" },
    { name: "Siemens Project Manager Job Simulation", organization: "Forage", year: "2026" },
    { name: "Aspire Leaders Program – Cohort 5", organization: "Aspire Institute, USA", year: "2025" },
    { name: "Elevate Your Public Speaking", organization: "BOHUBRIHI", year: "2025" },
    { name: "Enhance Teaching with Microsoft 365 Copilot", organization: "Microsoft", year: "2025" },
    { name: "Gemini Certified Educator (2025–2028)", organization: "Google for Education", year: "2025" },
    { name: "Google Certified Educator Level 1 (2025–2028)", organization: "Google for Education", year: "2025" },
    { name: "Introduction to Generative AI & Agents", organization: "Microsoft", year: "2025" },
    { name: "Resume Writing", organization: "Mentors Learning", year: "2025" },
    { name: "Scientific Manuscript Writing", organization: "Dept. of Anthropology, SUST", year: "2025" },
    { name: "TeachingEnglish: Managing Learning", organization: "British Council", year: "2025" },
    { name: "WordPress & CMS Development", organization: "Times IT", year: "2025" }
  ],
  languages: [
    { language: "Bengali (Bangla)", level: "Native", details: "Native command, fluent spoken and written" },
    { language: "English", level: "Professional Proficiency", details: "Advanced Reading • Advanced Writing • Advanced Speaking" }
  ],
  references: [
    {
      name: "Dr. Md. Shahgahan Miah",
      role: "Professor",
      department: "Department of Anthropology",
      institution: "Shahjalal University of Science & Technology",
      phone: "+880 1740-992656",
      email: "shahgahan-anp@sust.edu"
    },
    {
      name: "Chand Mia",
      role: "Assistant Professor",
      department: "Department of Anthropology",
      institution: "Shahjalal University of Science & Technology",
      phone: "+880 1917-870702",
      email: "chandm-anp@sust.edu"
    }
  ]
};
