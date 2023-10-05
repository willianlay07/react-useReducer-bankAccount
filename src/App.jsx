import { useReducer } from "react";

const initialValue = {
  balance: 0,
  loan: 0,
  isOpened: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        balance: 150,
        isOpened: true,
      };

    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + 150,
      };

    case "WITHDRAW":
      return {
        ...state,
        balance: state.balance - 50,
      };

    case "REQUEST_LOAN":
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };

    case "PAY_LOAN":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };

    case "CLOSE_ACCOUNT":
      return initialValue;

    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { balance, loan, isOpened } = state;

  function handleWithdraw() {
    if (balance >= 50) {
      dispatch({
        type: "WITHDRAW",
      });
    } else {
      alert("Not enought amount to withdraw!");
    }
  }

  function handleLoan() {
    if (loan > 0) {
      alert("Please clear outstanding Loan first!");
    } else {
      dispatch({
        type: "REQUEST_LOAN",
      });
    }
  }

  function handlePayLoan() {
    if (loan > 0) {
      if (balance >= loan) {
        dispatch({
          type: "PAY_LOAN",
        });
      } else {
        alert("Not enough balance to pay Loan!");
      }
    } else {
      alert("No outstanding loan to pay!");
    }
  }

  function handleCloseAccount() {
    if (loan > 0) {
      alert("Please clear outstanding Loan first!");
    } else if (balance > 0) {
      alert("Please clear balance amount!");
    } else {
      dispatch({
        type: "CLOSE_ACCOUNT",
      });
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useReducer Bank Account</h1>

      <h2 style={{ color: "#009900" }}>Balance Amount: ${balance}</h2>
      <h2 style={{ color: "#c72a25" }}>Loan Amount: ${loan}</h2>

      <button
        disabled={isOpened}
        className={!isOpened ? "" : "dis"}
        onClick={() => dispatch({ type: "OPEN" })}
      >
        Open Account
      </button>
      <br />
      <button
        disabled={!isOpened}
        className={isOpened ? "" : "dis"}
        onClick={() => dispatch({ type: "DEPOSIT" })}
      >
        Deposit $150
      </button>
      <br />
      <button
        disabled={!isOpened}
        className={isOpened ? "" : "dis"}
        onClick={() => handleWithdraw()}
      >
        Withdraw $50
      </button>
      <br />
      <button
        disabled={!isOpened}
        className={isOpened ? "" : "dis"}
        onClick={() => handleLoan()}
      >
        Request A Loan of $5000
      </button>
      <br />
      <button
        disabled={!isOpened}
        className={isOpened ? "" : "dis"}
        onClick={() => handlePayLoan()}
      >
        Pay Loan
      </button>
      <br />
      <button
        disabled={!isOpened}
        className={isOpened ? "" : "dis"}
        onClick={() => handleCloseAccount()}
      >
        Close Account
      </button>
    </div>
  );
};

export default App;
