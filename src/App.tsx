import { useState } from 'react';
import './index.scss';

const App = () => {
    const [counter, setCounter] = useState<number>(0);

    const onPlus = () => {
        setCounter(counter + 1);
    };
    const onMinus = () => {
        setCounter(counter - 1);
    };

    return (
        <div className="App">
            <div>
                <h2>Счетчик:</h2>
                <h1>{counter}</h1>
                <button className="minus" onClick={onMinus}>- Минус</button>
                <button className="plus" onClick={onPlus}>Плюс +</button>
            </div>
        </div>
    );
}

export default App;