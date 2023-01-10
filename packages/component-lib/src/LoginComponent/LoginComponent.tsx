import { useCallback, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

export interface LoginComponentProps {
  greeting: string;
  actionCallback: (email: string, password: string) => void;
}

export const LoginComponent = ({ greeting = 'Welcome!', actionCallback }: LoginComponentProps) => {
  console.log('LoginComponent');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
  const handleClick = useCallback(() => actionCallback(email, password), [actionCallback, email, password]);

  return (
    <Sheet
      sx={{
        width: 300,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="soft"
    >
      <div>
        <Typography component="h1" level="h4">
          {greeting}
        </Typography>
        <Typography level="body2">Sign in to continue.</Typography>
      </div>
      <TextField label="Email" name="email" onChange={handleEmailChange} placeholder="your.name@email.com" type="email" value={email} />
      <TextField label="Password" name="password" onChange={handlePasswordChange} placeholder="password" type="password" value={password} />
      <Button onClick={handleClick} sx={{ mt: 1 }}>
        Login
      </Button>
      <Typography endDecorator={<Link href="/sign-up">Sign up</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
        Don&apost have an account?
      </Typography>
    </Sheet>
  );
};
export default LoginComponent;
