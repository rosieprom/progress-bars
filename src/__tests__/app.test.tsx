import App from "../App";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Home Page should render some UI elements", () => {
  it("should render 3 progress bars", () => {
    render(<App />);
    const progressBarOne = screen.getByText("25%");
    const progressBarTwo = screen.getByText("50%");
    const progressBarThree = screen.getByText("75%");

    expect(progressBarOne).toBeDefined();
    expect(progressBarTwo).toBeDefined();
    expect(progressBarThree).toBeDefined();
  });

  it("should render a select list", () => {
    render(<App />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });
  it("should render all the buttons", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(4);
  });
});

describe("Progress bars should behave as expected", () => {
  it("should not allow first progress bar to exceed past 0%", () => {
    render(<App />);
    const progressBarOne = screen.getByText("25%");
    const minus25Button = screen.getByRole("button", {
      name: /-25/i,
    });
    expect(minus25Button).toBeInTheDocument();
    fireEvent.click(minus25Button);
    fireEvent.click(minus25Button);
    // total should be blank
    const add25Button = screen.getByRole("button", {
      name: "+25",
    });
    expect(add25Button).toBeInTheDocument();
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);

    // total should be 50%
    expect(progressBarOne).toHaveTextContent("50%");
  });
  it("should not allow the second progress to exceed past 0%", () => {
    render(<App />);
    const progressBarTwo = screen.getByText("50%");

    // select the second progress bar
    const combobox = screen.getByRole("combobox");
    userEvent.selectOptions(combobox, "Progress Bar 2");
    const selectedOption = screen.getByRole("option", {
      name: "Progress Bar 2",
      selected: true,
    });

    expect(selectedOption).toBeInTheDocument();

    // click the options to get it to zero
    const minus25Button = screen.getByRole("button", {
      name: /-25/i,
    });
    expect(minus25Button).toBeInTheDocument();
    fireEvent.click(minus25Button);
    fireEvent.click(minus25Button);
    fireEvent.click(minus25Button);

    // total should be 0
    const add10Button = screen.getByRole("button", {
      name: "+10",
    });
    expect(add10Button).toBeInTheDocument();
    fireEvent.click(add10Button);

    // total should be 10%
    expect(progressBarTwo).toHaveTextContent("10%");
  });
  it("should not allow third progress bar to exceed past 0%", () => {
    render(<App />);
    const progressBarThree = screen.getByText("75%");

    // select the second progress bar
    const combobox = screen.getByRole("combobox");
    userEvent.selectOptions(combobox, "Progress Bar 3");
    const selectedOption = screen.getByRole("option", {
      name: "Progress Bar 3",
      selected: true,
    });

    expect(selectedOption).toBeInTheDocument();

    const minus25Button = screen.getByRole("button", {
      name: /-25/i,
    });
    expect(minus25Button).toBeInTheDocument();
    fireEvent.click(minus25Button);
    fireEvent.click(minus25Button);
    fireEvent.click(minus25Button);
    // total should be blank
    const add10Button = screen.getByRole("button", {
      name: "+10",
    });
    expect(add10Button).toBeInTheDocument();
    fireEvent.click(add10Button);

    // total should be 10%
    expect(progressBarThree).toHaveTextContent("10%");
  });
});

describe("progress bars should be allowed to go past 100%", () => {
  it("should let progress bar one to go past 100%", () => {
    render(<App />);
    const progressBarOne = screen.getByText("25%");

    const add25Button = screen.getByRole("button", {
      name: "+25",
    });
    expect(add25Button).toBeInTheDocument();

    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);

    // total should be 125%
    expect(progressBarOne).toHaveTextContent("125%");
  });
  it("should allow the second progress to exceed past 100%", () => {
    render(<App />);
    const progressBarTwo = screen.getByText("50%");

    // select the second progress bar
    const combobox = screen.getByRole("combobox");
    userEvent.selectOptions(combobox, "Progress Bar 2");
    const selectedOption = screen.getByRole("option", {
      name: "Progress Bar 2",
      selected: true,
    });

    expect(selectedOption).toBeInTheDocument();

    // total should be 125%
    const add25Button = screen.getByRole("button", {
      name: "+25",
    });
    expect(add25Button).toBeInTheDocument();
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);

    // total should be 125%
    expect(progressBarTwo).toHaveTextContent("125%");
  });
  it("should allow third progress bar to exceed past 100%", () => {
    render(<App />);
    const progressBarThree = screen.getByText("75%");

    // select the second progress bar
    const combobox = screen.getByRole("combobox");
    userEvent.selectOptions(combobox, "Progress Bar 3");
    const selectedOption = screen.getByRole("option", {
      name: "Progress Bar 3",
      selected: true,
    });

    expect(selectedOption).toBeInTheDocument();

    // total should be 150%
    const add25Button = screen.getByRole("button", {
      name: "+25",
    });
    expect(add25Button).toBeInTheDocument();
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);

    // total should be 125%
    expect(progressBarThree).toHaveTextContent("150%");
  });
});

describe("progress bars should change colour when going past 100%", () => {
  it("should go red when going past 100%", () => {
    render(<App />);
    const progressBarOne = screen.getByText("25%");

    // Get the initial background color of the progress bar
    const initialColor = getComputedStyle(progressBarOne).backgroundColor;

    const add25Button = screen.getByRole("button", {
      name: "+25",
    });
    expect(add25Button).toBeInTheDocument();

    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);
    fireEvent.click(add25Button);

    // total should be 125%
    expect(progressBarOne).toHaveTextContent("125%");

    // Get the new background color
    const newColor = getComputedStyle(progressBarOne).backgroundColor;

    // Check that the background color has changed
    expect(initialColor).not.toBe(newColor);
  });
});
