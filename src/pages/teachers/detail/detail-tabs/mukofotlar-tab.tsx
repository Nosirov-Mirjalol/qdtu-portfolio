type AwardType =
	| "Trening_Va_Amaliyot"
	| "Tahririyat_Kengashiga_Azolik"
	| "Maxsus_Kengash_Azoligi"
	| "Patent_Dgu"
	| "Davlat_Mukofoti";

type MemberType = "MILLIY" | "XALQARO";

export type Mukofot = {
	name: string;
	description: string;
	year: number;
	fileUrl: string;
	userId: number;
	awardEnum: AwardType;
	memberEnum: MemberType;
};

const mukofotlarTab = () => {
	return <div>mukofotlar tab</div>;
};

export default mukofotlarTab;
