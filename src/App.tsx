import { useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import SelectList from "./components/SelectList";
import Button from "./components/Button";

function App() {
  const handlePercentageChange = (amount: number) => {
    let newPercentage;
    if (selectedOption === "#progressBar1") {
      newPercentage = percentage1 + amount;
      if (newPercentage < 0) {
        newPercentage = 0;
      }
      setPercentage1(newPercentage);
    }
    if (selectedOption === "#progressBar2") {
      newPercentage = percentage2 + amount;
      if (newPercentage < 0) {
        newPercentage = 0;
      }
      setPercentage2(newPercentage);
    }
    if (selectedOption === "#progressBar3") {
      newPercentage = percentage3 + amount;
      if (newPercentage < 0) {
        newPercentage = 0;
      }
      setPercentage3(newPercentage);
    }
  };

  const selOpt = [
    {
      key: 1,
      value: "#progressBar1",
      label: "Progress Bar 1",
    },
    {
      key: 2,
      value: "#progressBar2",
      label: "Progress Bar 2",
    },
    {
      key: 3,
      value: "#progressBar3",
      label: "Progress Bar 3",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(selOpt[0].value);

  const [percentage1, setPercentage1] = useState(25);
  const [percentage2, setPercentage2] = useState(50);
  const [percentage3, setPercentage3] = useState(75);

  return (
    <div className="App">
      <ProgressBar id={"progressBar1"} percentage={percentage1} />
      <ProgressBar id={"progressBar2"} percentage={percentage2} />
      <ProgressBar id={"progressBar3"} percentage={percentage3} />

      <br />

      <SelectList
        selectName={"select-progress-bar"}
        selectId={"select-progress"}
        selectOptions={selOpt}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <Button label={"-25"} onClick={() => handlePercentageChange(-25)} />
      <Button label={"-10"} onClick={() => handlePercentageChange(-10)} />
      <Button label={"+10"} onClick={() => handlePercentageChange(10)} />
      <Button label={"+25"} onClick={() => handlePercentageChange(25)} />
    </div>
  );
}

export default App;
