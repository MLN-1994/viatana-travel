-- Tabla de categorías de paquetes turísticos
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_categories_timestamp
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_categories_updated_at();

-- Insertar categorías iniciales
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
('Aventura', 'aventura', 'Paquetes para los amantes de la adrenalina y deportes extremos', '🏔️', 1),
('Cultural', 'cultural', 'Descubre la historia y tradiciones de cada destino', '🏛️', 2),
('Playa', 'playa', 'Relájate en los mejores destinos de playa y sol', '🏖️', 3),
('Gastronómico', 'gastronomico', 'Experiencias culinarias únicas', '🍽️', 4),
('Familiar', 'familiar', 'Viajes perfectos para toda la familia', '👨‍👩‍👧‍👦', 5),
('Romántico', 'romantico', 'Escapadas ideales para parejas', '💑', 6),
('Naturaleza', 'naturaleza', 'Explora paisajes naturales increíbles', '🌿', 7),
('Urbano', 'urbano', 'Descubre las mejores ciudades del mundo', '🏙️', 8)
ON CONFLICT (slug) DO NOTHING;

-- Comentarios de documentación
COMMENT ON TABLE categories IS 'Tabla de categorías para clasificar paquetes turísticos';
COMMENT ON COLUMN categories.id IS 'Identificador único de la categoría';
COMMENT ON COLUMN categories.name IS 'Nombre de la categoría';
COMMENT ON COLUMN categories.slug IS 'Slug para URLs amigables (único)';
COMMENT ON COLUMN categories.description IS 'Descripción de la categoría';
COMMENT ON COLUMN categories.icon IS 'Emoji o icono representativo';
COMMENT ON COLUMN categories.display_order IS 'Orden de visualización (menor = mayor prioridad)';
