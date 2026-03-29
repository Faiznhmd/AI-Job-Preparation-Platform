import { useDispatch } from 'react-redux';
import { setCredentials, setLoading } from '../redux/slices/authSlice';
import { loginUser } from '../services/authApi';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));

      const res = await loginUser(form);

      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      localStorage.setItem('token', res.data.token);

      dispatch(setLoading(false));

      // redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
