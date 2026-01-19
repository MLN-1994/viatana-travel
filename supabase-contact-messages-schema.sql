-- Tabla de mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'archived')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  read_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_pending ON contact_messages(created_at DESC) 
  WHERE status = 'pending';

-- Comentarios de documentación
COMMENT ON TABLE contact_messages IS 'Tabla de mensajes de contacto enviados desde el formulario';
COMMENT ON COLUMN contact_messages.id IS 'Identificador único del mensaje';
COMMENT ON COLUMN contact_messages.name IS 'Nombre del remitente';
COMMENT ON COLUMN contact_messages.email IS 'Email del remitente';
COMMENT ON COLUMN contact_messages.phone IS 'Teléfono del remitente (opcional)';
COMMENT ON COLUMN contact_messages.message IS 'Contenido del mensaje';
COMMENT ON COLUMN contact_messages.status IS 'Estado del mensaje: pending, read, replied, archived';
COMMENT ON COLUMN contact_messages.ip_address IS 'Dirección IP del remitente';
COMMENT ON COLUMN contact_messages.user_agent IS 'User agent del navegador';
COMMENT ON COLUMN contact_messages.read_at IS 'Fecha y hora en que se leyó el mensaje';
COMMENT ON COLUMN contact_messages.replied_at IS 'Fecha y hora en que se respondió el mensaje';
