import { FC } from 'react';
import { Skeleton } from './Skeleton';

export interface IUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
    onClickInvite: (id: number) => void,
    isInvited: boolean
};
const User: FC<IUser> = ({ id, first_name, last_name, avatar, email, onClickInvite, isInvited }) => (
    <li key={id}>
        <div>
            <img className="avatar" src={avatar} alt="User" />
            <div>
                <h3>{first_name} {last_name}</h3>
                <p>
                    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48,0a48,48,0,0,0,0,96,6,6,0,0,0,0-12A36,36,0,1,1,84,48V66a6,6,0,0,1-12,0V48A24,24,0,1,0,48,72a23.7365,23.7365,0,0,0,12.2549-3.4783A17.9586,17.9586,0,0,0,96,66V48A48.0474,48.0474,0,0,0,48,0Zm0,60A12,12,0,1,1,60,48,12.0081,12.0081,0,0,1,48,60Z" />
                    </svg>
                    {email}
                </p>
            </div>
        </div>
        <img onClick={() => onClickInvite(id)} className="action" src={`/assets/${isInvited ? "minus" : "plus"}.svg`} alt="Action" />
    </li>
);



type UsersProps = {
    items: IUser[],
    isLoading: boolean,
    searchValue: string,
    onChangeSearchValue: (value: string) => void,
    invites: number[],
    onClickInvite: (id: number) => void,
    onClickSendInvites: () => void
};
const Users: FC<UsersProps> = ({ items, isLoading, searchValue, onChangeSearchValue, onClickInvite, invites, onClickSendInvites }) => {
    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input value={searchValue} onChange={e => onChangeSearchValue(e.currentTarget.value)} type="text" placeholder="Найти пользователя..." />
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <ul className="users-list">
                    {items.filter(user => {
                        const fullName = user.first_name + user.last_name;
                        return fullName.toLowerCase().includes(searchValue.toLowerCase())
                            || user.email.toLowerCase().includes(searchValue.toLowerCase());
                    }).map(user => <User key={user.id} {...user} onClickInvite={onClickInvite} isInvited={invites.includes(user.id)} />)}
                </ul>
            )}
            <button className="send-invite-btn" onClick={onClickSendInvites} disabled={invites.length === 0}>Отправить приглашение</button>
        </>
    );
};

export default Users;