import { type Project } from '../types';

export const projects: Project[] = [
  // 2024 (CGS Team)
  {
    id: 'design-with-bubbles',
    name: 'Design with Bubbles',
    year: 2024,
    url: 'https://www.designwithbubbles.com/',
    icon: 'doc',
    description: '3D interior design platform',
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Stripe', 'AWS Cognito'],
    bullets: [
      'Developed CAPI (backend API) for a 3D design platform',
      'Implemented Stripe subscriptions with webhook-driven billing',
      'Integrated Elasticsearch with relevance tuning and filtering',
      'Built hierarchical project system with nested folders, node-based copying and cascading role inheritance',
      'Implemented authorization via AWS Cognito',
      'Optimized caching via Redis',
    ],
  },
  {
    id: 'autoplovykla',
    name: 'Autoplovykla',
    year: 2024,
    url: 'https://autoplovykla.lt/',
    icon: 'doc',
    description: 'Lithuanian car wash network application',
    stack: ['NestJS', 'TypeScript', 'PostgreSQL'],
    bullets: [
      'Booking system for a car wash network',
      'Management panel for owners',
      'Payment system integration',
    ],
  },
  {
    id: 'taskey',
    name: 'Taskey',
    year: 2024,
    url: 'https://www.taskey.io/',
    icon: 'doc',
    description: 'Mobile app for coaches, therapists and rehab specialists',
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'Firebase', 'Twilio'],
    bullets: [
      'Task and course system between practitioners and clients',
      'Push notifications via Firebase',
      'SMS notifications via Twilio',
    ],
  },
  // 2025 (42flows.tech)
  {
    id: 'cashback-platform',
    name: 'Cashback Platform',
    year: 2025,
    url: 'https://42flows.tech/cashback-platform/',
    icon: 'doc',
    description: 'Banking cashback platform',
    stack: ['NestJS', 'TypeScript', 'Kafka', 'RabbitMQ', 'Bull', 'PostgreSQL', 'Oracle', 'MsSQL', 'Keycloak', 'LDAP', 'Docker', 'AWS'],
    bullets: [
      'Led migration from monolithic to microservice architecture of the Cashback module',
      'Integrated Kafka, RabbitMQ, Bull for inter-service communication',
      'Implemented authentication via Keycloak + LDAP for multi-tenant banking clients',
      'Optimized SQL transactions across PostgreSQL, Oracle and MsSQL',
      'Configured CI/CD pipelines and deployment via Dokploy on AWS',
    ],
  },
];
