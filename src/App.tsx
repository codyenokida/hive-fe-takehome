import { useState } from "react";
import "./App.css";
import DropdownSelect from "./components/Dropdown/DropdownSelect";

const countries = [
  "United States of America",
  "Mexico",
  "France",
  "Italy",
  "Denmark",
  "Greece",
  "Tazmania",
  "Japan",
  "China",
  "Korea",
  "Spain",
];

const food = ["pizza", "cows", "banana", "meat", "carrots"];

function App() {
  const [selectedOptionOne, setSelectedOptionOne] = useState<string>("");
  const [selectedOptionTwo, setSelectedOptionTwo] = useState<string[]>([]);

  return (
    <div className="App">
      <DropdownSelect
        defaultTitle="Countries"
        selectedOption={selectedOptionOne}
        setSelectedOption={setSelectedOptionOne}
        options={countries}
      />

      <DropdownSelect
        defaultTitle="Foods"
        multiple={true}
        selectedOptions={selectedOptionTwo}
        setSelectedOptions={setSelectedOptionTwo}
        options={food}
      />
    </div>
  );
}

export default App;
