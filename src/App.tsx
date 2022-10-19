import { FC, useState } from 'react';
import './index.scss';

interface IQuestion {
    title: string,
    variants: string[],
    correct: number
};

const questions: IQuestion[] = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

type ResultProps = {
    correct: number
};

const Result: FC<ResultProps> = ({ correct }) => {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="end img" />
            <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
            <a href="/">
                <button>Попробовать снова</button>
            </a>
        </div>
    );
};

type GameProps = {
    step: number,
    question: IQuestion,
    onClickVariant: (index: number) => void;
};

const Game: FC<GameProps> = ({ step, question, onClickVariant }) => {
    const percent = Math.round((step / questions.length) * 100);
    return (
        <>
            <div className="progress">
                <div style={{ width: percent.toString() + "%" }} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, idx) => {
                    return <li
                        key={text}
                        onClick={() => onClickVariant(idx)}
                    >
                        {text}
                    </li>
                })}
            </ul>
        </>
    );
};

const App: FC = () => {
    const [step, setStep] = useState<number>(0);
    const [correct, setCorrect] = useState<number>(0);

    const question = questions[step];

    const onClickVariant = (index: number) => {
        setStep(step + 1);
        if (index === question.correct) {
            setCorrect(correct + 1);
        };
    };

    return (
        <div className="App">
            {
                step !== questions.length ?
                    <Game step={step} question={question} onClickVariant={onClickVariant} /> :
                    <Result correct={correct} />
            }
        </div>
    );
};

export default App;