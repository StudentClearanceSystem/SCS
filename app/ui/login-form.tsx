import React from 'react';
import classes from '@/app/login/Login.module.css';

export default function LoginForm() {
  return (
    <form
      action="/auth/login"
      method="post"
      className="flex flex-col justify-center"
    >
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
      <div></div>
      <button className={classes.buttonLogin}>
        <div className={classes.loginWrapper}>
          <div className={classes.lOGIN}>LOGIN</div>
        </div>
      </button>
    </form>
  );
}
