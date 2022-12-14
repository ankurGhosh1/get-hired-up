import { text } from "node:stream/consumers";
import React from "react";

interface Tags {
  label: string;
  value: string;
}

interface IProps {
  category: string;
  company: string;
  desc: string;
  tags: Tags[];
  role: string;
  url: string;
  logoUrl: string;
  companyUrl: string;
}

function getDesc(desc: string) {
  return desc.slice(0, 200) + "...";
}

function JobCard(props: IProps) {
  return (
    <div className="bg-[#067BC2] m-2 p-3 rounded h-full">
      <div className="flex items-center gap-2">
        <img src={props.logoUrl} alt={props.company} className=" h-12 w-12 " />
        <h1 className="text-2xl font-bold text-[#222]">
          <a href={props.companyUrl}>{props.company}</a>
        </h1>
      </div>

      <p className="mt-2">{getDesc(props.desc)}</p>
      <div className="flex items-center mt-2 flex-wrap gap-1 mb-3">
        {props.tags.map((tag, i) => (
          <h1
            key={i}
            className="bg-[#A62639] rounded-full py-1 px-2 text-white"
          >
            {tag.label}
          </h1>
        ))}
      </div>
      <a
        href={props.url}
        className="mt-2 bg-[#222] text-white p-2 hover:bg-[#fff] hover:text-[#222] font-bold"
      >
        Apply
      </a>
    </div>
  );
}

export default JobCard;
