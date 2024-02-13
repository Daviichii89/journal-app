import {
  authSlice,
  checkingCredentials,
  login,
  logout
} from '../../../src/store/slices/auth';
import {
  authenticatedState,
  demoUser,
  initialState
} from '../../fixtures/authFixtures';

/* eslint-disable no-undef */
describe('Testing authSlice', () => {
  it('should return initial state', () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });
  it('should login', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    });
  });
  it('should logout', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });
  it('should logout and show an error message', () => {
    const errorMessage = 'Credential is invalid';

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage
    });
  });
  it('should change status to checking', () => {
    const state = authSlice.reducer(initialState, checkingCredentials());

    expect(state).toEqual({
      status: 'checking',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null
    });
  });
});
