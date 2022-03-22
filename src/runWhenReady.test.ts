import {runWhenReady} from './runWhenReady';

describe('runWhenReady', () => {
  it('can execute a callback function when all services are ready', async () => {
    const callback = jest.fn();
    await runWhenReady([], callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
