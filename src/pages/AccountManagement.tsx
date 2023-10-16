/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Table from "../components/table/Table";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import ApiFetcher from "../utils/Api";
import { ClientType } from "../types";
import Loader from "../components/loader";
import { useDispatch } from "react-redux";
import { getAllClients } from "../store/reducers/clientSlice";
import ModalBackdrop from "../widgets/modals/ModalBackdrop";
import { AiOutlineUser } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

export default function AccountManagement() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [clients, setClients] = useState<ClientType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState<number | null>(null);
  const [handleFilter, setHandleFilter] = useState<boolean>(false);

  const filt = `?filter=${true}`;

  console.log(filt);

  const dispatch = useDispatch();
  const getClients = async () => {
    setLoading(true);
    try {
      const res = await ApiFetcher.get(
        `/admin/clients/all${handleFilter ? filt : ""}`
      );
      setLoading(false);
      setClients(res?.data?.data);
      dispatch(getAllClients(res?.data?.data));
      setPerPage(res?.data?.meta.per_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [handleFilter]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ClientType | null>(null);

  const downloadFile = async (id: string | undefined) => {
    try {
      const res = await ApiFetcher.get(`/admin/file/download/${id}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file.pdf";
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
      ref={scrollRef}
      className="w-[80%] left-[20%] h-[95vh] overflow-y-scroll fixed top-0"
    >
      <Header handleFilter={handleFilter} setHandleFilter={setHandleFilter} />
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <>
          <Table setShowModal={setShowModal} setModalData={setModalData} />

          <hr />
          {perPage && clients && clients?.length > perPage && (
            <div className="w-full flex justify-center gap-4 items-center my-5">
              <div className="h-8 w-8 border flex justify-center items-center rounded border-[#DADBF2]">
                <BiChevronsLeft />
              </div>
              <div className="h-8 w-8 border flex justify-center items-center rounded border-[#DADBF2]">
                <BiChevronLeft />
              </div>
              <div className="h-8 w-8 border flex justify-center items-center rounded border-[#DADBF2]">
                1
              </div>
              <p>of 54</p>
              <div className="h-8 w-8 border flex justify-center items-center rounded border-[#DADBF2]">
                <BiChevronRight />
              </div>
              <div className="h-8 w-8 border flex justify-center items-center rounded border-[#DADBF2]">
                <BiChevronsRight />
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <ModalBackdrop>
          <motion.div
            initial={{ y: "-10%" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ y: "0%" }}
            ref={scrollRef}
            className="w-[40%] py-12 bg-white z-10 rounded-xl relative"
          >
            <LiaTimesSolid
              className="absolute right-4 top-8 text-primary-2 hover:scale-105 cursor-pointer transition-all"
              size={30}
              onClick={() => setShowModal(false)}
            />
            <div className="w-40 h-40 flex justify-center items-center mx-auto rounded-full bg-[#DADBF2]">
              <AiOutlineUser size={70} color="#505173" />
            </div>

            <div className="px-8 mt-12">
              <div>
                <p className="text-sm font-medium text-primary-2 leading-6">
                  Full Name
                </p>
                <h3 className=" text-md font-normal text-primary-2 leading-6">
                  {modalData?.fullName}
                </h3>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-primary-2 leading-6">
                  Company Name
                </p>
                <h3 className=" text-md font-normal text-primary-2 leading-6">
                  {modalData?.companyName}
                </h3>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-primary-2 leading-6">
                  Company Address
                </p>
                <h3 className=" text-md font-normal text-primary-2 leading-6">
                  {modalData?.companyAddress}
                </h3>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-primary-2 leading-6">
                  Email Address
                </p>
                <h3 className=" text-md font-normal text-primary-2 leading-6">
                  {modalData?.emailAddress}
                </h3>
              </div>

              <div className="flex mt-4 justify-start items-center gap-6">
                <div>
                  <p className="text-sm font-medium text-primary-2 leading-6">
                    Phone Number
                  </p>
                  <h3 className="text-md leading-6 text-primary-2">
                    {modalData?.phoneNumber}
                  </h3>
                </div>

                <div>
                  <p className="text-sm font-medium text-primary-2 leading-6">
                    Alternate Phone Number
                  </p>
                  <h3 className="text-md leading-6 text-primary-2">
                    {modalData?.alternatePhoneNumber}
                  </h3>
                </div>
              </div>

              <div className="flex mt-4 justify-start items-center gap-6">
                <div>
                  <p className="text-sm font-medium text-primary-2 leading-6">
                    RC Number
                  </p>
                  <h3 className="text-md leading-6 text-primary-2">
                    {modalData?.RcNumber}
                  </h3>
                </div>

                <div>
                  <p className="text-sm font-medium text-primary-2 leading-6">
                    Postal code
                  </p>
                  <h3 className="text-md leading-6 text-primary-2">
                    {modalData?.postalCode}
                  </h3>
                </div>
              </div>

              <div className="w-full px-4 py-2 rounded-lg border flex justify-between items-center border-[#DADBF2] mt-11">
                <p>{modalData?.companyName}.pdf</p>
                <button
                  className="px-3 py-2 rounded-lg bg-primary-1 text-white text-xs"
                  onClick={() => downloadFile(modalData?._id)}
                >
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </ModalBackdrop>
      )}
    </motion.div>
  );
}
