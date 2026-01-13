-- Crear tabla de banners para el carousel principal
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  button_text VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para mejorar consultas de banners activos ordenados
CREATE INDEX IF NOT EXISTS idx_banners_active_order 
ON banners(is_active, display_order) 
WHERE is_active = true;

-- Índice para orden general
CREATE INDEX IF NOT EXISTS idx_banners_display_order 
ON banners(display_order);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_banners_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_banners_timestamp
  BEFORE UPDATE ON banners
  FOR EACH ROW
  EXECUTE FUNCTION update_banners_updated_at();

-- Insertar banners de ejemplo
INSERT INTO banners (title, subtitle, image_url, link_url, button_text, is_active, display_order) VALUES
(
  '¡Descubre el Paraíso Caribeño!',
  'Paquetes todo incluido con hasta 40% de descuento. Viaja ahora y paga después.',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=600&fit=crop',
  '/#ofertas',
  'Ver Ofertas',
  true,
  1
),
(
  'Europa Te Espera',
  'Tours guiados por las ciudades más emblemáticas. Incluye vuelos, hoteles y desayunos.',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&h=600&fit=crop',
  '/#paquetes',
  'Explorar Europa',
  true,
  2
),
(
  'Aventura en la Patagonia',
  'Descubre paisajes únicos en el fin del mundo. Trekking, glaciares y naturaleza pura.',
  'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=1920&h=600&fit=crop',
  '/#paquetes',
  'Conocer Más',
  true,
  3
);

-- Comentarios de documentación
COMMENT ON TABLE banners IS 'Tabla para gestionar banners dinámicos del carousel principal';
COMMENT ON COLUMN banners.title IS 'Título principal del banner';
COMMENT ON COLUMN banners.subtitle IS 'Subtítulo o descripción del banner';
COMMENT ON COLUMN banners.image_url IS 'URL de la imagen de fondo del banner';
COMMENT ON COLUMN banners.link_url IS 'URL de destino al hacer clic en el banner';
COMMENT ON COLUMN banners.button_text IS 'Texto del botón de acción';
COMMENT ON COLUMN banners.is_active IS 'Indica si el banner está activo y debe mostrarse';
COMMENT ON COLUMN banners.display_order IS 'Orden de visualización (menor número = mayor prioridad)';
