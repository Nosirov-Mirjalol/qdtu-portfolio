export type ResearchItem = {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  member: boolean;
  univerName: string;
  finished: boolean;
  memberEnum: "MILLIY" | "XALQARO";
}