import { A } from 'solid-start';
import Counter from '~/components/Counter';
import styles from './routes.module.css';

export default function About()
{
  return (
    <main class={styles.main_container}>
      <h1 class={styles.h1}>
        About Page
      </h1>
      <Counter />
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
        <A href="/" class={styles.link}>
          Home
        </A>
        {' - '}
        <span>About Page</span>
      </p>
    </main>
  );
}
