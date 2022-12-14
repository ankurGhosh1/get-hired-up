import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import JobSearch from "../components/JobSearch";

export const test = (
  <div>
    <React.StrictMode>
      <JobSearch />
    </React.StrictMode>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container);
root.render(test);
