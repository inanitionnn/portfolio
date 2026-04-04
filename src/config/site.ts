import type { ImageMetadata } from 'astro';

export const siteConfig = {
  name: 'Oleksandr Tarasiuk',
  title: 'Backend Engineer',
  tagline: 'Backend Engineer',
  location: 'Kyiv, Ukraine · Available for relocation to Germany · EU Blue Card eligible (Summer 2026)',
  bio: 'Backend engineer with 2.5+ years building production Node.js/NestJS systems in fintech and automotive domains. Experienced in microservice architecture, event-driven pipelines (Kafka, RabbitMQ), and multi-database environments under real load.',
  siteUrl: 'https://tarasiuk.site/',
  ogImageVersion: 3,
};

export const contactConfig = {
  email: 'tarolv3@gmail.com',
  github: 'https://github.com/inanitionnn',
  linkedin: 'https://www.linkedin.com/in/oleksandr-tarasiuk-backend/',
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
    role: 'Full-stack Developer',
    period: 'Apr 2025 – Present',
    bullets: [
      'Led migration from monolithic to microservices architecture for a banking Cashback module, improving scalability and maintainability',
      'Integrated Kafka, RabbitMQ, and Bull message brokers for reliable inter-service communication, processing 300+ transactions per second',
      'Implemented authentication and authorization using Keycloak and LDAP, supporting multi-tenant banking clients',
      'Wrote complex SQL transactions and optimized queries across PostgreSQL, Oracle, and MsSQL databases in production',
      'Managed deployments via Dokploy on AWS, configured CI/CD pipelines, and monitored logs through Kibana',
    ],
    tags: ['NestJS', 'TypeScript', 'Kafka', 'RabbitMQ', 'PostgreSQL', 'Oracle', 'MsSQL', 'Redis', 'Keycloak', 'AWS', 'Docker'],
  },
  {
    company: 'CGS Team',
    companyUrl: 'https://cgsteam.io',
    role: 'Full-stack Developer',
    period: 'Oct 2023 – Feb 2025',
    bullets: [
      'Implemented advanced Elasticsearch search with relevance tuning and filtering, improving result accuracy by ~20%',
      'Built a full-featured Stripe subscription system with webhook-driven billing and notifications',
      'Extended a tree-based project management system with nested folders, node copying, and cascading RBAC for an interior design platform',
      'Implemented user authentication and access control using AWS Cognito',
      'Optimized Redis caching strategy, reducing database load by ~40% and improving response times',
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
    tags: ['NestJS', 'Stripe', 'Elasticsearch', 'AWS Cognito', 'Redis', 'PostgreSQL', 'React'],
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
    tags: ['NestJS', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Next.js'],
    link: 'https://www.taskey.io/',
    image: '/images/projects/taskey.png',
  },
];

export type SkillTier = {
  tier: 'Core' | 'Proficient' | 'Familiar';
  description: string;
  skills: string[];
};

export const skillsConfig: SkillTier[] = [
  {
    tier: 'Core',
    description: 'Use daily in production',
    skills: [
      'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'ExpressJS',
      'PostgreSQL', 'Redis',
      'Kafka', 'RabbitMQ',
      'Docker', 'Git', 'Swagger',
    ],
  },
  {
    tier: 'Proficient',
    description: 'Solid production experience',
    skills: [
      'TypeORM', 'Prisma', 'DrizzleORM',
      'REST', 'GraphQL', 'tRPC',
      'AWS', 'Oracle', 'MsSQL',
      'Elasticsearch', 'Keycloak', 'LDAP', 'AWS Cognito',
      'Dokploy', 'Kibana', 'CI/CD', 'Jira',
      'React', 'Next.js',
      'Stripe', 'Bull',
    ],
  },
  {
    tier: 'Familiar',
    description: 'Used on projects or in exploration',
    skills: [
      'Java', 'Python', 'Go',
      'MongoDB',
    ],
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
    level: 'C2',
    note: '',
  },
  {
    language: 'English',
    level: 'B2',
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
