import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { MukofotModal } from "@/pages/teachers/detail/detail-modals/mukofot-modal";
import { MukofotlarTab } from "@/pages/teachers/detail/detail-tabs/mukofotlar-tab"
import { useUser } from "@/hooks/user/useUser";
import { useAward } from "@/hooks/teacher/useMukofot";

export default function TeacherAwards() {
	const { open } = useModalActions();
	const [search, setSearch] = useState("");
	const {data:teacher,isLoading:userLoading}=useUser()
	const {data , isLoading:mukofotLoading}=useAward(teacher?.id)
	
	if(userLoading || mukofotLoading){
		return <div>Ma'lumotlar yuklanmoqda</div>
	}

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Mukofotlar"
				count={data?.data.totalElements}
				searchValue={search}
				onSearchChange={setSearch}
				addLabel="Mukofot qo'shish"
				onAdd={() => open({ _type: "mukofot" })}
			/>
			<div className="rounded-xl border bg-card overflow-x-auto">
				<div className="p-3 sm:p-5">
					<MukofotlarTab isLoading={mukofotLoading} page={data?.data.page} userId={teacher?.id} data={data?.data.body} />
				</div>
			</div>
			<MukofotModal userId={teacher?.id} />
		</div>
	);
}
