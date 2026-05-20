-- Tabla de posts del Blog de Viajes
-- Ejecutar en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR(300) NOT NULL,
  subtitle    VARCHAR(400),
  slug        VARCHAR(300) NOT NULL UNIQUE,
  cover_image TEXT NOT NULL,
  second_image TEXT,
  content_p1  TEXT NOT NULL,
  content_p2  TEXT,
  excerpt     VARCHAR(400) NOT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para búsqueda por slug
CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Lectura pública de posts activos
CREATE POLICY "Posts activos visibles al público"
  ON posts FOR SELECT
  USING (is_active = TRUE);

-- Solo service_role puede insertar / actualizar / eliminar
-- (la app usa supabaseAdmin con service_role key)
CREATE POLICY "Solo admin puede insertar posts"
  ON posts FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Solo admin puede actualizar posts"
  ON posts FOR UPDATE
  USING (TRUE);

CREATE POLICY "Solo admin puede eliminar posts"
  ON posts FOR DELETE
  USING (TRUE);
