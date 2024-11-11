import styles from './app.module.css';
import './index.css'
import { useState } from 'react';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение', '')
		setValue(promptValue);

		if (promptValue.length < 3) setError('Введенное значение должно содержать минимум 3 символа');
		else {
			setError('');
		}
	}

	const onAddButtonClick = () => {
		if (value.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			return;
		}
		const updatedList = [...list, { id: Date.now(), value: value, createdAt: new Date() }];
		setList(updatedList);
		setValue('');
		setError('');
		console.log(updatedList)
	}

  return (
    <div className={styles["app"]}>
    <h1 className={styles["page-heading"]}>Ввод значения</h1>
    <p className={styles["no-margin-text"]}>
      Текущее значение <code>value</code>: "<output className={styles["current-value"]}>{value}</output>"
    </p>
    {error !== '' ? <div className={styles["error"]}>{error}</div> : null}
    <div className={styles["buttons-container"]}>
      <button className={styles["button"]} onClick={onInputButtonClick}>Ввести новое</button>
      <button className={styles["button"]} disabled={value.length > 3} onClick={onAddButtonClick}>Добавить в список</button>
    </div>
    <div className={styles["list-container"]}>
      <h2 className={styles["list-heading"]}>Список:</h2>
      <p className={styles["no-margin-text"]}>{list.length === 0 ? 'Нет добавленных элементов' : null}</p>
      <ul className={styles["list"]}>
			{list.map(({ id, value, createdAt }) => (
            <li key={id}>
              {value} - {createdAt.toLocaleString()}
            </li>
          ))}
      </ul>
    </div>
  </div>
  );
}

export default App;
