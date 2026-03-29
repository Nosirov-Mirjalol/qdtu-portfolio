import { BookText, FlaskConical, Star, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { cn } from "@/utils";
import { NashrlarTab } from "./detail-tabs/nashrlar-tab";
import { PublicationsTab } from "./detail-tabs/publications-tab";
import { ResearchesTab } from "./detail-tabs/researches-tab";
import { MaslahatTab } from "./detail-tabs/maslahat-tab";
import { MukofotlarTab } from "./detail-tabs/mukofotlar-tab";
import type { Mukofot } from "./detail-tabs/mukofotlar-tab";

const TABS = [
 { value: "researches", label: "Tadqiqotlar", icon: <FlaskConical className="size-3.5" /> },
 { value: "publications", label: "Nazoratlar", icon: <BookText className="size-3.5" /> },
 { value: "supervision", label: "Nashrlar", icon: <Users className="size-3.5" /> },
 { value: "activities", label: "Maslahat", icon: <TrendingUp className="size-3.5" /> },
 { value: "awards", label: "Mukofotlar", icon: <Star className="size-3.5" /> },
];

type ActivityTabsProps = {
 activeTab: string;
 onTabChange: (tab: string) => void;
 researches: ResearchItem[];
 researchPage: number;
 researchTotalPage: number;
 onResearchPageChange: (page: number) => void;
 researchLoading?: boolean;
 nazoratlar: NazoratItem[];
 nazoratPage: number;
 nazoratTotalPage: number;
 onNazoratPageChange: (page: number) => void;
 nazoratLoading?: boolean;
 nashrlar: PublicationItem[];
 nashrlarPage: number;
 nashrlarTotalPage: number;
 onNashrlarPageChange: (page: number) => void;
 nashrlarLoading?: boolean;
 maslahatlar: ConsultationItem[];
 maslahatlarPage: number;
 maslahatlarTotalPage: number;
 onMaslahatlarPageChange: (page: number) => void;
 maslahatlarLoading?: boolean;
 mukofotlar: Mukofot[];
 userId: number | undefined;
};

export function ActivityTabs({
 activeTab,
 onTabChange,
 researches,
 researchPage,
 researchTotalPage,
 onResearchPageChange,
 researchLoading,
 nazoratlar,
 nazoratPage,
 nazoratTotalPage,
 onNazoratPageChange,
 nazoratLoading,
 nashrlar,
 nashrlarPage,
 nashrlarTotalPage,
 onNashrlarPageChange,
 nashrlarLoading,
 maslahatlar,
 maslahatlarPage,
 maslahatlarTotalPage,
 onMaslahatlarPageChange,
 maslahatlarLoading,
 mukofotlar,
 userId,
}: ActivityTabsProps) {
 return (
  <Tabs
   value={activeTab}
   onValueChange={onTabChange}
   className="gap-0 w-full rounded-xl border bg-card overflow-hidden"
  >
   <div className="border-b overflow-x-auto">
    <TabsList className="bg-transparent h-auto p-0 rounded-none gap-0 w-max sm:w-full justify-start">
     {TABS.map((tab) => (
      <TabsTrigger
       key={tab.value}
       value={tab.value}
       className={cn(
        "rounded-none border-0 border-b-2 border-transparent px-3 sm:px-4 py-2.5 text-[12px] sm:text-[13px] gap-1.5 h-auto whitespace-nowrap",
        "data-[state=active]:border-primary data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent",
        "data-[state=active]:text-primary data-[state=active]:shadow-none",
       )}
      >
       {tab.icon}
       {tab.label}
      </TabsTrigger>
     ))}
    </TabsList>
   </div>

   <div className="px-3 sm:px-5">
    <TabsContent value="researches">
     <div className="py-4 overflow-x-auto">
      <ResearchesTab
       data={researches}
       userId={userId}
       page={researchPage}
       totalPage={researchTotalPage}
       onPageChange={onResearchPageChange}
       isLoading={researchLoading}
      />
     </div>
    </TabsContent>
    <TabsContent value="publications">
     <div className="py-4 overflow-x-auto">
      <PublicationsTab
       data={nazoratlar}
       userId={userId}
       page={nazoratPage}
       totalPage={nazoratTotalPage}
       onPageChange={onNazoratPageChange}
       isLoading={nazoratLoading}
      />
     </div>
    </Tabs>
<Content>
    <TabsContent value="supervision">
     <div className="py-4 overflow-x-auto">
      <NashrlarTab
       data={nashrlar}
       userId={userId}
       page={nashrlarPage}
       totalPage={nashrlarTotalPage}
       onPageChange={onNashrlarPageChange}
       isLoading={nashrlarLoading}
      />
     </div>
    </TabsContent>
    <TabsContent value="activities">
     <div className="py-4 overflow-x-auto">
      <MaslahatTab
       data={maslahatlar}
       userId={userId}
       page={maslahatlarPage}
       totalPage={maslahatlarTotalPage}
       onPageChange={onMaslahatlarPageChange}
       isLoading={maslahatlarLoading}
      />
     </div>
    </TabsContent>
    <TabsContent value="awards">
     <div className="py-4 overflow-x-auto">
      <MukofotlarTab data={mukofotlar} />
     </div>
    </TabsContent>
   </div>
  </Tabs>
 );
}
