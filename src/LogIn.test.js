import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { store } from "./store";
import { LogIn } from "./pages/LogIn";

test("LogIn test", () => {
  render(
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <LogIn />
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  );

  const emaillabel = screen.getByTestId("email-label");
  const passwordlabel = screen.getByTestId("password-label");
  const emailinput = screen.getByTestId("email-input");
  const passwordinput = screen.getByTestId("password-input");
  const loginbutton = screen.getByTestId("login-button");

  expect(emaillabel).toBeInTheDocument();
  expect(passwordlabel).toBeInTheDocument();
  expect(emailinput).toBeInTheDocument();
  expect(passwordinput).toBeInTheDocument();
  expect(loginbutton).toBeInTheDocument();
});
