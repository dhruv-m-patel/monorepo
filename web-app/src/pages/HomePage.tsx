import './HomePage.css';

export default function HomePage() {
  return (
    <div className="page">
      <main className="main">
        <h1 className="title-h1">Welcome to Lerna Monorepo</h1>
        <br />
        <br />
        <p className="description">
          Featured with rich support of modern tools to build your Node React
          projects
        </p>

        <div className="grid">
          <a
            className="card"
            href="https://turbo.build/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>Monorepo Benefits</h2>
            <p>
              Manage your frontend, backend and packages in one place with
              Turborepo
            </p>
          </a>

          <a
            className="card"
            href="https://expressjs.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>Express</h2>
            <p>Write microservices with node and express</p>
          </a>

          <a
            className="card"
            href="https://react.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>React</h2>
            <p>Write frontend applications using React 19 with Vite</p>
          </a>

          <a
            className="card"
            href="https://reactrouter.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>React Router</h2>
            <p>
              Multi-page applications support with client-side routing using
              react-router-dom v7
            </p>
          </a>

          <a
            className="card"
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>Vite</h2>
            <p>Lightning-fast development with HMR and optimized builds</p>
          </a>

          <a
            className="card"
            href="https://vitest.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>Vitest</h2>
            <p>Fast unit testing powered by Vite</p>
          </a>

          <a
            className="card"
            href="https://react.dev/learn/scaling-up-with-reducer-and-context"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>React Context</h2>
            <p>Manage your application state with React Context and hooks</p>
          </a>

          <a
            className="card"
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>TypeScript</h2>
            <p>Type-safe development with TypeScript 5.7+</p>
          </a>

          <a
            className="card"
            href="https://storybook.js.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>Storybook</h2>
            <p>Visualize your react components using Storybook</p>
          </a>

          <a
            className="card"
            href="https://eslint.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <h2>ESLint v9</h2>
            <p>Modern linting with flat config and TypeScript support</p>
          </a>
        </div>
      </main>
    </div>
  );
}
