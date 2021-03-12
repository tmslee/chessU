import React, { useState } from "react";
import LoginForm from "./UserAuth/LoginForm"

export default function Application() {

  const [cookie, setCookie] = useState(null);

  if (!cookie) {
    return (
      <LoginForm setCookie={setCookie}/>
    )
  }

  return (
    <main>
    <h1>hi</h1>
    <LoginForm setCookie={setCookie} />
    </main>
  );

}