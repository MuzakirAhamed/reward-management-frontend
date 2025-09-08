import { useFechVoucherTracks } from "@/hooks/useFechVoucherTracks";
import { DataTable } from "@/vouchers/data-table"
import { columns } from "./columns";
import Loader from "@/components/Loader";

const VoucherTracks = () => {
  const { data, isPending } = useFechVoucherTracks();
  if (isPending) {
    return <Loader />
  }
  return (
    <div className="my-10 mx-6">
      <div className="flex justify-between space-y-2">
        <p className="font-bold text-2xl">Vouchers Tracking</p>
      </div>
      <div className="mt-10">
        <DataTable columns={columns} data={data} filters={["voucherName", "userEmail"]} />
      </div>
    </div>
  )
}

export default VoucherTracks
