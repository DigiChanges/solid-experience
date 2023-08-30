import { createSignal } from 'solid-js';
import styles from "./counter.module.css"

export default function Counter()
{
  const [count, setCount] = createSignal(0);
  return (
    <button
      class={styles.counterButton}
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </button>
  );
}
