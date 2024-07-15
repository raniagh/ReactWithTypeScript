//The function simulates a user being authorized to have admin permissions
export function authorize(id: string): Promise<string[]> {
  return new Promise((resolve) => setTimeout(() => resolve(['admin']), 1000));
}
