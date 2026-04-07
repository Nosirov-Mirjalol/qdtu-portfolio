import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { ResearchModal } from "@/pages/teachers/detail/detail-modals/research-modal";
import { ResearchesTab } from "@/pages/teachers/detail/detail-tabs/researches-tab";
import { useUser } from "@/hooks/user/useUser";
import { useResearch } from "@/hooks/teacher/useResearch";
import { Loader2, Sparkles } from "lucide-react";

export default function TeacherResearches() {
  const { open } = useModalActions();
  const [search, setSearch] = useState("");
  const { data: teacher } = useUser();
  const { data: researchData, isLoading: researchLoading } = useResearch(teacher?.id);

  if (researchLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <Loader2 className="size-12 text-primary animate-spin" />
          <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse rounded-full" />
        </div>
        <p className="text-muted-foreground animate-pulse text-sm font-semibold tracking-wide uppercase">
          Tizim yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6 p-1">
      {/* Orqa fon uchun dekorativ element (Antiqa ko'rinish berish uchun) */}
      <div className="absolute -top-10 -right-10 size-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 size-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toolbar qismi */}
      <div className="relative z-10">
        <TableToolbar
          countLabel="Tadqiqotlar"
          count={researchData?.data.totalElements}
          searchValue={search}
          onSearchChange={setSearch}
          addLabel={
            <span className="flex items-center gap-2">
              <Sparkles className="size-4" /> Tadqiqot qo'shish
            </span>
          }
          onAdd={() => open({ _type: "research" })}
        />
      </div>

      {/* Asosiy Jadval Konteyneri */}
      <div className="group relative z-10 overflow-hidden rounded-[24px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        
        {/* Yuqoridagi gradient chiziq */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-70" />

        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="p-4 sm:p-8">
             {/* Agar ma'lumot bo'lsa Tab, bo'lmasa Empty State qo'yishni maslahat beraman */}
             {researchData?.data.body.length > 0 ? (
                <ResearchesTab data={researchData?.data.body} />
             ) : (
                <div className="py-20 text-center flex flex-col items-center opacity-50">
                   <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Sparkles className="size-8" />
                   </div>
                   <p className="text-lg font-medium">Hozircha hech qanday tadqiqot yo'q</p>
                   <p className="text-sm">Yangi tadqiqot qo'shish uchun tugmani bosing</p>
                </div>
             )}
          </div>
        </div>
      </div>

      <ResearchModal userId={teacher?.id} />
    </div>
  );
}