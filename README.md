# Hive AI - Frontend Engineer Challenge

This repo contains the Frontend Engineer Challenge for Hive AI.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Usage

Use it in your app:

```javascript
import { useState } from "react";
import "./App.css";
import DropdownSelect from "./components/Dropdown/DropdownSelect";


const countries = [
  "United States of America",
  "Mexico",
  "France",
  "Italy",
];

const food = ["pizza", "cows", "meat", "carrots"];

function App() {
  // states to pass in as props
  const [selectedOption, setSelectedOption] = useState<string>(""); // single

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // multiple

  return (
    <div>
      {/* single */}
      <DropdownSelect
        defaultTitle="Countries"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={countries}
      />
      {/* multiple */}
      <DropdownSelect
        defaultTitle="Foods"
        multiple={true}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        options={food}
      />
    </div>
  );
}
```

### Props

Common props you may want to specify include:

- `defaultTitle` - title of the label
- `multiple` - boolean to set if selector is multiple or single
- `selectedOption` - selected option only when multiple === false
- `setSelectedOption` - react hook state setter only when multiple === false
- `selectedOptions` - selected options only when multiple === true
- `setSelectedOptions` - react hook state setter only when multiple === true
- `options` - list of strings to be used as options

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
