import { CheckboxIcon } from './CheckboxIcon';
import React from 'react';
import Image from 'next/image';

import classes from './Login.module.css';

export default async function Page() {
  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <div className={classes.studentClearance}>
          <div className={classes.textBlock}>Student</div>
          <div className={classes.textBlock2}>Clearance</div>
        </div>
        <div className={classes.frame1}>
          <button className={classes.buttonMSOA}>
            <div className={classes.buttonContent}>
              <div className={classes.image3} />
              <div className={classes.office365Login}>Office 365 Login</div>
            </div>
          </button>

          <div className={classes.or}>or</div>
          <button className={classes.rectangle3}>
            <div className={classes.loginWrapper}>
              <div className={classes.lOGIN}>LOGIN</div>
            </div>
          </button>

          <div className={classes.rememberMeCheckBox}>
            <div className={classes.checkbox}>
              <CheckboxIcon className={classes.icon} />
            </div>
            <div className={classes.rememberMe}>Remember me</div>
          </div>
          <div className={classes.input}>
            <div className={classes.passwordInput}>
              <div className={classes.password}>Password</div>
              <div className={classes.textField}>
                <div className={classes.enter6CharactersOrMore}>
                  <div className={classes.textBlock3}>
                    Enter 6 characters or more
                  </div>
                  <div className={classes.textBlock4}>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.emailInput}>
              <div className={classes.email}>Email</div>
              <div className={classes.textField2}>
                <div className={classes.youSjdelmonteStiEduPh}>
                  you@sjdelmonte.sti.edu.ph
                </div>
              </div>
            </div>
          </div>
          <div className={classes.loginWithOffice365}>
            <div className={classes.textBlock5}>Login</div>
            <div className={classes.textBlock6}>
              <p className={classes.labelWrapper}>
                <span className={classes.label}>with </span>
                <span className={classes.label2}>Office 365</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.stiLogo}></div>
      <div className={classes.credits}></div>
    </div>
  );
}
