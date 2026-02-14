import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Table.stories';

const { Default, WithSelectedRows, Minimal } = composeStories(stories);

describe('Table', () => {
  describe('Default Story', () => {
    it('should render table with caption', () => {
      render(<Default />);
      expect(
        screen.getByText('A list of your recent invoices.')
      ).toBeInTheDocument();
    });

    it('should render table header with correct columns', () => {
      render(<Default />);
      expect(screen.getByText('Invoice')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Method')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
    });

    it('should render 5 invoice rows in body', () => {
      render(<Default />);
      expect(screen.getByText('INV001')).toBeInTheDocument();
      expect(screen.getByText('INV002')).toBeInTheDocument();
      expect(screen.getByText('INV003')).toBeInTheDocument();
      expect(screen.getByText('INV004')).toBeInTheDocument();
      expect(screen.getByText('INV005')).toBeInTheDocument();
    });

    it('should render footer with total', () => {
      render(<Default />);
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('$1,750.00')).toBeInTheDocument();
    });

    it('should render correct payment methods', () => {
      render(<Default />);
      expect(screen.getAllByText('Credit Card')).toHaveLength(2);
      expect(screen.getAllByText('PayPal')).toHaveLength(2);
      expect(screen.getByText('Bank Transfer')).toBeInTheDocument();
    });
  });

  describe('WithSelectedRows Story', () => {
    it('should render table with selected rows', () => {
      const { container } = render(<WithSelectedRows />);
      const selectedRows = container.querySelectorAll('[data-state="selected"]');
      expect(selectedRows).toHaveLength(2);
    });

    it('should have correct invoices selected', () => {
      const { container } = render(<WithSelectedRows />);
      const selectedRows = container.querySelectorAll('[data-state="selected"]');
      expect(selectedRows[0]).toHaveTextContent('INV001');
      expect(selectedRows[1]).toHaveTextContent('INV003');
    });
  });

  describe('Minimal Story', () => {
    it('should render table without caption', () => {
      const { container } = render(<Minimal />);
      const caption = container.querySelector('caption');
      expect(caption).not.toBeInTheDocument();
    });

    it('should render table without footer', () => {
      const { container } = render(<Minimal />);
      const footer = container.querySelector('tfoot');
      expect(footer).not.toBeInTheDocument();
    });

    it('should render correct header columns', () => {
      render(<Minimal />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('should render user data rows', () => {
      render(<Minimal />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('should render thead element', () => {
      const { container } = render(<Default />);
      const thead = container.querySelector('thead');
      expect(thead).toBeInTheDocument();
    });

    it('should render tbody element', () => {
      const { container } = render(<Default />);
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
    });

    it('should render tfoot element when footer is present', () => {
      const { container } = render(<Default />);
      const tfoot = container.querySelector('tfoot');
      expect(tfoot).toBeInTheDocument();
    });

    it('should render th elements in header', () => {
      const { container } = render(<Default />);
      const thElements = container.querySelectorAll('th');
      expect(thElements).toHaveLength(4);
    });

    it('should render td elements in body rows', () => {
      const { container } = render(<Default />);
      const tdElements = container.querySelectorAll('tbody td');
      expect(tdElements.length).toBeGreaterThan(0);
    });
  });
});
