import React, { useState } from 'react';
import authStyle from './ModalStyle.module.css';
import makeAuthorization from '../../utils/makeAuthorization';

function AuthorizationWindow({ active, setActive, setAuth }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={active? authStyle.active : authStyle.unactive}
      onClick={() => setActive(false)}>
      <div className={authStyle.content} onClick={(e) => e.stopPropagation()}>
        <h4 className={authStyle.header}>Вход</h4>
        <input className={authStyle.textarea}
          type="text" placeholder={"Логин"}
          onChange = {e => setLogin(e.target.value)}
        />
        <input className={authStyle.textarea}
          type="password" placeholder={"Пароль"}
          onChange = {e => setPassword(e.target.value)}
        />
        <button className="square-button"
          onClick={() => {
            makeAuthorization(login, password)
            .then(result => {
              if (result) {
                setActive(false)
                setAuth(true)
              } else {
                setAuth(false)
              }
            })
          }}
        >Войти</button>
      </div>
    </div>
  )
}

export default AuthorizationWindow;
