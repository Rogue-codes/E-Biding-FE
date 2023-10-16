/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import { ClientType } from "../../types";
import ApiFetcher from "../../utils/Api";
import toast from "react-hot-toast";
import Loader from "../loader";

interface TRProps {
  rowdata: ClientType;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<ClientType | null>>;
}
export default function Tr({ rowdata, setShowModal, setModalData }: TRProps) {
  function handleShowModal(data: ClientType) {
    setShowModal(true);
    setModalData(data);
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [rejectloading, setRejectLoading] = useState<boolean>(false);
  async function confirmClient(id: string) {
    setLoading(true);
    try {
      const res = await ApiFetcher.patch(`/admin/client-confirmation/${id}`);
      setLoading(false);
      toast.success(res?.data?.message);
    } catch (error) {
      setLoading(false);
    }
  }

  async function rejectClient(id: string) {
    setRejectLoading(true);
    try {
      const res = await ApiFetcher.delete(`/admin/client-rejection/${id}`);
      setRejectLoading(false);
      toast.success(res?.data?.message);
    } catch (error) {
      setRejectLoading(false);
    }
  }
  return (
    <tr className="text-sm !h-16 text-[#142633] text-center">
      <td>{rowdata?.createdAt}</td>
      <td>{rowdata.companyName}</td>
      <td>{rowdata.emailAddress}</td>
      <td className="font-semibold text-[#142633] text-sm">
        {rowdata.isConfirmed ? "Approved" : "Pending"}
      </td>
      <div>
        {!rowdata.isConfirmed ? (
          <div className="flex justify-center !h-16 gap-4 !items-center">
            <button
              className="py-1 px-3 text-white font-medium text-sm  bg-[#47C96B] rounded"
              onClick={() => confirmClient(rowdata?._id)}
            >
              {loading ? "Loading..." : "Approve"}
            </button>
            <button
              className="py-1 px-3 text-white font-medium text-sm  bg-[#D93333] rounded"
              onClick={() => rejectClient(rowdata?._id)}
            >
              {rejectloading ? "Loading..." : "Reject"}
            </button>
            <button
              className="py-1 px-3 text-[#3E4095] font-medium text-sm border border-[#3E4095] rounded"
              onClick={() => handleShowModal(rowdata)}
            >
              View
            </button>
          </div>
        ) : (
          <div className="!h-16 flex justify-end items-center pr-8">
            <button
              className="py-1 px-3 text-[#3E4095] font-medium text-sm border border-[#3E4095] rounded"
              onClick={() => handleShowModal(rowdata)}
            >
              View
            </button>
          </div>
        )}
      </div>
    </tr>
  );
}
