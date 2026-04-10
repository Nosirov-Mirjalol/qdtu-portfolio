import { Eye, Pencil, Trash2 } from "lucide-react";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import type { ColumnDef } from "@/components/data-table/data-table";
import { DataTable } from "@/components/data-table/data-table";
import { TruncatedText } from "@/components/tooltip/truncated-text";
import { useDeleteMukofot } from "@/hooks/teacher/useDeleteMukofot";
import { useModalActions } from "@/store/modalStore";
import { Badge } from "@/ui/badge";

export type AwardType =
	| "Trening_Va_Amaliyot"
	| "Tahririyat_Kengashiga_Azolik"
	| "Maxsus_Kengash_Azoligi"
	| "Patent_Dgu"
	| "Davlat_Mukofoti";

export type MemberType = "MILLIY" | "XALQARO";

export type Mukofot = {
	id: number;
	name: string;
	description: string;
	year: number;
	fileUrl: string;
	userId: number;
	awardEnum: AwardType;
	memberEnum: MemberType;
};

const AWARD_LABELS: Record<AwardType, string> = {
	Trening_Va_Amaliyot: "Trening va amaliyot",
	Tahririyat_Kengashiga_Azolik: "Tahririyat kengashi",
	Maxsus_Kengash_Azoligi: "Maxsus kengash",
	Patent_Dgu: "Patent (DGU)",
	Davlat_Mukofoti: "Davlat mukofoti",
};

const STYLE_MAP: Record<string, string> = {
	XALQARO:
		"bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/40",

	MILLIY:
		"bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 dark:hover:bg-amber-900/40",

	Trening_Va_Amaliyot:
		"bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-50 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800 dark:hover:bg-violet-900/40",

	Tahririyat_Kengashiga_Azolik:
		"bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800 dark:hover:bg-teal-900/40",

	Maxsus_Kengash_Azoligi:
		"bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800 dark:hover:bg-indigo-900/40",

	Patent_Dgu:
		"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/40",

	Davlat_Mukofoti:
		"bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800 dark:hover:bg-rose-900/40",
};
type mukofotTabProps = {
	data: Mukofot[];
	userId: number;
	page: number;
	totalPage: number;
	onPageChange: (page: number) => void;
	isLoading: boolean;
};

export function MukofotlarTab({ data, page, totalPage, onPageChange, isLoading }: mukofotTabProps) {
	const { open } = useModalActions();
	const { mutate: deleteMukofot } = useDeleteMukofot();

	const columns: ColumnDef<Mukofot>[] = [
		{
			accessorKey: "name",
			header: "Mukofot nomi",
			cell: ({ row }) => <span className="font-medium text-[13px]">{row.original.name}</span>,
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => <TruncatedText text={row.original.description} />,
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.original.year}</span>,
		},
		{
			accessorKey: "awardEnum",
			header: "Tur",
			cell: ({ row }) => {
				const val = row.original.awardEnum;
				return (
					<Badge className={STYLE_MAP[val]} variant="outline">
						{AWARD_LABELS[val]}
					</Badge>
				);
			},
		},
		{
			accessorKey: "memberEnum",
			header: "A'zolik",
			cell: ({ row }) => {
				const val = row.original.memberEnum;
				return (
					<Badge className={STYLE_MAP[val]} variant="outline">
						{val}
					</Badge>
				);
			},
		},
		{
			accessorKey: "fileUrl",
			header: "Fayl",
			cell: ({ row }) => {
				const fileUrl = row.original.fileUrl;
				if (!fileUrl) return <span className="text-[12px] text-muted-foreground">—</span>;
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
				<div
					className="flex items-center justify-center gap-2"
					role="button"
					tabIndex={0}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.stopPropagation();
						}
					}}
				>
					<button
						type="button"
						onClick={() => open({ _type: "mukofot", ...row.original })}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-900 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" /> Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => deleteMukofot(row.original.id)}>
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

	return <DataTable columns={columns} data={data} />;
}
