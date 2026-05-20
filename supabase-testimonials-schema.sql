-- ============================================================
-- TABLA: testimonials
-- Comentarios/experiencias de clientes estilo Google Reviews
-- ============================================================

CREATE TABLE IF NOT EXISTS testimonials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  destination     TEXT NOT NULL,
  content         TEXT NOT NULL,
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  avatar_url      TEXT,
  photo_1_url     TEXT,
  photo_2_url     TEXT,
  photo_3_url     TEXT,
  rating          SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active       BOOLEAN NOT NULL DEFAULT true,
  display_order   INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para obtener los activos ordenados
CREATE INDEX IF NOT EXISTS idx_testimonials_active_order
  ON testimonials (is_active, display_order, created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_testimonials_updated_at ON testimonials;
CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_testimonials_updated_at();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Lectura pública (solo registros activos)
CREATE POLICY "Lectura pública de testimonials activos"
  ON testimonials FOR SELECT
  USING (is_active = true);

-- El service role (usada en el servidor Next.js) puede hacer todo
CREATE POLICY "Service role acceso total a testimonials"
  ON testimonials
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================
-- Storage bucket: testimonials
-- (Para avatares y fotos de cada reseña)
-- Crear en Supabase Dashboard > Storage > New bucket
-- Nombre: testimonials
-- Public: true
-- ============================================================

-- ============================================================
-- MIGRACIÓN: agregar columna rating (ejecutar si la tabla ya existe)
-- ============================================================
-- ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5);
