import type { ImageMetadata } from 'astro';

export const siteConfig = {
  name: 'Oleksandr Tarasiuk',
  title: 'Software Engineer',
  tagline: 'Software Engineer',
  location: 'Kyiv, Ukraine · Open to relocate to Germany',
  bio: 'Backend engineer specializing in distributed systems, event-driven architectures, and FinTech infrastructure. I build reliable, scalable backend systems that handle real financial transactions.',
  siteUrl: 'https://tarasiuk.site/',
};

export const contactConfig = {
  email: 'tarolv3@gmail.com',
  phone: '+380681911583',
  github: 'https://github.com/inanitionnn',
  linkedin: 'https://www.linkedin.com/in/oleksandr-tarasiuk-full-stack/',
  telegram: 'https://t.me/inanitionnn',
  cvPath: '/CV_Nodejs_Tarasiuk.pdf',
};

export type ExperienceEntry = {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experienceConfig: ExperienceEntry[] = [
  {
    company: '42flows.tech',
    companyUrl: 'https://42flows.tech',
    role: 'Backend Developer',
    period: 'Apr 2025 – Present',
    bullets: [
      'Led migration from monolithic to microservices architecture for a banking Cashback module',
      'Integrated Kafka, RabbitMQ, and Bull message brokers for reliable inter-service communication and transaction processing',
      'Implemented authentication and authorization using Keycloak and LDAP for multi-tenant banking clients',
      'Wrote complex SQL transactions and optimized queries across PostgreSQL, Oracle, and MsSQL in production',
      'Managed deployments via Dokploy on AWS, configured CI/CD pipelines, monitored logs through Kibana',
    ],
    tags: ['NestJS', 'TypeScript', 'Kafka', 'RabbitMQ', 'PostgreSQL', 'Oracle', 'MsSQL', 'Redis', 'Keycloak', 'AWS', 'Docker'],
  },
  {
    company: 'CGS Team',
    companyUrl: 'https://cgsteam.io',
    role: 'Backend Developer',
    period: 'Oct 2023 – Feb 2025',
    bullets: [
      'Implemented Elasticsearch search with relevance tuning, improving result accuracy ~20%',
      'Built a full-featured Stripe subscription system with webhook-driven billing and notifications',
      'Extended a hierarchical project management system with nested folders and cascading role inheritance',
      'Implemented AWS Cognito authentication and access control',
      'Integrated Twilio for SMS and Firebase for real-time push notifications',
      'Optimized Redis caching, reducing database load ~40%',
    ],
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Stripe', 'AWS Cognito', 'Twilio', 'Firebase', 'Docker'],
  },
];

export type EducationEntry = {
  institution: string;
  institutionUrl: string;
  degree: string;
  field: string;
  period: string;
  ects: number;
  status: string;
  note: string;
  courses: string[];
};

export const educationConfig: EducationEntry[] = [
  {
    institution: 'Taras Shevchenko National University of Kyiv',
    institutionUrl: 'https://knu.ua',
    degree: 'Bachelor (incomplete)',
    field: 'Computer Science — System Analysis',
    period: 'Sep 2021 – Dec 2023',
    ects: 120,
    status: 'Did not graduate',
    note: 'Completed 120 ECTS. Studies were interrupted due to the full-scale Russian invasion of Ukraine in February 2022, which significantly disrupted academic continuity. Did not complete the remaining requirements for the degree.',
    courses: [
      'Object-Oriented Programming',
      'Discrete Mathematics',
      'Mathematical Analysis',
      'Algebra and Geometry',
      'Database Design',
      'Computer Networks',
      'Theory of Computation',
      'Differential Equations',
      'Probabilistic Foundations in IT',
      'Computer Systems Architecture',
    ],
  },
];

export type TestimonialEntry = {
  quote: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
};

export const testimonialsConfig: TestimonialEntry[] = [
  {
    quote: 'PLACEHOLDER_QUOTE_1',
    name: 'PLACEHOLDER_NAME_1',
    role: 'PLACEHOLDER_ROLE_1',
    company: 'PLACEHOLDER_COMPANY_1',
    linkedinUrl: 'PLACEHOLDER_LINKEDIN_1',
  },
  {
    quote: 'PLACEHOLDER_QUOTE_2',
    name: 'PLACEHOLDER_NAME_2',
    role: 'PLACEHOLDER_ROLE_2',
    company: 'PLACEHOLDER_COMPANY_2',
    linkedinUrl: 'PLACEHOLDER_LINKEDIN_2',
  },
];

export type Project = {
  name: string;
  description: string;
  role: string;
  duration: string;
  company: string;
  tags: string[];
  link: string;
  image: string;
};

export const projectsConfig: Project[] = [
  {
    name: 'Cashback Platform',
    description: 'Microservice-based cashback platform for banks and fintechs. Processes 300+ card transactions per second, evaluating by MCC and terminal ID across multiple currencies.',
    role: 'Led backend architecture — microservices migration, message broker integration, multi-tenant auth, production DB work.',
    duration: '~1 year',
    company: '42flows.tech',
    tags: ['NestJS', 'Kafka', 'RabbitMQ', 'Keycloak', 'PostgreSQL', 'Oracle', 'MsSQL', 'AWS'],
    link: 'https://42flows.tech/cashback-platform/',
    image: '/images/projects/cashback.png',
  },
  {
    name: 'Design with Bubbles',
    description: '3D interior design platform that converts floor plans into real-time 3D scenes. Available on iOS, Android, Windows, and Mac with collaborative project management.',
    role: 'Backend API — Stripe billing, AWS Cognito auth, Elasticsearch search, hierarchical project management with cascading permissions.',
    duration: '~1 year',
    company: 'CGS Team',
    tags: ['NestJS', 'Stripe', 'Elasticsearch', 'AWS Cognito', 'Redis', 'PostgreSQL'],
    link: 'https://www.designwithbubbles.com/',
    image: '/images/projects/bubbles.png',
  },
  {
    name: 'Autoplovykla',
    description: 'Car wash booking platform for Lithuania. Users find nearby car washes, book appointments, and earn loyalty points. Partners get a management dashboard.',
    role: 'Booking and scheduling logic with timezone handling, Twilio SMS, Firebase push notifications, Redis caching.',
    duration: '~1 year',
    company: 'CGS Team',
    tags: ['NestJS', 'TypeORM', 'PostgreSQL', 'Twilio', 'Firebase', 'Redis'],
    link: 'https://autoplovykla.lt/',
    image: '/images/projects/autoplovykla.png',
  },
  {
    name: 'Taskey',
    description: 'Mobile task management platform for coaches, therapists, and educators to assign personalized tasks and content to clients.',
    role: 'Core API with NestJS and PostgreSQL, Elasticsearch search, Redis caching optimization.',
    duration: '~3 months',
    company: 'CGS Team',
    tags: ['NestJS', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Twilio', 'Firebase'],
    link: 'https://www.taskey.io/',
    image: '/images/projects/taskey.png',
  },
];

export type SkillTier = {
  tier: 'Core' | 'Proficient' | 'Familiar' | 'Learning';
  description: string;
  skills: string[];
};

export const skillsConfig: SkillTier[] = [
  {
    tier: 'Core',
    description: 'Use daily in production',
    skills: [
      'TypeScript', 'Node.js', 'NestJS', 'ExpressJS',
      'PostgreSQL', 'Redis',
      'Kafka', 'RabbitMQ',
      'Docker', 'Swagger',
    ],
  },
  {
    tier: 'Proficient',
    description: 'Solid production experience',
    skills: [
      'AWS', 'Oracle', 'MsSQL',
      'Elasticsearch', 'Keycloak', 'LDAP',
      'Dokploy', 'Kibana', 'CI/CD',
      'React', 'Next.js',
      'Stripe', 'Twilio', 'Firebase',
    ],
  },
  {
    tier: 'Familiar',
    description: 'Used on projects or in exploration',
    skills: [
      'Python', 'Embedded C', 'C++',
      'Go',
      'GraphQL', 'tRPC', 'Bull',
      'MongoDB',
    ],
  },
  {
    tier: 'Learning',
    description: 'Actively studying',
    skills: ['Java', 'Spring'],
  },
];

export type LanguageEntry = {
  language: string;
  level: string;
  note: string;
};

export const languagesConfig: LanguageEntry[] = [
  {
    language: 'Ukrainian',
    level: 'Native',
    note: '',
  },
  {
    language: 'English',
    level: 'B2 Upper-Intermediate',
    note: 'TOEFL iBT in progress',
  },
  {
    language: 'German',
    level: 'A1',
    note: 'Actively learning',
  },
  {
    language: 'Spanish',
    level: 'A1',
    note: 'Studied previously, currently on pause',
  },
];

export const hobbiesConfig: string[] = [
  'Guitar',
  'Climbing',
  'Cooking',
];

// Unused import kept intentionally for future typed image references in config
type _ImageMetadataRef = ImageMetadata;
