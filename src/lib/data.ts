import { FcApproval, FcCancel } from "react-icons/fc";
import { IDriver } from "@/types/driver";
import { IRute } from "@/types/rute";
import { IUser } from "@/types/user";

export const statuses = [
  {
    value: "done",
    label: "Active",
    icon: FcApproval,
  },
  {
    value: "canceled",
    label: "Non Active",
    icon: FcCancel,
  },
];


export const EmptyRute: IRute = {
  color: "",
  id: "",
  kode: "",
  name: "",
  locations : [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const EmptyUser: IUser = {
  name: "",
  email: "",
  id: "",
  password: "",
  role: "driver",
  status: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const EmptyDriver: IDriver = {
  alamat: "",
  fotoKtp: "",
  fotoMobil: "",
  id: "",
  maxPenumpang: 10,
  namaLengkap: "",
  nik: "",
  noHp: "",
  nokk: "",
  noPlatMobil: "",
  status: "",
  user: {
    name: "",
    email: "",
    createdAt: new Date(),
    id: "",
    // password: "",
    role: "driver",
    updatedAt: new Date(),
  },
};
