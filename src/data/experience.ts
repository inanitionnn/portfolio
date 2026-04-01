export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    company: '42flows.tech',
    role: 'Backend Developer',
    period: 'Apr 2025 — Present',
    description:
      'Banking cashback platform serving major Ukrainian banks. Led architectural decisions for a system processing real financial transactions.',
    highlights: [
      'Led migration from monolithic to microservices architecture for the Cashback module',
      'Integrated Kafka, RabbitMQ, and Bull for reliable inter-service communication',
      'Implemented multi-tenant auth with Keycloak and LDAP for banking clients',
      'Refactored transaction processors from inheritance to Strategy Pattern',
      'Managed production databases across PostgreSQL, Oracle, and MsSQL',
    ],
    stack: [
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Oracle',
      'MsSQL',
      'Kafka',
      'RabbitMQ',
      'Redis',
      'Keycloak',
      'Docker',
      'AWS',
    ],
  },
  {
    company: 'CGS Team',
    role: 'Backend Developer',
    period: 'Oct 2023 — Feb 2025',
    description:
      'Outsource/outstaff company. Worked on multiple projects across different domains — 3D design platforms, booking systems, and healthtech.',
    highlights: [
      'Built Stripe subscription system with webhook-driven billing for a 3D design platform',
      'Reduced database load by ~40% through Redis caching and query optimization',
      'Improved search accuracy by ~20% with Elasticsearch relevance tuning',
      'Developed hierarchical project management system with cascading role inheritance',
      'Integrated Twilio SMS and Firebase push notifications for a healthtech app',
    ],
    stack: [
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Elasticsearch',
      'Stripe',
      'AWS Cognito',
      'Firebase',
      'Docker',
    ],
  },
  {
    company: 'Freelance',
    role: 'Backend Developer',
    period: 'Nov 2022 — Aug 2023',
    description:
      'Maintained and extended backend infrastructure for a car wash booking platform.',
    highlights: [
      'Proposed and implemented an automated booking system',
      'Integrated SMS and push notification services',
    ],
    stack: ['NestJS', 'TypeORM', 'PostgreSQL', 'Twilio', 'Firebase'],
  },
];
