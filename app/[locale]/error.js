"use client";
import React from "react";
import { ErrorView } from "./components/global/ErrorView";

const error = ({ error, reset }) => {
  return <ErrorView error={error} reset={reset} />;
};

export default error;
