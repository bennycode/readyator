import readyator from './';

describe('API', () => {
  it('has a default export', async () => {
    const callback = jest.fn();
    await readyator([], callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
