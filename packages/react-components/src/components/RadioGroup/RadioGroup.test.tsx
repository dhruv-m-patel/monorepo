import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './RadioGroup.stories';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from '../Label/Label';

const composed = composeStories(stories);

describe('RadioGroup', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const optionOne = screen.getByRole('radio', { name: /option one/i });
    const optionTwo = screen.getByRole('radio', { name: /option two/i });
    const optionThree = screen.getByRole('radio', { name: /option three/i });

    expect(optionOne).toBeInTheDocument();
    expect(optionTwo).toBeInTheDocument();
    expect(optionThree).toBeInTheDocument();
    expect(optionOne).toBeChecked();
    expect(optionTwo).not.toBeChecked();
    expect(optionThree).not.toBeChecked();
  });

  it('renders with disabled story', () => {
    render(<composed.WithDisabled />);
    const defaultOption = screen.getByRole('radio', { name: /default/i });
    const disabledOption = screen.getByRole('radio', { name: /disabled/i });
    const comfortableOption = screen.getByRole('radio', { name: /comfortable/i });

    expect(defaultOption).toBeInTheDocument();
    expect(disabledOption).toBeInTheDocument();
    expect(comfortableOption).toBeInTheDocument();
    expect(disabledOption).toBeDisabled();
    expect(defaultOption).not.toBeDisabled();
    expect(comfortableOption).not.toBeDisabled();
  });

  it('renders with description story', () => {
    render(<composed.WithDescription />);
    const card = screen.getByRole('radio', { name: /credit card/i });
    const paypal = screen.getByRole('radio', { name: /paypal/i });
    const apple = screen.getByRole('radio', { name: /apple pay/i });

    expect(card).toBeInTheDocument();
    expect(paypal).toBeInTheDocument();
    expect(apple).toBeInTheDocument();
    expect(card).toBeChecked();
    expect(
      screen.getByText(/pay with your credit or debit card/i)
    ).toBeInTheDocument();
  });

  it('renders all disabled story', () => {
    render(<composed.AllDisabled />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('allows selecting different options', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="opt1" />
          <Label htmlFor="opt1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="opt2" />
          <Label htmlFor="opt2">Option 2</Label>
        </div>
      </RadioGroup>
    );

    const option1 = screen.getByRole('radio', { name: /option 1/i });
    const option2 = screen.getByRole('radio', { name: /option 2/i });

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });
});
