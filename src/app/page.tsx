import BirthForm from '@/components/BirthForm';
import ExampleWheel from '@/components/ExampleWheel';
import s from './home.module.css';

const words = (text: string, start: number) =>
  text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="reveal-word" style={{ ['--word-index' as string]: start + i }}>
        {w}
      </span>{' '}
    </span>
  ));

export default function Home() {
  return (
    <div className={s.home}>
      <section className={s.intro}>
        <p className="eyebrow fade-up">
          <b>01</b> · free birth chart
        </p>
        <h1 className={`display ${s.title}`} style={{ ['--reveal-delay' as string]: '150ms' }}>
          <span className={s.dim}>{words('The sky has a map.', 0)}</span>
          <span>{words('Yours has a name.', 5)}</span>
        </h1>
        <p className={`${s.lede} pretty fade-up`} style={{ ['--fade-delay' as string]: '600ms' }}>
          Every planet placed where it stood the minute you were born, with your houses, aspects and what each one means.
        </p>
        <div className="fade-up" style={{ ['--fade-delay' as string]: '800ms' }}>
          <BirthForm />
        </div>
      </section>
      <section className={`card card-raised fade-up ${s.preview}`} style={{ ['--fade-delay' as string]: '400ms' }} aria-label="Example chart">
        <div className={s.previewHead}>
          <span className="eyebrow">example</span>
          <span className={s.previewName}>Nova · 20 Mar 1996 · 06:40 · Lisbon</span>
        </div>
        <ExampleWheel />
      </section>
    </div>
  );
}
