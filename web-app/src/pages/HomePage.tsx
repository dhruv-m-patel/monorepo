import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  FlexGrid,
} from '@dhruv-m-patel/react-components';
import { ExternalLink } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  href: string;
}

const features: FeatureCard[] = [
  {
    title: 'Monorepo Benefits',
    description:
      'Manage your frontend, backend and packages in one place with Turborepo',
    href: 'https://turbo.build/',
  },
  {
    title: 'Express',
    description: 'Write microservices with node and express',
    href: 'https://expressjs.com/',
  },
  {
    title: 'React',
    description: 'Write frontend applications using React 19 with Vite',
    href: 'https://react.dev/',
  },
  {
    title: 'Server Side Rendering',
    description:
      'Write server-rendered React applications with Vite and Express',
    href: 'https://vite.dev/guide/ssr',
  },
  {
    title: 'React Router',
    description:
      'Multi-page applications support with client-side routing using react-router-dom v7',
    href: 'https://reactrouter.com/',
  },
  {
    title: 'Vite',
    description: 'Lightning-fast development with HMR and optimized builds',
    href: 'https://vitejs.dev/',
  },
  {
    title: 'Vitest',
    description: 'Fast unit testing powered by Vite',
    href: 'https://vitest.dev/',
  },
  {
    title: 'React Context',
    description: 'Manage your application state with React Context and hooks',
    href: 'https://react.dev/learn/scaling-up-with-reducer-and-context',
  },
  {
    title: 'TypeScript',
    description: 'Type-safe development with TypeScript 5.7+',
    href: 'https://www.typescriptlang.org/',
  },
  {
    title: 'Tailwind CSS',
    description:
      'Utility-first CSS framework with dark mode and responsive design',
    href: 'https://tailwindcss.com/',
  },
  {
    title: 'ESLint v9',
    description: 'Modern linting with flat config and TypeScript support',
    href: 'https://eslint.org/',
  },
];

export default function HomePage() {
  return (
    <div className="py-16">
      <FlexGrid gap="4" justifyContent="center">
        <FlexGrid.Column xs={12}>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Welcome to Monorepo
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Featured with rich support of modern tools to build your Node
              React projects
            </p>
          </div>
        </FlexGrid.Column>
      </FlexGrid>

      <div className="mt-12 max-w-5xl mx-auto">
        <FlexGrid gap="4">
          {features.map((feature) => (
            <FlexGrid.Column key={feature.title} xs={12} sm={6} lg={4}>
              <a
                href={feature.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group block h-full"
              >
                <Card className="h-full transition-colors hover:border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      {feature.title}
                      <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </FlexGrid.Column>
          ))}
        </FlexGrid>
      </div>
    </div>
  );
}
