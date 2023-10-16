/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import Tr from "./Tr";
import { ClientType } from "../../types";

interface TableProps{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setModalData: React.Dispatch<React.SetStateAction<ClientType | null>>
}

export default function Table({setShowModal,setModalData}:TableProps) {
  const headerArr = [
    "Date created",
    `User's name`,
    `User's email`,
    `Status`,
    `Action`,
  ];

  const clients = useSelector((state:any)=>state.client.clients)
  return (
    <table className="w-full mt-5 overflow-y-scroll">
      <thead className=" border-t border-b border-[#DADBF2]">
        <tr className="">
          {headerArr.map((head, index) => (
            <th
              key={index}
              className="text-sm !py-4 font-medium leading-6 text-[#142633]"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {clients?.map((data:ClientType, index:number) => (
          <Tr key={index} rowdata={data} setShowModal={setShowModal} setModalData={setModalData} />
        ))}
      </tbody>
    </table>
  );
}
