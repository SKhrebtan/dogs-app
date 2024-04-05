import cookie from 'cookie';

export const setTokenCookie = (res, token) => {
  const cookies = cookie.serialize('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  res.setHeader('Set-Cookie', cookies);
};

export const removeTokenCookie = (res) => {
  const cookies = cookie.serialize('token', '', {
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });
  res.setHeader('Set-Cookie', cookies);
};
