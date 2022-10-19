import { FC, useEffect, useState } from 'react';
import Users, { IUser } from './components/Users';

type SuccessProps = { count: number };
export const Success: FC<SuccessProps> = ({ count }) => {
    return (
        <div className="success-block">
            <img src="/assets/success.svg" alt="Success" />
            <h3>Успешно!</h3>
            <p>Всем {count} пользователям отправлено приглашение.</p>
            <button onClick={() => window.location.reload()} className="send-invite-btn">Назад</button>
        </div>
    );
};

const App = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [invites, setInvites] = useState<number[]>([]);
    const [success, setSuccess] = useState<boolean>(false);

    const onClickInvite = (id: number) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id));
        } else {
            setInvites(prev => [...prev, id]);
        };
    };

    useEffect(() => {
        fetch("https://reqres.in/api/users"
        ).then(res => res.json()
        ).then(json => {
            setUsers(json.data);
        }).catch(err => {
            console.warn(err);
            console.log("Error while getting users");
        }).finally(() => setLoading(false));
    }, []);

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    };

    const onClickSendInvites = () => {
        setSuccess(true);
    };

    return (
        <div className="App">
            {success ? (
                <Success count={invites.length} />
            ) : (
                <Users
                    items={users}
                    isLoading={loading}
                    searchValue={searchValue}
                    onChangeSearchValue={onChangeSearchValue}
                    onClickInvite={onClickInvite}
                    invites={invites}

                    onClickSendInvites={onClickSendInvites}
                />
            )}
        </div>
    );
}

export default App;