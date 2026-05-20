-- ============================================================
-- TABLA: site_settings
-- Configuración editable del sitio (textos, etc.)
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON site_settings;
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_site_settings_updated_at();

-- RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Lectura pública (los textos del sitio son públicos)
CREATE POLICY "Lectura pública de site_settings"
  ON site_settings FOR SELECT
  USING (true);

-- Solo service role puede escribir
CREATE POLICY "Service role acceso total a site_settings"
  ON site_settings
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- Valores iniciales (headline)
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
  ('headline_title',           'Viajes a medida con')
  ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('headline_title_highlight', 'atención humana.')
  ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('headline_subtitle',        'En Viatana te atienden personas reales. Escuchamos lo que necesitás y armamos tu viaje ideal, sin bots y sin vueltas.')
  ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('headline_paragraph',       'Descubrí experiencias únicas y asesoramiento personalizado con tarifas que cuidan tu bolsillo. El mundo te espera, nosotros te llevamos.')
  ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('headline_cta_text',        'Consultar por WhatsApp')
  ON CONFLICT (key) DO NOTHING;
