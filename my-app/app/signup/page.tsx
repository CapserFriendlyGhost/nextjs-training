"use client";
import { gql, useMutation } from "@apollo/client";
import { useState, ChangeEvent, FormEvent } from "react";

interface Participant {
  name: string;
  surname: string;
  age: string;
  email: string;
  nationality: string;
}

const countries: string[] = [
  "Choose your nationality",
  "POLAND",
  "GERMANY",
  "SWEDEN",
  "NORWAY",
  "CZECH",
  "FRANCE",
  "SPAIN",
  "ITALY",
];

const ADD_PARTICIPANT = gql`
  mutation Mutation($data: ParticipantCreateInput!) {
    createParticipant(data: $data) {
      age
      email
      id
      name
      nationality
      surname
    }
  }
`;

const SignUp = (): JSX.Element => {
  const [values, setValues] = useState<Participant>({
    name: "",
    surname: "",
    age: "",
    email: "",
    nationality: "Choose your nationality",
  });

  const [addParticipant] = useMutation<{ createParticipant: Participant }>(
    ADD_PARTICIPANT
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addParticipant({ variables: { data: values } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>Sign up</div>
      <form
        className="flex flex-col gap-10 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered input-success w-full max-w-xs"
          value={values.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          className="input input-bordered input-success w-full max-w-xs"
          value={values.surname}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="input input-bordered input-success w-full max-w-xs"
          value={values.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered input-success w-full max-w-xs"
          value={values.email}
          onChange={handleChange}
        />
        <select
          name="nationality"
          className="select select-accent w-full max-w-xs"
          value={values.nationality}
          onChange={handleChange}
        >
          {countries.map((country, index) => (
            <option key={index}>{country}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-accent w-auto">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUp;
