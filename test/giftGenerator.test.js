
test('selects valid gift from tech category', () => {
  const gift = selectRandomGift('tech', 'medium');
  expect(['Wireless Mouse', 'Bluetooth Speaker', 'Portable Charger', 'LED Desk Light'])
    .toContain(gift);
});

test('returns error for invalid category', () => {
  const result = validateCategory('invalid');
  expect(result.error).toBe('Category not found');
});
