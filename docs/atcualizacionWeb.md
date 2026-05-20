⚠️ PENDIENTE MAÑANA: Consultar al cliente a qué email corporativo quiere que lleguen los formularios de contacto del sitio (opciones: info@viatana.travel, dantestringa@viatana.travel, f.arriete@viatana.travel, p.barrirero@viatana.travel). Una vez confirmado, actualizar RESEND_TO_EMAIL en Vercel y hacer redeploy.

1) modificacion de dominio a www.viatanatravelviajes.com
2) comprar dominio .com.ar (nosotros, unicamente para bloquearlo)
3) Hacer editables los textos de la web:
a)  Este bloque:
"Viajes a medida con atención humana.
En Viatana te atienden personas reales.
Escuchamos lo que necesitás y armamos tu viaje ideal, sin bots y sin vueltas.
Descubrí experiencias únicas y asesoramiento personalizado con tarifas que cuidan tu bolsillo. El mundo te espera, nosotros te llevamos."
b) El texto de la seccion "Nosotros" o, en caso de ser muy complejo, pasarte modificaciones de toda esa seccion para que quede mas corto, compacto y no tanto IA.

4) agregar bloque en home sobre experiencias/ comentarios de clientes.
Que estas experiencias o comentarios los podamos administrar/editar
Info a descacar:
Nombre y apellido
Fecha 
Foto (vamos a cargar del rostro)
Textual de la experiencia


5) Nueva seccion de la web
Blog de viajes
La idea de esta seccion es crear entradas (paginas independientes) como si fuesen noticias. No van a estar en la home. La manera de acceder es el titulo en la barra de secciones "blog de viajes"
que lleve a una web /blogdeviajes y ahi haya un general con la previa de todas las entradas cargadas.
En esta previa que cada entrada tenga foto de portada, titulo y bajada de 2 lineas con hipervinculo a la nota completa.

Cada entrada como pagina independiente
Titulo
Subtiulo
Foto
texto
foto
texto.

# PROMPT PARA LA NUEVA SECCION BLOG DE LA WEB:
🖥️ Prompt para tu IDE (Vibe-Coding)
Contexto del Proyecto:
Estoy trabajando en Viatana Travel, una web de viajes construida con Next.js (App Router), Tailwind CSS, Supabase, Vercel y Resend. La estética es limpia, profesional, con mucho uso de blancos, tipografías sans-serif modernas y acentos en color violeta/degradados.

Objetivo:
Crear una nueva sección de Blog de Viajes. No debe aparecer en la Home, sino ser una sección independiente accesible desde el Navbar.

Tareas requeridas:

Navegación: Añadir "Blog de Viajes" al componente de Navbar existente, apuntando a /blog-de-viajes.

Página de Listado (/blog-de-viajes):

Crear una vista general con un grid de "Cards".

Cada Card debe mostrar: Imagen de portada (aspect ratio 16:9), Título, y una bajada (excerpt) de máximo 2 líneas (usa line-clamp-2).

El diseño debe ser consistente con la sección de "Paquetes Turísticos" de la Home (bordes redondeados, sombras sutiles).

Página de Post Individual (/blog-de-viajes/[slug]):

Implementar una página dinámica que recupere la data de Supabase.

Layout jerárquico: Título (H1) -> Subtítulo (H2/H3) -> Imagen Destacada -> Bloque de Texto -> Imagen Secundaria -> Bloque de Texto final.

Asegurar que el texto sea legible (max-width tipo prose de Tailwind).

Base de Datos (Supabase):

Dame el SQL para crear la tabla posts con campos: id, title, subtitle, slug, cover_image, second_image, content_p1, content_p2, excerpt, created_at.

Estética:

Mantener la coherencia visual de Viatana: botones con bordes redondeados, acentos violetas y el botón flotante de WhatsApp siempre visible.

Instrucciones técnicas:

Usa Server Components para el fetching de datos.

Usa next/image para optimización de fotos.

Implementa generateMetadata para SEO básico en cada post.

💡 Tips para que el "vibe" sea perfecto:
Pasa las imágenes: Si tu herramienta (como Cursor) permite adjuntar imágenes, adjunta las 3 capturas que me pasaste a mí. Dile: "Usa estas imágenes como referencia visual para los colores y el padding".

Revisión de Tipografía: Como no puedo ver el archivo de configuración, si notas que la fuente no coincide, dile: "Usa la misma fuente que el H1 de la Home (Viajes a medida)".

Responsive: Recuérdale que el grid del blog debe ser grid-cols-1 md:grid-cols-2 lg:grid-cols-3 para que se vea bien en celulares.

¡Dale para adelante con ese código! Si necesitás ajustar algo del SQL de Supabase, avisame.