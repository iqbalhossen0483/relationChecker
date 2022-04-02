import { useState } from "react";
import { useForm } from "react-hook-form";

function AddPeople() {
  const { register, handleSubmit, reset } = useForm<People>();
  const [isRelation, setIsRelation] = useState<boolean>(false);

  function addPeople(data: People) {
    fetch("https://my-server0483.herokuapp.com/people", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("people added successfully");
          reset();
        } else {
          alert("somthing was happened. Try agin");
        }
      });
  }

  function handleInput(text: string) {
    if (text === "none") {
      setIsRelation(false);
    } else {
      setIsRelation(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(addPeople)}>
        <input
          {...register("name", { required: true })}
          placeholder='People name'
          type='text'
        />
        <select
          {...register("relation")}
          onChange={(e) => handleInput(e.target.value)}
        >
          <option defaultChecked value='none'>
            none
          </option>
          <option value='friend'>friend</option>
          <option value='father'>father</option>
          <option value='mather'>mather</option>
          <option value='brother'>brother</option>
          <option value='sister'>sister</option>
        </select>
        <input
          {...register("to", { required: isRelation })}
          placeholder='Have relation to'
          disabled={!isRelation}
          type='text'
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default AddPeople;
