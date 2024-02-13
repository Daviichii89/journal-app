/* eslint-disable no-undef */
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from '../../../src/firebase/providers';
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from '../../../src/store/slices/auth';
import { clearNotesLogout } from '../../../src/store/slices/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');
describe('Testing thunks auth', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  it('should call checkingCredentials', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  it('startGoogleSignIn should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('startGoogleSignIn should call checkingCredentials and logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  it('startCreatingUserWithEmailPassword should call checkingCredential and login - Exit', async () => {
    const loginData = {
      ok: true,
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    };
    const formData = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: '123456'
    };
    registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('startCreatingUserWithEmailPassword should call checkingCredential and logout - Error', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'Un error en Google'
    };
    const formData = {
      email: demoUser.email,
      displayName: demoUser.displayName,
      password: '123456'
    };
    registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it('startLoginWithEmailPassword should call checkingCredentials and login - Exit', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  it('startLoginWithEmailPassword should call checkingCredentials and logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  it('startLogout should call logoutFirebase, clearNotes and logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
