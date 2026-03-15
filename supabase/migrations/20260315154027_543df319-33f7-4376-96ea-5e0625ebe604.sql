
-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    website_name TEXT NOT NULL DEFAULT '',
    logo TEXT,
    product_photos TEXT[] NOT NULL DEFAULT '{}',
    product_title TEXT NOT NULL DEFAULT '',
    short_description TEXT NOT NULL DEFAULT '',
    full_description TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    buy_button_text TEXT NOT NULL DEFAULT 'Inquire Now',
    main_website_url TEXT NOT NULL DEFAULT '',
    google_ads_script TEXT,
    google_tag_id TEXT,
    google_conversion_id TEXT,
    google_conversion_label TEXT,
    conversion_value TEXT DEFAULT '1.0',
    conversion_currency TEXT DEFAULT 'AUD',
    template TEXT NOT NULL DEFAULT 'modern',
    extra_fields JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies - users can only access their own projects
CREATE POLICY "Users can view their own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
