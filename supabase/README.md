# Tekzura Lead Capture Backend

The Get Started form (`/get-started`) uses a lean, no-server lead architecture:

- **Web3Forms** sends email notifications to Tekzura.
- **Supabase** stores each lead in `public.leads` as a lightweight CRM.

The browser writes directly to both services. No Supabase Edge Function and no
Resend integration are required for lead capture.

If Web3Forms is not configured yet, the form still works by opening a prefilled
email to `info@tekzura.com`, so no lead is lost.

## One-time setup

### 1. Prerequisites
- A [Supabase](https://supabase.com) project
- A [Web3Forms](https://web3forms.com/) access key
- The Supabase CLI: `npm i -g supabase`

### 2. Link the project
```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### 3. Create the leads table
```bash
supabase db push
```
This runs `supabase/migrations/0001_leads.sql` (creates the `leads` table with
RLS enabled).

### 4. Confirm Row Level Security

The migration enables RLS and creates one policy:

- anonymous users can `INSERT` valid leads
- anonymous users cannot `SELECT`, `UPDATE`, or `DELETE`

This is why the Supabase anon key is safe to expose in the browser.

### 5. Point the frontend at Web3Forms and Supabase

Create or verify the Web3Forms access key using `info@tekzura.com`. Web3Forms
delivers notifications to the email address connected to the access key, so the
key itself must be tied to Tekzura's notification inbox.

In your Vercel project (and local `.env`):
```
VITE_WEB3FORMS_ACCESS_KEY=YOUR_WEB3FORMS_ACCESS_KEY
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Redeploy the site. Submissions now trigger a Web3Forms email to
`info@tekzura.com` and insert a row in Supabase. If Web3Forms is configured but
the email request fails, the website shows an error instead of silently treating
Supabase storage as a successful notification.

## Viewing leads
Supabase Dashboard → Table Editor → `leads`, or:
```sql
select created_at, name, email, service, status from public.leads order by created_at desc;
```

## Turning Supabase into a lightweight CRM

Start with the built-in `status` column:

- `new`
- `contacted`
- `qualified`
- `won`
- `lost`

You can add owner/notes fields later without changing the website form:

```sql
alter table public.leads add column if not exists owner text;
alter table public.leads add column if not exists notes text;
```
