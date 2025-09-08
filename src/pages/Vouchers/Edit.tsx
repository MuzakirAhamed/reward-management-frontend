import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Link, useParams } from "react-router-dom"
import type { VoucherFormValues } from "@/type/Voucher"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useFetchVoucher } from "@/hooks/useFetchVoucher"
import { useUpdateVoucher } from "@/hooks/useUpdateVoucher"
import Loader from "@/components/Loader"

const schema = yup.object({
    name: yup.string().required("Voucher name is required"),
    code: yup.string().required("Voucher code is required"),
    description: yup.string().required("Voucher description is required"),
    expiry_date: yup.date().required("Expiry date is required"),
    currency: yup.string().required("Currency is required"),
}).required();
const Edit = () => {
    const { id } = useParams();

    const { data, isPending } = useFetchVoucher(id!);
    console.log(data)
    const form = useForm<VoucherFormValues>({
        resolver: yupResolver(schema),
    })
    const { mutate } = useUpdateVoucher(id!)

    const onSubmit = (data: VoucherFormValues) => {
        const payload = {
            ...data,
            expiry_date: data.expiry_date?.toISOString().slice(0, 19).replace("T", " "),
        }
        mutate(payload)
    }
    if (isPending) {
        return <Loader/>
    }
    return (
        <div className="m-10">
            <p className="font-bold text-2xl">Edit Voucher</p>
            <div className="mt-6 rounded-md border p-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <FormField
                                control={form.control}
                                name="name"
                                defaultValue={data?.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Voucher Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="voucher name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                defaultValue={data?.code}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Voucher Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="voucher code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currency"
                                defaultValue={data?.currency}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the currency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="EUR">EUR</SelectItem>
                                                <SelectItem value="GBP">GBP</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiry_date"
                                defaultValue={data?.expiry_date ? new Date(data.expiry_date) : undefined}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Expiry Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                defaultValue={data?.description}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Voucher Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Voucher description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button type="submit">Submit</Button>
                            <Link to="/vouchers"><Button variant="secondary" type="button">Cancel</Button></Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Edit
