import type { ImageMetadata } from 'astro';

export const siteConfig = {
  name: 'Oleksandr Tarasiuk',
  title: 'Backend Engineer',
  tagline: 'Full-Stack Engineer with Backend Focus',
  location: 'Kyiv, Ukraine · Open to relocate to Germany',
  bio: 'Backend engineer specializing in distributed systems, event-driven architectures, and FinTech infrastructure. I build reliable, scalable backend systems that handle real financial transactions.',
  siteUrl: 'https://PLACEHOLDER_SITE_URL',
};

export const contactConfig = {
  email: 'PLACEHOLDER_EMAIL',
  github: 'PLACEHOLDER_GITHUB_URL',
  linkedin: 'PLACEHOLDER_LINKEDIN_URL',
  telegram: 'PLACEHOLDER_TELEGRAM_URL',
  cvPath: '/PLACEHOLDER_CV_FILENAME.pdf',
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

export type Project = {
  name: string;
  description: string;
  role: string;
  tags: string[];
  link: string;
  image: string;
};

export const projectsConfig: Project[] = [
  {
    name: 'Cashback Platform',
    description: 'Microservice-based cashback platform for banks and fintechs. Processes 300+ card transactions per second, evaluating by MCC and terminal ID across multiple currencies.',
    role: 'Led backend architecture — microservices migration, message broker integration, multi-tenant auth, production DB work.',
    tags: ['NestJS', 'Kafka', 'RabbitMQ', 'Keycloak', 'PostgreSQL', 'Oracle', 'MsSQL', 'AWS'],
    link: 'https://42flows.tech/cashback-platform/',
    image: '/images/projects/cashback.png',
  },
  {
    name: 'Design with Bubbles',
    description: '3D interior design platform that converts floor plans into real-time 3D scenes. Available on iOS, Android, Windows, and Mac with collaborative project management.',
    role: 'Backend API — Stripe billing, AWS Cognito auth, Elasticsearch search, hierarchical project management with cascading permissions.',
    tags: ['NestJS', 'Stripe', 'Elasticsearch', 'AWS Cognito', 'Redis', 'PostgreSQL'],
    link: 'https://www.designwithbubbles.com/',
    image: '/images/projects/bubbles.png',
  },
  {
    name: 'Autoplovykla',
    description: 'Car wash booking platform for Lithuania. Users find nearby car washes, book appointments, and earn loyalty points. Partners get a management dashboard.',
    role: 'Booking and scheduling logic with timezone handling, Twilio SMS, Firebase push notifications, Redis caching.',
    tags: ['NestJS', 'TypeORM', 'PostgreSQL', 'Twilio', 'Firebase', 'Redis'],
    link: 'https://autoplovykla.lt/',
    image: '/images/projects/autoplovykla.png',
  },
  {
    name: 'Taskey',
    description: 'Mobile task management platform for coaches, therapists, and educators to assign personalized tasks and content to clients.',
    role: 'Core API with NestJS and PostgreSQL, Elasticsearch search, Redis caching optimization.',
    tags: ['NestJS', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Twilio', 'Firebase'],
    link: 'https://www.taskey.io/',
    image: '/images/projects/taskey.png',
  },
];

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillsConfig: SkillGroup[] = [
  { label: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'C'] },
  { label: 'Backend', skills: ['NestJS', 'ExpressJS', 'Node.js'] },
  { label: 'Databases', skills: ['PostgreSQL', 'Oracle', 'MsSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { label: 'Messaging', skills: ['Kafka', 'RabbitMQ', 'Bull'] },
  { label: 'Auth', skills: ['Keycloak', 'LDAP', 'AWS Cognito'] },
  { label: 'Infrastructure', skills: ['Docker', 'AWS', 'Dokploy', 'CI/CD', 'Kibana', 'Git'] },
  { label: 'API', skills: ['REST', 'GraphQL', 'tRPC', 'Swagger'] },
  { label: 'Frontend', skills: ['React', 'Next.js'] },
];

// Unused import kept intentionally for future typed image references in config
type _ImageMetadataRef = ImageMetadata;
