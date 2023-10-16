/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import DateSelect from "../datepicker/Selectdate";
import ApiFetcher from "../../utils/Api";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../store/reducers/clientSlice";
import Loader from "../loader";

interface HeaderProps{
  setHandleFilter: React.Dispatch<React.SetStateAction<boolean>>
  handleFilter: boolean
}
export default function Header({setHandleFilter,handleFilter}:HeaderProps) {
  const location = useLocation();

  console.log(location.pathname);
  const page = location.pathname.startsWith("/")
    ? location.pathname.split("/")[1]
    : location.pathname;

  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(new Date());

  const [searchVal, setSearchVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  async function searchClient() {
    setLoading(true);
    try {
      const res = await ApiFetcher.get(
        `/admin/clients/all?search=${searchVal.trim()}`
      );
      setLoading(false);
      dispatch(getAllClients(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }

 

  return (
    <div className="">
      <div className="w-full py-4 px-6 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary-2">
          {page.replace("-", " ").toUpperCase()}
        </p>
        <button className="p-2 rounded-lg border border-[#505173]">
          Admin_2020
        </button>
      </div>
      <div className="w-[70%] pl-6 mt-8 flex justify-center items-center">
        <input
          type="text"
          className="px-4 py-3 w-[90%] rounded-tl-lg rounded-bl-lg border border-[#DADBF2] focus:outline-none placeholder:text-[#8787A8]"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          name=""
          id=""
        />
        <button
          className="w-[10%] bg-primary-1 rounded-tr-lg rounded-br-lg  p-4 flex justify-center items-center"
          onClick={searchClient}
        >
          {loading ? <Loader /> : <BiSearch color="white" size={18} />}
        </button>
      </div>

      <div className="w-full px-6 flex justify-between items-center py-5 mt-5 ">
        <div className="flex justify-start items-center gap-3">
          <div className="border w-32 cursor-pointer rounded-lg border-[#DADBF2] ">
            <DateSelect
              placeholderText="from date"
              onChange={(date) => {
                setFromDate(date);
              }}
              selected={fromDate}
            />
          </div>
          -
          <div className="border w-32 cursor-pointer rounded-lg border-[#DADBF2] ">
            <DateSelect
              placeholderText="to date"
              selected={toDate}
              onChange={(date) => {
                setToDate(date);
              }}
            />
          </div>
          <button className="px-2 py-2 rounded-lg bg-primary-1 text-white">
            Apply filter
          </button>
        </div>

        <div className="flex justify-start gap-3 items-center">
          <div
            className="w-4 h-4 rounded-full border-2 border-primary-1 cursor-pointer flex justify-center items-center"
            onClick={() => setHandleFilter(!handleFilter)}
          >
            {handleFilter && <div className="w-2 h-2 bg-primary-1 rounded-full"></div>}
          </div>
          <p className="text-[#141533] text-sm font-medium">
            Filter only approval requests
          </p>
        </div>
      </div>
    </div>
  );
}
