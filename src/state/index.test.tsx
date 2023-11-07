import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import AppStateProvider, { useAppState } from './index';

window.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => 'mockVideoToken',
    json: () => ({
      token: 'mockVideoToken',
    }),
  })
) as jest.Mock;

const wrapper: React.FC = ({ children }) => <AppStateProvider>{children}</AppStateProvider>;

describe('the useAppState hook', () => {
  beforeEach(jest.clearAllMocks);
  beforeEach(() => (process.env = {} as any));

  it('should set an error', () => {
    const { result } = renderHook(useAppState, { wrapper });
    act(() => result.current.setError(new Error('testError')));
    expect(result?.current?.error!.message).toBe('testError');
  });

  it('should throw an error if used outside of AppStateProvider', () => {
    const { result } = renderHook(useAppState);
    expect(result.current).toEqual('useAppState must be used within the AppStateProvider');
  });

});
