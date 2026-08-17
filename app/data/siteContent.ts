export type Publication = {
  authors: string;
  year: string;
  title: string;
  venue: string;
  link?: string;
  linkLabel?: string;
  note?: string;
};

export type ResearchArea = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  thesis: string;
  description: string;
  questions: string[];
  publications: Publication[];
  projects: { text: string; status: string }[];
  dissertation?: {
    title: string;
    text: string;
  };
};

export const institutionLinks = {
  bridgeHumanities:
    "https://sc.edu/study/colleges_schools/artsandsciences/academics/graduate/bridge_humanities/",
  raceAndJustice: "https://journals.sagepub.com/home/raj",
  internationalCriminology: "https://internationalcriminology.com/",
};

export const researchAreas: ResearchArea[] = [
  {
    id: "race-culture-strain",
    number: "01",
    title: "Race/Ethnicity, Culture, and Strain",
    shortTitle: "Race, culture & strain",
    thesis: "Theory should recognize the experiences it was not built to see.",
    description:
      "Criminological theories explain crime and victimization through the experiences they were built on, and some populations were missed in that foundation. In this area, I examine how distinct cultural and social contexts shape strain, coping, and harm. The larger goal moves beyond explanation: understanding how these contexts should inform theory, measurement, and institutional practice, so that the people they describe are protected by and integrated into the systems built to serve them.",
    questions: [
      "How are diverse forms of victimization produced and reproduced?",
      "How do cultural contexts shape strain, coping, and harm?",
      "How can societies and institutions respond to protect them?",
    ],
    dissertation: {
      title: "Developing and validating Asian American general strain theory",
      text: "My dissertation, “Developing and validating Asian American general strain theory,” builds and tests a general strain theory framework specific to Asian American experiences. It is now developing into a series of articles on (1) the theory’s validation, (2) impact of collectivism, and (3) immigrant generational variation. Extending this work, I am lead PI on a proposal under review at the Russell Sage Foundation, examining ethnic heterogeneity among Asian Americans and their experiences in the criminal justice system.",
    },
    publications: [
      {
        authors: "Noh, H. & Sim, R.",
        year: "2026",
        title:
          "Constructing the “other”: Online racialized hate speech and perceived threats in South Korea",
        venue: "Ethnic and Racial Studies",
        link: "https://doi.org/10.1080/01419870.2026.2622421",
      },
      {
        authors: "Noh, H.* & Jo, Y.",
        year: "2026",
        title:
          "Correlates of non-suicidal self-injury in South Korean juvenile detention facilities: A general strain theory perspective",
        venue: "Journal of Criminal Justice",
        link: "https://doi.org/10.1016/j.jcrimjus.2025.102573",
      },
      {
        authors: "Noh, H. & Isom, D. A.",
        year: "2023",
        title:
          "Strain in a collectivist society: An assessment of Agnew’s Asian general strain theory in South Korea",
        venue: "International Criminology, 3(3), 185–201",
        link: "https://doi.org/10.1007/s43576-023-00102-4",
      },
      {
        authors: "Noh, H.",
        year: "Forthcoming · 2026",
        title:
          "The Intersection of Race, Culture, and Strain: Insights from the Asian American Community",
        venue:
          "In Kelly Welch (Ed.), Research Handbook on Race, Crime and Justice, Edward Elgar Publishing",
        note: "Book chapter",
      },
      {
        authors: "Noh, H.",
        year: "2026",
        title: "Theories of Sex Offending",
        venue:
          "Global Perspectives on Sex Offending, pp. 19–34, Bloomsbury Publishing",
        link: "https://doi.org/10.5040/9798881845575.0005",
        note: "Book chapter",
      },
      {
        authors: "Noh, H. & Isom, D. A.",
        year: "2026",
        title:
          "Misrecognition and victimization: The South Asian American experience",
        venue:
          "The Critical Criminologist: Special Issue, 34(2), 27–30. Division of Critical Criminology and Social Justice, American Society of Criminology",
        link: "https://divisiononcriticalcriminology.com/publications/newsletter/",
        linkLabel: "Issue",
        note: "Newsletter",
      },
    ],
    projects: [
      {
        status: "Under review",
        text: "Noh, H.*, Song, J., & Park, H. Using machine learning alongside conventional regression, this study compares traditional criminological theory factors with cultural adaptation factors in explaining online offending among second-generation immigrant adolescents in South Korea.",
      },
    ],
  },
  {
    id: "technology-facilitated-violence",
    number: "02",
    title: "Technology-Facilitated Violence",
    shortTitle: "Technology-facilitated violence",
    thesis: "New forms of harm emerge faster than data and law can adapt.",
    description:
      "Emerging technologies create new forms of victimization faster than data and law can adapt. My work to date has examined stalking, cyberstalking, deepfake abuse, and other forms of online harm, showing that aggregate statistics conceal distinct patterns of victimization and coping. I am now extending this line in two directions: tracing how online harm translates into offline violence, discrimination, and public perceptions, and identifying the routes through which victims come to seek help. Because these harms cross borders by design, my work in this area is built on international and interdisciplinary collaboration.",
    questions: [
      "How do emerging technologies reshape victimization?",
      "What patterns persist across forms of online harm, and what routes lead victims to help?",
    ],
    publications: [
      {
        authors: "Noh, H.",
        year: "2026",
        title:
          "Beneath the surface of symmetry: Gender patterns and victim–offender overlap in technology-facilitated gender-based violence",
        venue: "Journal of Criminal Justice",
        link: "https://doi.org/10.1016/j.jcrimjus.2026.102709",
      },
      {
        authors: "Noh, H.* & Isom, D. A.",
        year: "2026",
        title:
          "Gender differences in stalking victimization and coping strategies: An application of gendered general strain theory",
        venue: "Deviant Behavior",
        link: "https://doi.org/10.1080/01639625.2026.2638889",
      },
    ],
    projects: [
      {
        status: "Ongoing study",
        text: "Noh, H. & Sutton, T. An ongoing study examines how masculinity ideology and male peer support shape the victim–offender overlap in gender-based violence.",
      },
    ],
  },
  {
    id: "law-victim-protection",
    number: "03",
    title: "Legal Responses and Victim Protection",
    shortTitle: "Law & victim protection",
    thesis: "Protection depends on law that victims can actually reach.",
    description:
      "Documenting victimization showed me a second problem: many victims struggle to report harm or to be recognized when they do. In this area, I examine how law can protect victims and, through that protection, enhance public safety. My work follows legal responses across their life course: how statutes are written and interpreted, how courts sentence, and how governments respond when new forms of abuse outgrow existing law. A growing strand turns to statutory language itself, because protection often hinges on how the same ambiguous terms are read by the public, by legal practitioners, and increasingly by AI systems. I am also extending this work comparatively, asking what jurisdictions can learn from one another as harm increasingly crosses borders. The aim is law that victims can actually reach: legible statutes, consistent enforcement, and institutions that respond before harm escalates.",
    questions: [
      "How can institutions and legal frameworks better recognize and protect victims?",
      "Given the transnational nature of online offending, what can comparative analysis beyond the United States reveal about effective legal responses?",
    ],
    publications: [
      {
        authors: "Noh, H., Lee, S., & Burrow, J. D.",
        year: "2026",
        title:
          "Assessing judicial responses of judges to stalking in South Korea: A focal concerns perspective",
        venue: "Journal of Criminal Justice",
        link: "https://doi.org/10.1016/j.jcrimjus.2025.102593",
      },
      {
        authors: "Jung, S. & Noh, H.*",
        year: "2025",
        title:
          "From grassroots advocacy to AI governance: Lessons from South Korea’s 2024 Deepfake Sexual Abuse Crisis on democratising knowledge and policy",
        venue:
          "International Journal of Comparative and Applied Criminal Justice",
        link: "https://doi.org/10.1080/01924036.2025.2596578",
      },
      {
        authors: "Noh, H., Lee, S., & Burrow, J. D.",
        year: "2025",
        title:
          "Situational and contextual circumstances of stalking in South Korea: An initial examination of sentencing outcomes in the District Court of South Korea",
        venue: "Victims & Offenders",
        link: "https://doi.org/10.1080/15564886.2025.2475848",
      },
    ],
    projects: [
      {
        status: "Preparing funding",
        text: "Burrow, J. D., & Noh, H. A comparative study of public defenders in the United States and South Korea.",
      },
      {
        status: "Manuscript in progress",
        text: "Noh, H., Yoon, J., & Burrow, J. D. A follow-up study applies focal concerns theory to incarcerated stalkers who violate protective measures, extending the sentencing work into enforcement.",
      },
      {
        status: "Manuscript in progress",
        text: "Noh, H. Another study examines how fear shapes stalking victims' legal help-seeking.",
      },
      {
        status: "Preparing funding",
        text: "Noh, H., Sim, R., et al. In collaboration with linguists, we experimentally compare how the public and legal practitioners interpret ambiguous terms in anti-stalking statutes, examining the gap between ordinary understandings of the law and its professional application.",
      },
    ],
  },
  {
    id: "ai-computational-methods",
    number: "04",
    title: "AI and Computational Methods",
    shortTitle: "AI & computational methods",
    thesis: "AI is both a research tool and a subject of justice inquiry.",
    description:
      "Artificial intelligence is transforming how the justice system documents, predicts, and interprets. Rather than replacing traditional criminology, I pair established theories and methods with AI and machine learning to test where each adds value and where each reaches its limits, across policing, risk prediction, and legal interpretation. This work treats AI as both a research tool and a research subject to enhance accuracy, fairness and public safety. The goal is integration with safeguards proportionate to what is at stake.",
    questions: [
      "What can AI and machine learning do reliably in justice decisions, and where do they fall short?",
      "How should societies govern the harms that AI itself creates?",
    ],
    publications: [
      {
        authors: "Jung, S., Choi, K., Noh, H., Lee, J., Kim, M., Park, I., & Back, S.",
        year: "2026",
        title:
          "Exploratory analysis of cryptocurrency transactions of Darknet drug markets: Connections to organized crime",
        venue: "Journal of Financial Crime",
        link: "https://doi.org/10.1108/JFC-04-2025-0106",
      },
    ],
    projects: [
      {
        status: "Manuscript in revisions",
        text: "Park, H., Noh, H.*, & Yoon, M. This project develops AI-assisted police report generation program from body-worn camera footage, comparing audio-only and multimodal approaches.",
      },
      {
        status: "Manuscript in revisions",
        text: "Noh, H.*, Park, H., & Son, C. We compared machine learning and traditional statistical models for juvenile recidivism prediction, asking not only which performs better but what each misses.",
      },
      {
        status: "Preparing funding",
        text: "Noh, H., Sim, R., et al. In collaboration with linguists, we examine how large language models interpret ambiguous terms in anti-stalking statutes, comparing their interpretations against actual court rulings.",
      },
    ],
  },
];

export const selectedPublications = [
  researchAreas[1].publications[0],
  researchAreas[2].publications[0],
  researchAreas[0].publications[0],
];

export const courses = [
  {
    code: "SAEL 200",
    title: "Social Advocacy and Ethical Life",
    status: "Upcoming",
    level: "Undergraduate",
    format: "In person",
    terms: "Fall 2026",
    description:
      "A civic ethics and advocacy course built around a single question: who gets heard? Students learn social advocacy by staying with one issue all semester: listening first, then mapping the debate, then making their case with evidence.",
    activity: {
      title: "Hearing the Unheard",
      text: "Before taking any public position, students conduct fieldwork, observing, interviewing, or creating a photovoice essay, to listen to voices rarely centered in their chosen issue, then examine how listening changed what they thought they knew.",
    },
  },
  {
    code: "CRJU202",
    title: "Research Methods",
    status: "Previously taught",
    level: "Undergraduate",
    format: "In person",
    terms: "Fall 2025, Spring 2023, Fall 2022",
    description:
      "An introduction to research design and data analysis in criminology and criminal justice. Through scaffolded labs and a semester-long team research project in RStudio for hands-on activities, students become critical consumers and producers of knowledge.",
    activity: {
      title: "Exploring Official Crime Data",
      text: "Students navigate UCR and NCVS data sources to locate and interpret crime statistics, then ask what official counts capture and what they miss.",
    },
  },
  {
    code: "CRJU303",
    title: "Criminal Procedure",
    status: "Previously taught",
    level: "Undergraduate",
    format: "In person",
    terms: "Spring 2025",
    description:
      "An examination of the constitutional principles governing investigation, prosecution, and adjudication. Interpreting landmark decisions from stop and frisk to digital surveillance, students ask whom procedural protections reach, whom they miss, and where technology outpaces the law.",
    activity: {
      title: "From Precedent to Present",
      text: "Student teams select a real criminal case, trace its connection to landmark precedent, and assess its impact on today's criminal legal system. Teams examine the case’s significance and legal implications, then lead a class debate anticipating where existing doctrine may fall short as technology evolves.",
    },
  },
  {
    code: "CRJU101",
    title: "The American Criminal Justice System",
    status: "Previously taught",
    level: "Undergraduate",
    format: "In person",
    terms: "Fall 2024, Spring 2024, Fall 2023",
    description:
      "How does the American criminal justice system work, and for whom? From how crime is measured to how policing, courts, and corrections respond, students use case-based and reflective learning to connect foundational concepts to questions of fairness.",
    activity: {
      title: "Reflection Papers",
      text: "Building on class discussions of mass incarceration, students respond to the documentary 13th with reflection papers grappling with how historical injustice continues to shape today’s justice system.",
    },
  },
];

export const teachingAssistantCourses = [
  {
    title: "Sociology of Crime",
    code: "CRJU341/SOCY353",
    detail: "Undergraduate · Online",
  },
  {
    title:
      "Introduction to African American Studies: Social and Historical Foundations",
    code: "AFAM201",
    detail: "Undergraduate · Hybrid",
  },
  {
    title: "Race, Crime, and Criminal Justice",
    code: "CRJU563/AFAM397",
    detail: "Undergraduate · Hybrid",
  },
  {
    title: "Analyzing Homicide",
    code: "CRJU420",
    detail: "Undergraduate · In person",
  },
  {
    title: "Communities and Crime",
    code: "CRJU430",
    detail: "Undergraduate · Online",
  },
  {
    title: "Gender Equality Group Counseling",
    code: "Kyonggi University, South Korea",
    detail: "Undergraduate · In person",
  },
];
