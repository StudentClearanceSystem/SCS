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
            <div className={classes.textBlock5}>
              Login
              <div className={classes.textBlock6}>
                with
                <span className={classes.office365}> Office 365</span>
              </div>
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
