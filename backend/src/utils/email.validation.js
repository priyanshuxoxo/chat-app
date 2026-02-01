let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailValidate = (mail) => {
  if (regex.test(mail)) {
    console.log("Valid Email address");
    return true;
  } else {
    console.log("Invalid Email address");
    return false;
  }
};
