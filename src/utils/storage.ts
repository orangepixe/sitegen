
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/project';

// Convert DB row to Project
const rowToProject = (row: any): Project => ({
  id: row.id,
  websiteName: row.website_name,
  logo: row.logo || undefined,
  productPhotos: row.product_photos || [],
  productTitle: row.product_title,
  shortDescription: row.short_description,
  fullDescription: row.full_description,
  price: row.price,
  buyButtonText: row.buy_button_text,
  mainWebsiteUrl: row.main_website_url,
  googleAdsScript: row.google_ads_script || undefined,
  googleTagId: row.google_tag_id || undefined,
  googleConversionId: row.google_conversion_id || undefined,
  googleConversionLabel: row.google_conversion_label || undefined,
  conversionValue: row.conversion_value || '1.0',
  conversionCurrency: row.conversion_currency || 'AUD',
  template: row.template as Project['template'],
  extraFields: row.extra_fields || undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// Convert Project to DB row (for insert/update)
const projectToRow = (project: Project, userId: string) => ({
  id: project.id,
  user_id: userId,
  website_name: project.websiteName,
  logo: project.logo || null,
  product_photos: project.productPhotos,
  product_title: project.productTitle,
  short_description: project.shortDescription,
  full_description: project.fullDescription,
  price: project.price,
  buy_button_text: project.buyButtonText,
  main_website_url: project.mainWebsiteUrl,
  google_ads_script: project.googleAdsScript || null,
  google_tag_id: project.googleTagId || null,
  google_conversion_id: project.googleConversionId || null,
  google_conversion_label: project.googleConversionLabel || null,
  conversion_value: project.conversionValue || '1.0',
  conversion_currency: project.conversionCurrency || 'AUD',
  template: project.template,
  extra_fields: project.extraFields || null,
});

export const loadProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error loading projects:', error);
    return [];
  }
  
  return (data || []).map(rowToProject);
};

export const saveProject = async (project: Project): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const row = projectToRow(project, user.id);

  const { error } = await supabase
    .from('projects')
    .upsert(row, { onConflict: 'id' });

  if (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
