// @vitest-environment node
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

// Import all components from the library barrel
import {
  // Theme
  ThemeProvider,
  // Foundation
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  // Display
  Separator,
  Skeleton,
  Spinner,
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
  // Feedback
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Toast,
  ToastTitle,
  ToastDescription,
  // Layout
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FlexGrid,
  // Navigation
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  // Data display
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../../src/index';

describe('SSR: renderToString', () => {
  describe('ThemeProvider', () => {
    it('renders with default theme on server', () => {
      const html = renderToString(
        <ThemeProvider defaultTheme="light">
          <div>App content</div>
        </ThemeProvider>
      );
      expect(html).toContain('App content');
      expect(html).not.toContain('undefined');
    });

    it('does not throw without window/document', () => {
      expect(() => {
        renderToString(
          <ThemeProvider>
            <span>test</span>
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('Foundation components', () => {
    it('renders Button', () => {
      const html = renderToString(<Button>Click me</Button>);
      expect(html).toContain('Click me');
      expect(html).toContain('button');
    });

    it('renders Button variants', () => {
      const html = renderToString(
        <Button variant="destructive">Delete</Button>
      );
      expect(html).toContain('Delete');
    });

    it('renders Badge', () => {
      const html = renderToString(<Badge>New</Badge>);
      expect(html).toContain('New');
    });

    it('renders Input', () => {
      const html = renderToString(<Input placeholder="Enter text" />);
      expect(html).toContain('Enter text');
    });

    it('renders Label', () => {
      const html = renderToString(<Label>Email</Label>);
      expect(html).toContain('Email');
    });

    it('renders Textarea', () => {
      const html = renderToString(<Textarea placeholder="Write here" />);
      expect(html).toContain('Write here');
    });
  });

  describe('Display components', () => {
    it('renders Separator', () => {
      const html = renderToString(<Separator />);
      expect(html).toBeTruthy();
    });

    it('renders Skeleton', () => {
      const html = renderToString(<Skeleton className="h-4 w-full" />);
      expect(html).toContain('animate-pulse');
    });

    it('renders Spinner', () => {
      const html = renderToString(<Spinner />);
      expect(html).toContain('Loading');
    });

    it('renders Typography components', () => {
      expect(renderToString(<H1>Heading 1</H1>)).toContain('Heading 1');
      expect(renderToString(<H2>Heading 2</H2>)).toContain('Heading 2');
      expect(renderToString(<H3>Heading 3</H3>)).toContain('Heading 3');
      expect(renderToString(<H4>Heading 4</H4>)).toContain('Heading 4');
      expect(renderToString(<P>Paragraph</P>)).toContain('Paragraph');
      expect(renderToString(<Lead>Lead text</Lead>)).toContain('Lead text');
      expect(renderToString(<Large>Large text</Large>)).toContain('Large text');
      expect(renderToString(<Small>Small text</Small>)).toContain('Small text');
      expect(renderToString(<Muted>Muted text</Muted>)).toContain('Muted text');
      expect(renderToString(<InlineCode>code</InlineCode>)).toContain('code');
      expect(renderToString(<Blockquote>Quote</Blockquote>)).toContain('Quote');
    });
  });

  describe('Feedback components', () => {
    it('renders Alert', () => {
      const html = renderToString(
        <Alert>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Something happened</AlertDescription>
        </Alert>
      );
      expect(html).toContain('Warning');
      expect(html).toContain('Something happened');
    });

    it('renders Progress', () => {
      const html = renderToString(<Progress value={50} />);
      expect(html).toBeTruthy();
    });

    it('renders Toast (static)', () => {
      const html = renderToString(
        <Toast>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Done</ToastDescription>
        </Toast>
      );
      expect(html).toContain('Success');
      expect(html).toContain('Done');
    });
  });

  describe('Layout components', () => {
    it('renders Card with sub-components', () => {
      const html = renderToString(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Body</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      expect(html).toContain('Title');
      expect(html).toContain('Description');
      expect(html).toContain('Body');
      expect(html).toContain('Footer');
    });

    it('renders FlexGrid', () => {
      const html = renderToString(
        <FlexGrid>
          <FlexGrid.Column xs={12} md={6}>
            Column 1
          </FlexGrid.Column>
          <FlexGrid.Column xs={12} md={6}>
            Column 2
          </FlexGrid.Column>
        </FlexGrid>
      );
      expect(html).toContain('Column 1');
      expect(html).toContain('Column 2');
    });
  });

  describe('Navigation components', () => {
    it('renders Breadcrumb', () => {
      const html = renderToString(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(html).toContain('Home');
      expect(html).toContain('Current');
    });
  });

  describe('Data display components', () => {
    it('renders Table', () => {
      const html = renderToString(
        <Table>
          <TableCaption>A list of items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Item 1</TableCell>
              <TableCell>100</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(html).toContain('A list of items');
      expect(html).toContain('Name');
      expect(html).toContain('Item 1');
    });
  });

  describe('No browser API errors', () => {
    it('does not reference window at module scope', () => {
      // If we got here without errors, module-level imports are safe
      expect(true).toBe(true);
    });

    it('renders ThemeProvider without localStorage errors', () => {
      expect(() => {
        renderToString(
          <ThemeProvider defaultTheme="light">
            <div>Safe</div>
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });
});
