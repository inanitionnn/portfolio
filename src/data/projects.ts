export interface Project {
  title: string;
  company: string;
  description: string;
  stack: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    title: 'Banking Cashback Platform',
    company: '42flows.tech',
    description:
      'Microservices-based cashback platform for Ukrainian banks. Handles transaction processing, currency conversion, and multi-tenant authorization for banking clients including Oschadbank and Radabank.',
    stack: [
      'NestJS',
      'Kafka',
      'RabbitMQ',
      'PostgreSQL',
      'Oracle',
      'Redis',
      'Keycloak',
      'Docker',
    ],
    link: 'https://42flows.tech/cashback-platform/',
  },
  {
    title: 'Design with Bubbles',
    company: 'CGS Team / Boom Interactive',
    description:
      'First communication platform in 3D — converts 2D plans into 3D scenes with collaboration features. Built the entire backend API including subscription billing, auth, search, and hierarchical project management.',
    stack: [
      'NestJS',
      'PostgreSQL',
      'Redis',
      'Elasticsearch',
      'Stripe',
      'AWS Cognito',
    ],
    link: 'https://www.designwithbubbles.com/',
  },
  {
    title: 'Autoplovykla',
    company: 'CGS Team',
    description:
      'Lithuanian car wash network booking application with management interface for business owners.',
    stack: ['NestJS', 'TypeORM', 'PostgreSQL'],
    link: 'https://autoplovykla.lt/',
  },
  {
    title: 'Taskey',
    company: 'CGS Team',
    description:
      'Mobile app for coaches, therapists, and rehabilitation specialists. Task and course management system between practitioners and clients.',
    stack: ['NestJS', 'PostgreSQL', 'Twilio', 'Firebase'],
    link: 'https://www.taskey.io/',
  },
];
