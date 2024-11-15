import * as Yup from 'yup';

// law_schema
export const law_schema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  msg: Yup.string().required().min(20).label("Message"),
});

// contact_schema
export const contact_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  company: Yup.string().required().label("Company"),
  msg: Yup.string().required().min(20).label("Message"),
});

// portfolio_schema
export const portfolio_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  subject: Yup.string().required().label("Subject"),
  msg: Yup.string().required().min(20).label("Message"),
});

export const register_schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  passwordConfirmation: Yup.string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.resolve(Yup.ref('password')) || value === null;
    }),
});

export const login_schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const blogSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  number: Yup.string().required().min(11).label("Number"),
  msg: Yup.string().required().min(20).label("Message"),
  terms: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
});
