import LoginForm from '@/app/ui/login-form';
import classes from '../login/Login.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.studentClearance}>
          <div className={classes.textBlock}>Student</div>
          <div className={classes.textBlock2}>Clearance</div>
        </div>

        <div className={classes.loginFrame}>
          <div className={classes.loginWithOffice365}>
            <div className={classes.textBlock5}>Login</div>
            <div className={classes.textBlock6}>
              <p className={classes.labelWrapper}>
                <span className={classes.label}>with </span>
                <span className={classes.label2}>Office 365</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className={classes.stiLogo}></div>
      <div className={classes.credits}></div>
    </div>
  );
}
