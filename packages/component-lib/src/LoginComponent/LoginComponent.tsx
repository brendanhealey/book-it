import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

export interface LoginComponentProps {
  greeting: string;
  loginAction: () => void;
}

export const LoginComponent = ({ greeting = 'Welcome!', loginAction }: LoginComponentProps) => (
  <Sheet
    variant="soft"
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
  >
    <div>
      <Typography level="h4" component="h1">
        {greeting}`
      </Typography>
      <Typography level="body2">Sign in to continue.</Typography>
    </div>
    <TextField name="email" type="email" placeholder="your.name@email.com" label="Email" />
    <TextField name="password" type="password" placeholder="password" label="Password" />
    <Button onClick={loginAction} sx={{ mt: 1 }}>
      Login
    </Button>
    <Typography endDecorator={<Link href="/sign-up">Sign up</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
      Don't have an account?
    </Typography>
  </Sheet>
);

export default LoginComponent;
