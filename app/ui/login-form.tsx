'use client';
import React from 'react';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import classes from '@/app/login/Login.module.css';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="flex flex-col justify-center">
      <div className={classes.input}>
        <div className={classes.emailInput}>
          <label htmlFor="email" className={classes.email}>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@sjdelmonte.sti.edu.ph"
            required
            className={classes.inputField}
          />
        </div>

        <div className={classes.passwordInput}>
          <label htmlFor="password" className={classes.password}>
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter 6 characters or more"
            required
            minLength={6}
            className={classes.inputField}
          />
        </div>
      </div>
      <div>{errorMessage && <p>{errorMessage}</p>}</div>

      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: { preventDefault: () => void }) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      type="submit"
      className={classes.buttonLogin}
      aria-disabled={pending}
      onClick={handleClick}
    >
      <div className={classes.loginWrapper}>
        <div className={classes.lOGIN}>LOGIN</div>
      </div>
    </Button>
  );
}
