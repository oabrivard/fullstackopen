import React from 'react';

const Person = ({person, deletePerson}) => <div>
  {person.name} {person.number} 
  <button onClick={deletePerson}>delete</button>
</div>

const Persons = ({persons,newFilter,deletePerson}) => {
  return (
    <div>
      {persons.filter(p => p.name.includes(newFilter)).map(p => <Person key={p.id} person={p} deletePerson={() => deletePerson(p.id)}/>)}      
    </div>
  );
};

export default Persons;