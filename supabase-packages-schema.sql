-- Tabla de paquetes turísticos
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  duration VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  is_offer BOOLEAN DEFAULT false,
  original_price NUMERIC CHECK (original_price >= 0),
  discount INTEGER CHECK (discount >= 0 AND discount <= 100),
  included JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_is_offer ON packages(is_offer) WHERE is_offer = true;
CREATE INDEX IF NOT EXISTS idx_packages_price ON packages(price);
CREATE INDEX IF NOT EXISTS idx_packages_created_at ON packages(created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_packages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_packages_timestamp
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION update_packages_updated_at();

-- Comentarios de documentación
COMMENT ON TABLE packages IS 'Tabla de paquetes turísticos disponibles';
COMMENT ON COLUMN packages.id IS 'Identificador único del paquete';
COMMENT ON COLUMN packages.title IS 'Título del paquete turístico';
COMMENT ON COLUMN packages.destination IS 'Destino del viaje';
COMMENT ON COLUMN packages.description IS 'Descripción detallada del paquete';
COMMENT ON COLUMN packages.price IS 'Precio actual del paquete';
COMMENT ON COLUMN packages.duration IS 'Duración del viaje (ej: "5 días / 4 noches")';
COMMENT ON COLUMN packages.image IS 'URL de la imagen principal del paquete';
COMMENT ON COLUMN packages.category IS 'Categoría del paquete (aventura, cultural, playa, etc)';
COMMENT ON COLUMN packages.is_offer IS 'Indica si el paquete está en oferta';
COMMENT ON COLUMN packages.original_price IS 'Precio original antes del descuento';
COMMENT ON COLUMN packages.discount IS 'Porcentaje de descuento aplicado';
COMMENT ON COLUMN packages.included IS 'Array JSON con los servicios incluidos en el paquete';
