import BirthForm from '@/components/BirthForm';
import ExampleWheel from '@/components/ExampleWheel';
import s from './home.module.css';

export default function Home() {
  return (
    <div className={s.home}>
      <section className={s.intro}>
        <p className="eyebrow">Birth chart</p>
        <h1 className={`display ${s.title}`}>The sky you were born under, drawn in light.</h1>
        <p className={s.lede}>Enter the moment you arrived. We place every planet exactly where it stood and trace the constellation only your chart makes.</p>
        <BirthForm />
      </section>
      <section className={s.preview} aria-label="Example chart">
        <ExampleWheel />
        <p className={s.caption}>
          <span className="eyebrow">Example</span> Nova, born 20 March 1996, 06:40, Lisbon
        </p>
      </section>
    </div>
  );
}
