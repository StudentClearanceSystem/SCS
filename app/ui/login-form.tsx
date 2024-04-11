'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import classes from '@/app/ui/Login.module.css';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.studentClearance}>
          <div className={classes.textBlock}>Student</div>
          <div className={classes.textBlock2}>Clearance</div>
        </div>
        <form action={dispatch} className={classes.loginFrame}>
          <div className={classes.loginWithOffice365}>
            <div className={classes.textBlock5}>Login</div>
            <div className={classes.textBlock6}>
              <p className={classes.labelWrapper}>
                <span className={classes.label}>with </span>
                <span className={classes.label2}>Office 365</span>
              </p>
            </div>
          </div>

          <div className={classes.input}>
            <div className={classes.emailInput}>
              <label htmlFor="email" className={classes.email}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@sjdelmonte.sti.edu.ph"
                className={classes.inputField}
                required
              />
            </div>

            <div className={classes.passwordInput}>
              <label htmlFor="password" className={classes.password}>
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter 6 characters or more"
                required
                minLength={6}
                className={classes.inputField}
              />
            </div>

            <div className={classes.rememberMeCheckBox}>
              <input
                type="checkbox"
                id="rememberMeCheckbox"
                className={classes.checkboxInput}
              />
              <label
                htmlFor="rememberMeCheckbox"
                className={classes.rememberMe}
              >
                Remember me
              </label>
            </div>
          </div>

          {/* <button className={classes.buttonMSOA}>
            <div className={classes.buttonContent}>
              <div className={classes.image3} />
              <div className={classes.office365Login}>Office 365 Login</div>
            </div>
          </button>

          <div className={classes.or}>or</div> */}

          <button className={classes.buttonLogin}>
            <div className={classes.loginWrapper}>
              <div className={classes.lOGIN}>LOGIN</div>
            </div>
          </button>
        </form>
      </div>
      <div className={classes.stiLogo}></div>
      <div className={classes.credits}></div>
    </div>
  );
}
