import { stack } from '../data/stack';
import styles from './Stack.module.css';

export default function Stack() {
  return (
    <section id="stack" className={styles.section}>
      <h2 className={styles.heading}>Tech Stack</h2>
      <div className={styles.grid}>
        {stack.map((category) => (
          <div key={category.title} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.items}>
              {category.items.map((item) => (
                <span key={item} className={styles.item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
