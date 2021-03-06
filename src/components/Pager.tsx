import classnames from "classnames";
import { FunctionComponent, useEffect, useState } from "react";
import { ProjectDetails } from "../services/CothorityTypes";
import { NextButton, PreviousButton } from "./Buttons";
import { TransactionQueryResponse } from "./Transactions/transactionTypes";

const TransactionLine: FunctionComponent<{
  transactionDetails: TransactionQueryResponse;
  onClick: () => void;
  selected?: boolean;
}> = ({ transactionDetails, onClick, selected }) => {
  return (
    <button
      className={classnames(
        "focus:outline-none font-mono shadow w-full px-8 py-2 rounded-lg text-sm hover:border-primary-400 border-2 border-transparent space-x-8 flex justify-between bg-white",
        selected && "border-primary-400"
      )}
      onClick={onClick}
    >
      <span>{transactionDetails.instanceid}</span>
    </button>
  );
};

const Pager: FunctionComponent<{
  data: TransactionQueryResponse[];
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<TransactionQueryResponse | undefined>
  >;
  selectedTransaction: TransactionQueryResponse;
}> = ({ data, setSelectedTransaction, selectedTransaction }) => {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setMaxPage(Math.floor(data.length / 10));
  }, [data, page]);
  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };
  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="space-y-2">
      {data?.slice(10 * page, 10 * page + 10).map((v) => {
        return (
          <TransactionLine
            key={v.instanceid}
            transactionDetails={v}
            onClick={() => setSelectedTransaction(v)}
            selected={selectedTransaction === v}
          />
        );
      })}
      <div className="space-x-2 flex mt-4">
        <PreviousButton onClick={(e) => previousPage()} />
        <NextButton onClick={(e) => nextPage()} />
      </div>
    </div>
  );
};

const ProjectLine: FunctionComponent<{
  projectDetails: ProjectDetails;
  onClick: () => void;
  selected?: boolean;
}> = ({ projectDetails, onClick, selected }) => {
  return (
    <button
      className={classnames(
        "focus:outline-none shadow w-full px-8 py-2 rounded-lg text-xs hover:border-primary-400 border-2 border-transparent space-x-8 flex justify-between bg-white",
        selected && "border-primary-400"
      )}
      onClick={onClick}
    >
      <span>{projectDetails.project.name}</span>
    </button>
  );
};

export const ProjectsPager: FunctionComponent<{
  data: ProjectDetails[];
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectDetails | undefined>
  >;
  selectedProject: ProjectDetails;
}> = ({ data, setSelectedProject, selectedProject }) => {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    setMaxPage(Math.floor(data.length / 10));
  }, [data, page]);
  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };
  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="space-y-2">
      {data?.slice(10 * page, 10 * page + 10).map((v: any) => {
        return (
          <ProjectLine
            key={v.instanceid}
            projectDetails={v}
            onClick={() => setSelectedProject(v)}
            selected={selectedProject === v}
          />
        );
      })}
      <div className="space-x-2 flex mt-4">
        <PreviousButton onClick={(e) => previousPage()} />
        <NextButton onClick={(e) => nextPage()} />
      </div>
    </div>
  );
};
export default Pager;
