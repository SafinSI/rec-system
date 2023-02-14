import React from "react"

type ContactsListProps = {
  data: { id: number; name: string; email: string; telegram: string }[]
}

export const ContactsList = ({ data }: ContactsListProps) => {
  return (
    <ul className="list-information">
      {data.map((item) => (
        <li key={item.id}>
          {item.name}
          <ul>
            <li>
              <a href={item.telegram} className="link" rel="noreferrer" target="_blank">
                Telegram
              </a>
            </li>
            <li>Email - {item.email}</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
