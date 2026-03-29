import { ChevronRight, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { useModalActions } from "@/store/modalStore";
import { NashrModal } from "./detail-modals/nashr-modal";
import { PublicationModal } from "./detail-modals/publication-modal";
import { ResearchModal } from "./detail-modals/research-modal";
import { MaslahatModal } from "./detail-modals/maslahat-modal";
import type { ProfileFormData } from "./detail-profile/profile-edit";
import { ProfileForm } from "./detail-profile/profile-form";
import { ProfileSidebar } from "./detail-profile/profile-sidebar";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/ui/button";
import { StatsGrid } from "./stats-grid";
import { useGetTeacherStats } from "@/hooks/teacher/useGetTeacherStats";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { ActivityTabs } from "./activity-tabs";

const ADD_LABELS: Record<string, string> = {
  researches: "Tadqiqot qo'shish",
  publications: "Nazorat qo'shish",
  supervision: "Nashr qo'shish",
  activities: "Maslahat qo'shish",
  awards: "Mukofot qo'shish",
};

const MODAL_TYPES: Record<string, string> = {
  researches: "research",
  publications: "nazorat",
  supervision: "nashr",
  activities: "maslahat",
  awards: "mukofot",
};

const COUNT_LABELS: Record<string, string> = {
  researches: "Tadqiqotlar",
  publications: "Nazoratlar",
  supervision: "Nashrlar",
  activities: "Maslahatlar",
  awards: "Mukofotlar",
};

export default function TeacherDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useModalActions();
	
  // Teacher ma'lumotlarini olish
  const teacher = (location.state as { teacher?: TeacherProfile } | null)?.teacher ?? null;
	const {data:statsData,isLoading:statsLoading}=useGetTeacherStats(teacher?.id)
	
  useEffect(() => {
    if (teacher) {
      document.title = `QDTU | ${teacher.fullName}`;
    }
  }, [teacher]);

  const [activeTab, setActiveTab] = useState("researches");
  
  // Pagination states
  const [researchPage, setResearchPage] = useState(0);
  const [nazoratPage, setNazoratPage] = useState(0);
  const [nashrlarPage, setNashrlarPage] = useState(0);
  const [maslahatlarPage, setMaslahatlarPage] = useState(0);

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <EmptyState
          title="O'qituvchi topilmadi"
          description="Ro'yxatga qaytib, o'qituvchini tanlang"
          icon={<GraduationCap className="size-5 text-muted-foreground" />}
        />
        <Button variant="outline" size="sm" onClick={() => navigate("/teachers")}>
          Ro'yxatga qaytish
        </Button>
      </div>
    );
  }

  const profile: ProfileFormData = {
    fullName: teacher.fullName,
    email: teacher.email ?? "",
    age: teacher.age ? String(teacher.age) : "",
    phone: teacher.phoneNumber,
    department: teacher.departmentName,
    position: teacher.lavozim,
    bio: "",
    additionalInfo: "",
    specialty: teacher.profession ?? "",
    orcId: "",
    scopusId: "",
    scienceId: "",
    researcherId: "",
    image: null,
    resume: null,
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <button 
          type="button" 
          onClick={() => navigate("/teachers")} 
          className="hover:text-foreground transition-colors"
        >
          O'qituvchilar
        </button>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium truncate max-w-[160px] sm:max-w-[300px]">
          {teacher.fullName}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
        <ProfileSidebar profile={profile} imgUrl={teacher.imgUrl} />
        <div className="w-full lg:flex-1 min-w-0">
          <ProfileForm defaultValues={profile} />
        </div>
      </div>
      <TableToolbar addLabel="qo'shish" countLabel="Tadqiqotlar" count={2} searchValue=""onSearchChange={()=>{}} showSearch={false} onAdd={()=>{}}  />
      <ActivityTabs />
		<StatsGrid data={statsData} isLoading={statsLoading} />
      {/* Modallar */}
      <ResearchModal />
      <PublicationModal />
      <NashrModal />
      <MaslahatModal />
    </div>
  );
}