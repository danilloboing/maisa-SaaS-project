import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';

import { loginSchema } from '@/constants/schemas/login-form';
import { useToast, useAuth } from '@/hooks';
import { LoginData } from '@/types/auth';

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { successToast, errorToast } = useToast();
  const { onLoginHandler } = useAuth();

  async function handleLoginSubmit(data: LoginData) {
    await onLoginHandler(data);
  }
  
  useEffect(() => {
    for (const key in errors) {
      // @ts-expect-error necessario ver a key
      const element = errors[key].message
      errorToast(element);
    }
  }, [errors]);

  return (
    <div className='h-screen flex'>
      <Card className='m-auto flex-grow max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                    {...field}
                  />
                )}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <Input id='password' type='password' required {...field} />
                )}
              />
            </div>
            <Button
              type='submit'
              className='w-full'
              onClick={handleSubmit(handleLoginSubmit)}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
