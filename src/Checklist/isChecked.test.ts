import { isChecked } from './isChecked';

/**
 * Forming a naming convention for test names is good practice
 * Here, we have used the following naming structure:
 * should {expected output / behaviour} when {input / state condition}
 */
test('should return true when in checkedIds', () => {
  const result = isChecked([1, 2, 3], 2);
  //Since the result is a primitive value (a Boolean), we use the toBe matcher to verify the result.
  expect(result).toBe(true);
});

test('should return false when not in checkedIds', () => {
  const result = isChecked([1, 2, 3], 4);
  expect(result).toBe(false);
});
