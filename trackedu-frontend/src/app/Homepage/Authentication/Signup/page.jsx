'use client';

import Link from 'next/link';
import styles from '../AuthForm.module.css';

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Create Account 🚀</h2>
        <p className={styles.subtitle}>Start your journey with TrackEdu</p>

        <input type="text" placeholder="Full Name" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Password" className={styles.input} />

        <button type="submit" className={styles.button}>Sign Up</button>

        <p className={styles.linkText}>
          Already have an account?{' '}
          <Link href="/Homepage/Authentication/login" className={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
}
