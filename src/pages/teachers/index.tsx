import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FilePenLine, UserPlus, UserX } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import type { Teacher } from "./data";
import { useTeacherSheetActions } from "@/store/teacherSheet";
import { TeacherSheet } from "./teacher-sheet";
import { Button } from "@/ui/button";
import { useTeacher } from "@/hooks/teacher/useTeacher";

function createColumns(onEdit: (row: Teacher) => void, onDelete: (row: Teacher) => void): ColumnDef<Teacher>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => <span className="text-muted-foreground text-[12px]">{row.getValue("id")}</span>,
		},
		{
			accessorKey: "fullName",
			header: "F.I.Sh.",
			cell: ({ row }) => {
				const teacher = row.original;				
				return (
					<div className="flex items-center gap-2">
						{teacher.imgUrl ? (
							<img
								src={teacher.imgUrl}
								alt={teacher.fullName}
								className="w-7 h-7 rounded-full object-cover shrink-0"
							/>
						) : (
							<div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-[12px] shrink-0">
								{teacher.fullName.charAt(0).toUpperCase()}
							</div>
						)}
						<span className="font-medium text-[12px]">{teacher.fullName}</span>
					</div>
				);
			},
		},
		{
			accessorKey: "phoneNumber",
			header: "Telefon",
			cell: ({ row }) => <span className="text-muted-foreground text-[12px]">{row.getValue("phoneNumber")}</span>,
		},
		{
			accessorKey: "lavozim",
			header: "Lavozim",
			cell: ({ row }) => (
				<span className="inline-flex items-center bg-green-50 text-green-700 text-[11px] font-medium px-2 py-0.5 rounded-full">
					{row.getValue("lavozim")}
				</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-center text-[12px]">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer"
					>
						<FilePenLine className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original)}>
						<button
							type="button"
							className="inline-flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer"
						>
							<UserX className="size-3" />
							O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];
}

export default function Teachers() {
	const { open } = useTeacherSheetActions();
	const navigate = useNavigate();
	const { data: response, isLoading } = useTeacher();
	const data = response?.data;

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(row) => console.log("O'chirish:", row),
			),
		[open],
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<span className="text-[13px] font-semibold text-foreground">O'qituvchilar soni:</span>
					<span className="bg-green-100 text-green-700 text-[12px] font-bold px-2 py-0.5 rounded-full">
						{data?.totalElements ?? 0}
					</span>
				</div>
				<Button
					size="sm"
					className="h-8 gap-1 text-[12px] bg-green-600 hover:bg-green-700 text-white"
					onClick={() => open()}
				>
					<UserPlus className="size-3.5" />
					O'qituvchi qo'shish
				</Button>
			</div>

			<DataTable
				columns={columns}
				data={data?.body ?? []}
				isLoading={isLoading}
				onRowClick={(row) => navigate(`/teachers/${row.id}`)}
			/>

			<TeacherSheet />
		</div>
	);
}