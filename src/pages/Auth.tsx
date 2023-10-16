/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LiaUserCircle } from "react-icons/lia";
import { AiFillLock } from "react-icons/ai";
import ApiFetcher from "../utils/Api";
import { loginAuth } from "../utils/auth";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../store/reducers/AuthSlice";
export default function Auth() {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  console.log(adminDetails);

  const dispatch = useDispatch();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await ApiFetcher.post("/admin/login", {
        username: adminDetails.username,
        password: adminDetails.password,
      });
      setIsLoading(false);
      dispatch(loginAdmin(res?.data?.data));
      toast.success(res?.data?.message);
      loginAuth(res?.data?.token);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[36rem] border-2 rounded-xl p-12 shadow-[0px_0px_24px_0px_rgba(0,0,0,0.05)]">
        <p className="border-b-2 text-primary-1 w-32 text-lg font-semibold border-primary-1 flex justify-start items-center pb-1">
          Admin Login
        </p>
        <form className="mt-11" onSubmit={(e) => handleLogin(e)}>
          <div className="w-full relative">
            <label htmlFor="" className="text-md font-medium text-primary-2">
              Username
            </label>
            <input
              type="text"
              className="w-full h-10 focus:outline-none leading-6 text-primary-2 border border-primary-1 px-8 rounded-lg bg-white placeholder:pl-3"
              name=""
              id=""
              value={adminDetails.username}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, username: e.target.value })
              }
              placeholder="Username"
            />
            <LiaUserCircle className="absolute left-2 top-9 !text-primary-1" />
          </div>

          <div className="mt-4 relative w-full">
            <label htmlFor="" className="text-md font-medium text-primary-2">
              Password
            </label>
            <input
              type="password"
              className="w-full h-10 focus:outline-none leading-6 text-primary-2 border border-primary-1 px-8 rounded-lg bg-white placeholder:pl-3"
              name=""
              id=""
              value={adminDetails.password}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, password: e.target.value })
              }
              placeholder="Password"
            />
            <AiFillLock className="absolute left-2 top-9 !text-primary-1" />
          </div>

          <button
            type="submit"
            disabled={!adminDetails.username || !adminDetails.password}
            className="w-full px-4 py-3 bg-primary-1 flex justify-center items-center rounded-lg text-white leading-6 uppercase mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : "login"}
          </button>
        </form>
      </div>
    </div>
  );
}
