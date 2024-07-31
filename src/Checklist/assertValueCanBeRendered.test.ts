import { assertValueCanBeRendered } from './assertValueCanBeRendered';

//We pass the true Boolean value, which should cause an error.
test('should raise exception when not a string or number', () => {
  expect(() => {
    assertValueCanBeRendered(true);
  }).toThrow('value is not a string or a number');
});

//We use the not matcher with toThrow to check that an exception is not raised
test('should not raise exception when string', () => {
  expect(() => {
    assertValueCanBeRendered('something');
  }).not.toThrow();
});

test('should not raise exception when number', () => {
  expect(() => {
    assertValueCanBeRendered(99);
  }).not.toThrow();
});
