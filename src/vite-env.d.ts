/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Web3Forms access key used for lead-form email notifications. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Public Supabase project URL used for direct browser inserts. */
  readonly VITE_SUPABASE_URL?: string;
  /** Public Supabase anon key. RLS keeps browser access insert-only. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Chat proxy endpoint. Defaults to the same-origin /api/chat function. */
  readonly VITE_CHAT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
