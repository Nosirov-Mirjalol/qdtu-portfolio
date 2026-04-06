import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { MaslahatModal } from "@/pages/teachers/detail/detail-modals/maslahat-modal";
import { MaslahatTab } from "@/pages/teachers/detail/detail-tabs/maslahat-tab";
import { useUser } from "@/hooks/user/useUser";
import { useMaslahat } from "@/hooks/teacher/useMaslahat";

export default function TeacherConsultations() {
	const { open } = useModalActions();
	const [search, setSearch] = useState("");
	const { data: teacher, isLoading: userLoading } = useUser();
	const { data, isLoading: maslahatLoading } = useMaslahat(teacher?.id);

	if (userLoading || maslahatLoading) {
		return <div>Ma'lumotlar yuklanmoqda</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Maslahatlar"
				count={data?.data.totalElements}
				searchValue={search}
				onSearchChange={setSearch}
				addLabel="Maslahat qo'shish"
				onAdd={() => open({ _type: "maslahat" })}
			/>
			<div className="rounded-xl border bg-card overflow-x-auto">
				<div className="p-3 sm:p-5">
					<MaslahatTab isLoading={maslahatLoading} page={data?.data.page} userId={teacher?.id} data={data?.data.body} />
				</div>
			</div>
			<MaslahatModal userId={teacher?.id} />
		</div>
	);
}