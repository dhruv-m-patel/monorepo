import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@dhruv-m-patel/react-components';

describe('Card', () => {
  it('should render Card with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should merge custom className on Card', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content');
    expect(card.className).toContain('custom-card');
    expect(card.className).toContain('rounded-lg');
  });

  it('should forward ref on Card', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('should render header with children', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('should have flex column layout class', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header').className).toContain('flex');
    expect(screen.getByText('Header').className).toContain('flex-col');
  });
});

describe('CardTitle', () => {
  it('should render as h3 heading', () => {
    render(<CardTitle>Title</CardTitle>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Title');
  });

  it('should merge custom className', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.className).toContain('custom-title');
  });
});

describe('CardDescription', () => {
  it('should render description text', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('should have muted foreground class', () => {
    render(<CardDescription>Desc</CardDescription>);
    expect(screen.getByText('Desc').className).toContain(
      'text-muted-foreground'
    );
  });
});

describe('CardContent', () => {
  it('should render content', () => {
    render(<CardContent>Body content</CardContent>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('should have padding classes', () => {
    render(<CardContent>Body</CardContent>);
    expect(screen.getByText('Body').className).toContain('p-6');
  });
});

describe('CardFooter', () => {
  it('should render footer content', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('should have flex items-center layout', () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText('Footer');
    expect(footer.className).toContain('flex');
    expect(footer.className).toContain('items-center');
  });
});

describe('Card composition', () => {
  it('should render a full card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>A test card</CardDescription>
        </CardHeader>
        <CardContent>Card body</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Test Card'
    );
    expect(screen.getByText('A test card')).toBeInTheDocument();
    expect(screen.getByText('Card body')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });
});
