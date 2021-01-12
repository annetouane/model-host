// package
import React, { useState } from "react";

const ChangePasswordLanding = ({}) => {
  const resetStates = () => {
    setPasswords({
      oldPassword: "",
      newPassWord: "",
      confirmNewPassword: "",
    });
  };

  // passwords state
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassWord: "",
    confirmNewPassword: "",
  });
  const { newPassWord, confirmNewPassword } = passwords;

  const onChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <section className='pwd-change-email'>
      <h1>KouKou</h1>
    </section>
  );
};

export default ChangePasswordLanding;
