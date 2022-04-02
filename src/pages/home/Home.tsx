import { useState } from "react";
import { useForm } from "react-hook-form";

interface Input {
  first: string;
  second: string;
}
interface Relation {
  firstMan: string;
  secondMan: string[];
  relation: string[];
  isRelation: boolean;
}
const initialState = {
  firstMan: "",
  secondMan: [],
  relation: [],
  isRelation: false,
};
function Home() {
  const [relation, setRelation] = useState<Relation>(initialState);
  const [showRelation, setShowRelation] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Input>();

  function reset() {
    const exist = relation;
    exist.firstMan = "";
    exist.relation = [];
    exist.secondMan = [];
    exist.isRelation = false;
    setRelation(exist);
  }

  async function onSubmit(data: Input) {
    const res = await fetch("https://my-server0483.herokuapp.com/people");
    const people = await res.json();
    const firstMan = data.first;
    const secondMan = data.second;

    reset();

    const exist = relation;
    for (const man of people) {
      if (firstMan === man.name && secondMan === man.to) {
        exist.firstMan = firstMan;
        exist?.relation.push(man.relation);
        exist?.secondMan.push(man.to);
        break;
      } else if (firstMan === man.name) {
        exist.firstMan = firstMan;
        exist?.relation.push(man.relation);
        exist?.secondMan.push(man.to);
        if (exist.secondMan[exist.secondMan.length - 1] === secondMan) {
          break;
        }
      } else if (
        relation?.secondMan[relation?.secondMan.length - 1] === man.name
      ) {
        exist?.relation.push(man.relation);
        exist?.secondMan.push(man.to);
        if (exist.secondMan[exist.secondMan.length - 1] === secondMan) {
          break;
        }
      }
    }
    if (exist.secondMan[exist.secondMan.length - 1] === secondMan) {
      exist.isRelation = true;
    } else {
      exist.isRelation = false;
    }
    setRelation({ ...exist });
    setShowRelation(true);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("first", { required: true })}
          placeholder='First people'
          type='text'
        />
        <input
          {...register("second", { required: true })}
          placeholder='Second people'
          type='text'
        />
        <button type='submit'>submit</button>
      </form>

      {showRelation && (
        <div className='relation'>
          {relation.isRelation ? (
            <div>
              <span className='name'>{relation.firstMan}</span> is a
              {relation.secondMan.map((man, index) => (
                <span key={index}>
                  {" "}
                  {relation.relation[index]} of{" "}
                  <span className='name'>{man}</span>
                </span>
              ))}
            </div>
          ) : (
            <h3>
              {relation.firstMan} is no relation with{" "}
              {relation.secondMan[relation.secondMan.length - 1]}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
