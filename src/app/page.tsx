import BirthForm from '@/components/BirthForm';
import ExampleWheel from '@/components/ExampleWheel';
import s from './home.module.css';

export default function Home() {
  return (
    <div className={s.home}>
      <section className={s.intro}>
        <p className="eyebrow">Free birth chart</p>
        <h1 className={`display ${s.title}`}>
          Your birth chart, <em>calculated to the minute.</em>
        </h1>
        <p className={s.lede}>Every planet placed where it stood the moment you were born, with your houses, aspects and what each placement means.</p>
        <BirthForm />
      </section>
      <section className={`card ${s.preview}`} aria-label="Example chart">
        <ExampleWheel />
        <p className={s.caption}>Example: Nova, born 20 March 1996 at 06:40 in Lisbon</p>
      </section>
    </div>
  );
}
