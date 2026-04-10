import { Eye, Pencil, Trash2 } from "lucide-react";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import type { ColumnDef } from "@/components/data-table/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { TruncatedText } from "@/components/tooltip/truncated-text";
import { useDeleteResearch } from "@/hooks/teacher/useDeleteResearch";
import { useModalActions } from "@/store/modalStore";
import { Badge } from "@/ui/badge";

export type Research = {
	id: number;
	name: string;
	description: string;
	year: string;
	organization: string;
	memberEnum: "MILLIY" | "XALQARO";
	finished: boolean;
	pdfName: string | null;
};

type ResearchesTabProps = {
	data: Research[];
	userId: number;
	page: number;
	totalPage: number;
	onPageChange: (page: number) => void;
	isLoading: boolean;
};

export function ResearchesTab({ data, page, totalPage, onPageChange, isLoading }: ResearchesTabProps) {
	const { open } = useModalActions();
	const { mutate: deleteResearch } = useDeleteResearch();

	const columns: ColumnDef<Research>[] = [
		{
			accessorKey: "name",
			header: "Tadqiqot nomi",
			cell: ({ row }) => <span className="font-medium text-[13px]">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => (
				<TruncatedText
					text={row.getValue("description")}
					maxLength={50}
					tooltipClassName="text-foreground text-center bg-background shadow"
				/>
			),
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.getValue("year")}</span>,
		},
		{
			accessorKey: "finished",
			header: "Holati",
			cell: ({ row }) => {
				const status = row.getValue("finished") as Research["finished"] | null | undefined;
				if (status === null || status === undefined)
					return <span className="text-[12px] text-muted-foreground">—</span>;
				return (
					<Badge
						className={
							status === true
								? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800"
								: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800"
						}
						variant="outline"
					>
						{status === true ? "TUGALLANGAN" : "JARAYONDA"}
					</Badge>
				);
			},
		},
		{
			accessorKey: "memberEnum",
			header: "A'zolik turi",
			cell: ({ row }) => {
				const type = row.getValue("memberEnum") as Research["memberEnum"] | null | undefined;
				if (!type) return <span className="text-[12px] text-muted-foreground">—</span>;
				return (
					<Badge
						className={
							type === "XALQARO"
								? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
								: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800"
						}
						variant="outline"
					>
						{type}
					</Badge>
				);
			},
		},
		{
			accessorKey: "pdfName",
			header: "PDF",
			cell: ({ row }) => {
				const pdfName = row.getValue("pdfName") as string | null;
				if (!pdfName) return <span className="text-[12px] text-muted-foreground">—</span>;
				return (
					<button
						type="button"
						className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Eye className="size-3" /> Ko'rish
					</button>
				);
			},
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => open({ _type: "research", ...row.original })}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-900 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" /> Tahrirlash
					</button>

					<ConfirmPopover onConfirm={() => deleteResearch(Number(row.original.id))}>
						<button
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
						>
							<Trash2 className="size-3" /> O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];

	return (
		<DataTable
			columns={columns}
			data={data}
			page={page}
			totalPage={totalPage}
			onPageChange={onPageChange}
			isLoading={isLoading}
		/>
	);
}
