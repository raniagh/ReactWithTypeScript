import { render, screen } from '@testing-library/react';
import { Checklist } from './Checklist';
import userEvent from '@testing-library/user-event';
import { IdValue } from './types';

test('should render correct list items when data specified', () => {
  render(
    <Checklist
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
  expect(screen.getByText('Lucy')).toBeInTheDocument();
  expect(screen.getByText('Manager')).toBeInTheDocument();
});

test('should render correct list items when renderItem specified', () => {
  render(
    <Checklist
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
      renderItem={(item) => (
        <li key={item.id}>
          {item.name}-{item.role}
        </li>
      )}
    />,
  );
  expect(screen.getByText('Lucy-Manager')).toBeInTheDocument();
});

//We have marked the test as asynchronous because the simulated user interactions in user-event are asynchronous
test('should check items when clicked', async () => {
  //Initialize the user simulation
  const user = userEvent.setup();

  render(
    <Checklist
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
  const lucyCheckbox = screen.getByTestId('Checklist__input__1');
  expect(lucyCheckbox).not.toBeChecked();
  await user.click(lucyCheckbox);
  expect(lucyCheckbox).toBeChecked();
});
