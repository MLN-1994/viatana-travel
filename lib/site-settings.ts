import { supabase, supabaseAdmin } from './supabase';
import { SITE_SETTINGS_DEFAULTS } from './site-settings-defaults';

export { SITE_SETTINGS_DEFAULTS };

export type SiteSettings = Record<string, string>;

/**
 * Obtener todos los settings (servidor — usa cliente público)
 * Siempre retorna un objeto con los fallbacks aplicados.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error || !data) return { ...SITE_SETTINGS_DEFAULTS };

    const fromDb: SiteSettings = {};
    for (const row of data) {
      fromDb[row.key] = row.value;
    }

    // Merge: DB values override defaults, fallback keeps anything not in DB
    return { ...SITE_SETTINGS_DEFAULTS, ...fromDb };
  } catch {
    return { ...SITE_SETTINGS_DEFAULTS };
  }
}

/**
 * Actualizar uno o más settings (admin — usa service role)
 */
export async function updateSiteSettings(updates: SiteSettings): Promise<boolean> {
  try {
    const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));

    const { error } = await supabaseAdmin
      .from('site_settings')
      .upsert(rows, { onConflict: 'key' });

    return !error;
  } catch {
    return false;
  }
}
