import React, { useState, useEffect } from "react";
// import { allJobs } from "../background/background";
import JobCard from "./JobCard";

function JobSearch() {
  const [loading, setLoading] = useState(false);
  const [allJobs, setAlljobs] = useState([]);
  const PER_PAGE = 10;
  const totalPage = allJobs.length / 10 + (allJobs.length % 10) != 0 ? 1 : 0;
  const [pageNumber, setPagenumber] = useState(0);
  const [jobList, setJoblist] = useState("All");

  const data = [
    { type: "All" },
    { type: "Engineering" },
    { type: "Marketing" },
    { type: "Product" },
    { type: "Sales" },
    { type: "Data" },
    { type: "Human Resources" },
  ];

  useEffect(() => {
    fetch("https://4dayweek.io/api")
      .then((res) => res.json())
      .then((data) => {
        setAlljobs(data.jobs);
      });
    setLoading(true);
  }, []);

  return (
    <div>
      <div className="flex gap-2 bg-[#067BC2] p-2 text-white flex-wrap">
        {data.map((item, i) => (
          <a
            onClick={() => setJoblist(item.type)}
            className="cursor-pointer"
            key={i}
          >
            {item.type}
          </a>
        ))}
      </div>

      {loading ? (
        <div>
          {allJobs
            .filter((data) => jobList === "All" || data.category === jobList)
            .slice(pageNumber * PER_PAGE, pageNumber * PER_PAGE + PER_PAGE)
            .map((job: any) => (
              <JobCard
                category={job.category}
                company={job.company_name}
                desc={job.description}
                tags={job.filters}
                role={job.role}
                url={job.url}
                logoUrl={job.company.logo_url}
                companyUrl={job.company.company_url}
                key={job.id_str}
                allCompanyJobs={job.company.url}
              ></JobCard>
            ))}
        </div>
      ) : null}

      <div className="flex justify-center items-center m-2 gap-1">
        <button
          onClick={() => {
            setPagenumber((page) => page - 1);
          }}
          className=" bg-[#222] text-white p-2 hover:bg-[#fff] hover:text-[#222] font-bold border border-white"
          disabled={pageNumber == 0}
        >
          Prev
        </button>

        <button
          onClick={() => {
            setPagenumber((page) => page + 1);
          }}
          className=" bg-[#222] text-white p-2 hover:bg-[#fff] hover:text-[#222] font-bold border border-white"
          disabled={pageNumber > totalPage}
        >
          Next
        </button>
      </div>
      <div className="flex justify-between">
        <a
          href="https://arraysnobjects.vercel.app/about"
          className="mb-4 mt-2 mx-2 text-xsno-underline text-white"
        >
          Request an Extension
        </a>
        <a
          href="mailto:ankutcool.kumar@gmail.com"
          className="mb-4 mt-2 mx-3 text-xsno-underline text-white"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}

export default JobSearch;
