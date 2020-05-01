import React from 'react';

const Person = ({person}) => <div>
  {person.name} {person.number}
</div>

const Persons = ({persons,newFilter}) => {
  return (
    <div>
      {persons.filter(p => p.name.includes(newFilter)).map(p => <Person key={p.name} person={p} />)}      
    </div>
  );
};


export default Persons;