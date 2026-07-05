-- SignalForge AI Database Schema
-- Production Ready Migration Script

-- Create Organizations Table
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    branding_color VARCHAR(50) DEFAULT '#2563EB',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Create Profiles Table (Linked to Supabase Auth)
CREATE TYPE user_role AS ENUM ('Admin', 'Editor', 'Viewer');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role user_role DEFAULT 'Viewer'::user_role NOT NULL,
    org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create Datasets Table
CREATE TABLE public.datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_size VARCHAR(50) NOT NULL,
    row_count INTEGER NOT NULL,
    column_metadata JSONB NOT NULL,
    data_preview JSONB NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for datasets
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

-- Create Reports Table
CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID REFERENCES public.datasets(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    charts_config JSONB,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create API Keys Table
CREATE TABLE public.api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    key_hash TEXT UNIQUE NOT NULL,
    key_preview VARCHAR(50) NOT NULL,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_used TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for api_keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;


--------------------------------------------------------------------------------
-- RLS POLICIES (Tenant Isolation)
--------------------------------------------------------------------------------

-- Profiles Policies
CREATE POLICY "Users can view profiles in their organization." 
    ON public.profiles FOR SELECT 
    USING (org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile." 
    ON public.profiles FOR UPDATE 
    USING (id = auth.uid());

-- Organizations Policies
CREATE POLICY "Users can view their organization." 
    ON public.organizations FOR SELECT 
    USING (id = (SELECT org_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can update their organization." 
    ON public.organizations FOR UPDATE 
    USING (
        id = (SELECT org_id FROM public.profiles WHERE id = auth.uid()) 
        AND 'Admin' = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );

-- Datasets Policies
CREATE POLICY "Users can view datasets of their organization." 
    ON public.datasets FOR SELECT 
    USING (org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Editors/Admins can insert datasets for their organization." 
    ON public.datasets FOR INSERT 
    WITH CHECK (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('Admin', 'Editor')
    );

CREATE POLICY "Editors/Admins can delete datasets of their organization." 
    ON public.datasets FOR DELETE 
    USING (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('Admin', 'Editor')
    );

-- Reports Policies
CREATE POLICY "Users can view reports of their organization." 
    ON public.reports FOR SELECT 
    USING (org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Editors/Admins can create reports." 
    ON public.reports FOR INSERT 
    WITH CHECK (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('Admin', 'Editor')
    );

CREATE POLICY "Editors/Admins can delete reports." 
    ON public.reports FOR DELETE 
    USING (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('Admin', 'Editor')
    );

-- API Keys Policies
CREATE POLICY "Admins can view API keys." 
    ON public.api_keys FOR SELECT 
    USING (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND 'Admin' = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Admins can generate API keys." 
    ON public.api_keys FOR INSERT 
    WITH CHECK (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND 'Admin' = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Admins can revoke API keys." 
    ON public.api_keys FOR DELETE 
    USING (
        org_id = (SELECT org_id FROM public.profiles WHERE id = auth.uid())
        AND 'Admin' = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );
