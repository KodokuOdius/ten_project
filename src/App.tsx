import { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

interface IRates {
    [index: string]: number
};

const App = () => {
    const [rates, setRates] = useState<IRates>({});
    const [fromCurrency, setFromCurrency] = useState<string>("RUB");
    const [toCurrency, setToCurrency] = useState<string>("USD");
    const [fromPrice, setFromPrice] = useState<number>(0);
    const [toPrice, setToPrice] = useState<number>(0);


    useEffect(() => {
        fetch("https://cdn.cur.su/api/latest.json"
        ).then(res => res.json()
        ).then(json => setRates(json.rates)
        ).catch(err => console.warn(err));
    }, []);

    const onChangeFromPrice = (value: number) => {
        const price = value / rates[fromCurrency];
        const result = price * rates[toCurrency];
        setFromPrice(value);
        setToPrice(result);
    };
    const onChangeToPrice = (value: number) => {
        const result = rates[fromCurrency] / rates[toCurrency] * value;
        setFromPrice(result);
        setToPrice(value);
    };

    useEffect(() => {
        onChangeFromPrice(fromPrice);
    }, [fromCurrency, fromPrice]);
    useEffect(() => {
        onChangeToPrice(toPrice);
    }, [toCurrency, toCurrency]);

    return (
        <div className="App">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeCurrency={setFromCurrency}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeCurrency={setToCurrency}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
}

export default App;