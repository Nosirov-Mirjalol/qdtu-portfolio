interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_APP_PUBLIC_PATH?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	readonly glob: typeof import("vite").import.meta.glob;
}

// Module declarations for image imports
declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.png" {
	const content: string;
	export default content;
}

declare module "*.jpg" {
	const content: string;
	export default content;
}

declare module "*.jpeg" {
	const content: string;
	export default content;
}
