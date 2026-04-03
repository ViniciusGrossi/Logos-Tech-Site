-- 1. Habilitação de extensões vitais
create extension if not exists "vector";
create extension if not exists "uuid-ossp";

-- 2. Função utilitária para updated_at (autogerido)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 3. Tabelas Core (Logos Tech Platform)

-- 3.1 Organizations
create table public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  segment text not null check (segment in ('politico', 'juridico', 'PME')),
  owner_id uuid not null, -- referência ao auth.users.id
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- Soft Delete
);

-- 3.2 User Profiles (Extensão do auth.users)
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  organization_id uuid references public.organizations(id),
  role text not null check (role in ('admin', 'client', 'operator')),
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- Soft Delete
);

-- 3.3 Contacts (CRM Base)
create table public.contacts (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  name text,
  phone text,
  email text,
  source text, -- Origem do contato (site, tráfego, manual)
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- Soft Delete
);

-- 3.4 Conversations
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  contact_id uuid not null references public.contacts(id),
  organization_id uuid not null references public.organizations(id),
  channel text not null check (channel in ('whatsapp', 'web')),
  status text not null default 'open' check (status in ('open', 'closed', 'archived')),
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.5 Messages
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references public.conversations(id),
  sender text not null check (sender in ('user', 'bot', 'operator')),
  content text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 3.6 WhatsApp Leads (Landing Page Tracker - Simplicidade Primeiro)
create table public.whatsapp_leads (
  id uuid primary key default uuid_generate_v4(),
  utm_source text,
  utm_medium text,
  device_info text,
  page_on_click text,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.7 Automations (Workflows)
create table public.automations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  name text not null,
  trigger_type text not null,
  workflow_id text, -- ID do workflow no n8n
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- Soft Delete
);

-- 3.8 Events (Tracking Universal)
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  type text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 3.9 Analytics Metrics
create table public.analytics_metrics (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  metric_name text not null,
  value numeric not null,
  timestamp timestamptz not null default now()
);

-- 3.10 AI Knowledge Base (RAG Source)
create table public.ai_knowledge_base (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  title text not null,
  content text not null,
  type text not null check (type in ('doc', 'faq', 'system')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- Soft Delete
);

-- 3.11 AI Embeddings (Vector search)
create table public.ai_embeddings (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id),
  knowledge_id uuid references public.ai_knowledge_base(id) on delete cascade,
  content text not null,
  embedding vector(1536), -- Vector format para OpenAI default (ajustar se usar outro modelo)
  source text,
  created_at timestamptz not null default now()
);

-- 4. Triggers de updated_at
create trigger tr_organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger tr_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger tr_contacts_updated_at before update on public.contacts for each row execute function public.set_updated_at();
create trigger tr_conversations_updated_at before update on public.conversations for each row execute function public.set_updated_at();
create trigger tr_whatsapp_leads_updated_at before update on public.whatsapp_leads for each row execute function public.set_updated_at();
create trigger tr_automations_updated_at before update on public.automations for each row execute function public.set_updated_at();
create trigger tr_ai_knowledge_base_updated_at before update on public.ai_knowledge_base for each row execute function public.set_updated_at();

-- 5. Índices Estratégicos (Performance)
create index idx_organizations_owner on public.organizations(owner_id) where deleted_at is null;
create index idx_profiles_org on public.profiles(organization_id) where deleted_at is null;
create index idx_contacts_org on public.contacts(organization_id) where deleted_at is null;
create index idx_contacts_phone on public.contacts(phone);
create index idx_conversations_org_status on public.conversations(organization_id, status);
create index idx_messages_conversation on public.messages(conversation_id);
create index idx_events_org_type on public.events(organization_id, type);
create index idx_metrics_org_name on public.analytics_metrics(organization_id, metric_name);
create index idx_embeddings_knowledge on public.ai_embeddings(knowledge_id);
create index idx_embeddings_vector on public.ai_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100); -- Ajustar listas conforme volume futuro
