import { cn } from "@/utils";
import { Award, ChevronRight, FileText, FlaskConical, TrendingUp, Users } from "lucide-react";
import { Skeleton } from "@/ui/skeleton";
import type { TeacherStatsData } from "@/features/teacher/teacher.type";

// ─── StatsCard ─────────────────────────────────────────────────────────────────
type StatsCardProps = {
 icon: React.ReactNode;
 label: string;
 value: number;
 sub: string;
 accent: string;
 isLoading?: boolean;
};

function StatsCard({ icon, label, value, sub, accent, isLoading }: StatsCardProps) {
 return (
  <div
   className={cn(
    "relative overflow-hidden rounded-xl border bg-card p-4 flex flex-col gap-3",
    "hover:shadow-md transition-shadow duration-200",
   )}
  >
   <div className={cn("absolute top-0 left-0 right-0 h-0.5", accent)} />
   <div className="flex items-center justify-between">
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted flex items-center justify-center">
     <div className="text-muted-foreground">{icon}</div>
    </div>
    <ChevronRight className="size-4 text-muted-foreground opacity-40" />
   </div>
   <div>
    {isLoading ? (
     <Skeleton className="h-7 w-12 mb-1" />
    ) : (
     <p className="text-xl sm:text-2xl font-bold tracking-tight">{value}</p>
    )}
    <p className="text-[11px] sm:text-[12px] text-muted-foreground font-medium">{label}</p>
   </div>
   <p className="text-[11px] text-muted-foreground border-t pt-2 truncate">{sub}</p>
  </div>
 );
}

// ─── StatsGrid ─────────────────────────────────────────────────────────────────
type StatsGridProps = {
 data: TeacherStatsData | undefined;
 isLoading?: boolean;
};

export function StatsGrid({ data, isLoading }: StatsGridProps) {
 return (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
   <StatsCard
    icon={<FlaskConical className="size-4" />}
    label="Tadqiqotlar"
    value={data?.tadqiqotlar ?? 0}
    sub={`${data?.maqolalar ?? 0} maqola`}
    accent="bg-blue-500"
    isLoading={isLoading}
   />
   <StatsCard
    icon={<FileText className="size-4" />}
    label="Nashrlar"
    value={data?.nashrlar ?? 0}
    sub={`${data?.kitoblar ?? 0} kitob`}
    accent="bg-emerald-500"
    isLoading={isLoading}
   />
   <StatsCard
    icon={<Users className="size-4" />}
    label="Nazoratlar"
    value={data?.nazorat ?? 0}
    sub={`${data?.maslahatlar ?? 0} maslahat`}
    accent="bg-violet-500"
    isLoading={isLoading}
   />
   <StatsCard
    icon={<TrendingUp className="size-4" />}
    label="Maslahatlar"
    value={data?.maslahatlar ?? 0}
    sub={`${data?.treninglar ?? 0} trening`}
    accent="bg-amber-500"
    isLoading={isLoading}
   />
   <StatsCard
    icon={<Award className="size-4" />}
    label="Mukofotlar"
    value={data?.mukofotlar ?? 0}
    sub="Respublika va xalqaro"
    accent="bg-rose-500"
    isLoading={isLoading}
   />
  </div>
 );
}
