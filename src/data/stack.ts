export interface StackCategory {
  title: string;
  items: string[];
}

export const stack: StackCategory[] = [
  {
    title: 'Languages & Runtime',
    items: ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go'],
  },
  {
    title: 'Frameworks',
    items: ['NestJS', 'Express.js', 'React', 'Next.js'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'Oracle', 'MsSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    title: 'Message Brokers',
    items: ['Kafka', 'RabbitMQ', 'Bull'],
  },
  {
    title: 'Auth & Security',
    items: ['Keycloak', 'LDAP', 'AWS Cognito'],
  },
  {
    title: 'DevOps & Tools',
    items: ['Docker', 'AWS', 'CI/CD', 'Kibana', 'Git', 'Jira'],
  },
];
