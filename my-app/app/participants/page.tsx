"use client";
import { gql, useQuery } from "@apollo/client";

interface Participant {
  age: number;
  email: string;
  id: string;
  name: string;
  nationality: string;
  surname: string;
}

interface Data {
  participants: Participant[];
}

interface Participants {
  participants: Participant[];
}

const PARTICIPANTS = gql`
  query Participants {
    participants {
      age
      email
      id
      name
      nationality
      surname
    }
  }
`;

const ParticipantsList = () => {
  const { data } = useQuery<Data>(PARTICIPANTS);
  const participants = data?.participants;
  console.log(data);

  return (
    <div>
      <div>Participants List</div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>E-mail</th>
              <th>Natiolality</th>
            </tr>
          </thead>
          <tbody>
            {participants?.map((participant) => {
              return (
                <tr key={participant.id}>
                  <th>{participant.name}</th>
                  <th>{participant.surname}</th>
                  <th>{participant.age}</th>
                  <th>{participant.email}</th>
                  <th>{participant.nationality}</th>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>E-mail</th>
              <th>Natiolality</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ParticipantsList;
