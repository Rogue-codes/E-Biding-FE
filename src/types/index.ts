/* eslint-disable @typescript-eslint/no-explicit-any */
export type NavLink = {
  label: string;
  link: string;
};

export type RowData = {
  date: string;
  name: string;
  email: string;
  status: string;
};

export type ClientType = {
  _id: string;
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  RcNumber: number;
  postalCode: number;
  fullName: string;
  emailAddress: string;
  file: string;
  isConfirmed: boolean;
  createdAt: string;
};
