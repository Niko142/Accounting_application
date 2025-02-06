import { React } from 'react';
import Button from 'components/Button/Button';

export default function ComponentsSelection({ active, onChange }) {
  return (
    <>
      <section id="typeValues">
        <div id="compbutt">
          <Button
            isActive={active === 'videocard'}
            onClick={() => onChange('videocard')}
          >
            Видеокарта
          </Button>
          <Button
            isActive={active === 'processor'}
            onClick={() => onChange('processor')}
          >
            Процессор
          </Button>
          <Button
            isActive={active === 'mothercard'}
            onClick={() => onChange('mothercard')}
          >
            Материнская плата
          </Button>
          <Button
            isActive={active === 'memory'}
            onClick={() => onChange('memory')}
          >
            Оперативная память
          </Button>
          <Button isActive={active === 'disk'} onClick={() => onChange('disk')}>
            Жесткий диск
          </Button>
        </div>
      </section>
    </>
  );
}
