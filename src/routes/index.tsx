import { A } from 'solid-start';
import styles from './routes.module.css';


export default function Home()
{
  return (
    <main class={styles.main_container}>
      <h1 class={styles.h1}>
        Hello world!
      </h1>
      <p class={styles.mt}>
        Visit{' '}
        <a
          href="https://solidjs.com"
          target="_blank"
          class={styles.link}
        >
          solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>
      <p class={styles.my}>
        <span>Home</span>
        {' - '}
        <A href="/about" class={styles.link}>
          About Page
        </A>{' '}
      </p>
    </main>
  );
}
