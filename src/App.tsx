import { FC, useState } from 'react';

type Modal1Props = {
    closeModal: () => void;
};
type Modal2Props = {
    modal: boolean,
    closeModal: () => void;
};

const Modal1: FC<Modal1Props> = ({ closeModal }) => {
    return (
        <div className="overlay">
            <div className="modal">
                <svg height="200" viewBox="0 0 200 200" width="200" onClick={closeModal}>
                    <title />
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
                <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt='anime' />
            </div>
        </div>
    );
};

const Modal2: FC<Modal2Props> = ({ modal, closeModal }) => {
    return (
        <div className={`overlay animated ${modal && "show"}`}>
            <div className="modal">
                <svg height="200" viewBox="0 0 200 200" width="200" onClick={closeModal}>
                    <title />
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
                <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt='anime' />
            </div>
        </div>
    );
};

const App = () => {
    const [modal1, setModal1] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);

    const toggleModal1 = () => {
        setModal1(modal => !modal);
    };

    const toggleModal2 = () => {
        setModal2(modal => !modal);
    };

    return (
        <div className="App">
            <button className="open-modal-btn" onClick={toggleModal1}>✨ Открыть окно 1</button>
            {/* if rendering */}
            {modal1 && <Modal1 closeModal={toggleModal1} />}


            <button className="open-modal-btn" onClick={toggleModal2}>✨ Открыть окно 2</button>
            {/* animated rendering */}
            <Modal2 modal={modal2} closeModal={toggleModal2} />
        </div >
    );
};

export default App;
