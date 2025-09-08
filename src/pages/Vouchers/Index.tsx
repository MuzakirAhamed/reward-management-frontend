import { Button } from "@/components/ui/button"
import { useFetchVouchers } from "@/hooks/useFetchVouchers";
import { DataTable } from "@/vouchers/data-table";
import { columns } from "@/vouchers/columns";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";

const Index = () => {
  const {data, isPending} = useFetchVouchers();
  if (isPending) {
    return <Loader />
  }
  
  return (
    <div className="my-10 mx-6">
      <div className="flex justify-between space-y-2">
        <p className="font-bold text-2xl">Vouchers</p>
        <Link to="/vouchers/create"><Button className="cursor-pointer">Add Vouchers +</Button></Link>
      </div>
       <div className="mt-10">
         <DataTable columns={columns} data={data} filters={["name"]} />
       </div>
    </div>
  )
}

export default Index
