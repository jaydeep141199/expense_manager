import React from "react";
import StatsPage from "./StatsPage";
import IncomeExpenseForm from "../components/IncomeExpenseForm";
const DashBoard: React.FC = () => {
  return (
    <>
      <StatsPage />
      <IncomeExpenseForm />
    </>
  );
};

export default DashBoard;
