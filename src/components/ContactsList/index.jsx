import React from "react";

export const ContactsList = ({ data }) => {
  return (
    <ul className="list-information">
      {data.map((item) => (
        <li key={item.id}>
          {item.name}
          <ul>
            <li>
              <a
                href={item.telegram}
                className="link"
                rel="noreferrer"
                target="_blank"
              >
                Telegram
              </a>
            </li>
            <li>Email - {item.email}</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
