# Mandala Tickets API — Documentación completa 

> API REST para consultar venues, eventos, contenido multilenguaje, multimedia y metadatos SEO del ecosistema Mandala Group.

---

## Tabla de contenidos

- [Endpoint](#endpoint)
- [Autenticación](#autenticación)
- [Variable de entorno (Vercel)](#variable-de-entorno-vercel)
- [Request](#request)
- [Response general](#response-general)
- [Ciudades y venues](#ciudades-y-venues)
- [Catálogo completo de eventos](#catálogo-completo-de-eventos)
- [Estructura JSON — Venue](#estructura-json--venue)
- [Estructura JSON — Evento](#estructura-json--evento)
- [Esquema completo (árbol)](#esquema-completo-árbol)
- [Medidas y aspect ratios de multimedia](#medidas-y-aspect-ratios-de-multimedia)
- [Recursos estáticos y rutas base](#recursos-estáticos-y-rutas-base)
- [Diferencias clave: Venue vs Evento](#diferencias-clave-venue-vs-evento)
- [Campos nulos y valores por defecto](#campos-nulos-y-valores-por-defecto)
- [Ejemplos de código](#ejemplos-de-código)
- [Notas técnicas](#notas-técnicas)

---

## Endpoint

```
POST https://mandalatickets.com/api/info_venues/X-API-KEY/{API_KEY}
```

| Parámetro | Ubicación | Descripción |
|-----------|-----------|-------------|
| `API_KEY` | URL path  | Tu clave de acceso. Usar variable de entorno `MT_CONTENT_API_KEY`. |

---

## Autenticación

La API key se pasa directamente en la URL. No se usan headers de autorización adicionales.

> **Importante:** No exponer la API key en el frontend. Usarla exclusivamente desde backend o variables de entorno.

---

## Variable de entorno (Vercel)

La API key se configura como **Team Variable** en Vercel para que esté disponible en todos los proyectos.

**Configuración en Vercel Pro:**

1. Ir a [vercel.com](https://vercel.com) → tu **Team** (no un proyecto).
2. **Settings** → **Environment Variables**.
3. **Add New**:
   - **Key:** `MT_CONTENT_API_KEY`
   - **Value:** tu API key
   - **Environments:** Production, Preview, Development
4. Opcional: marcar **Apply to all projects**.
5. **Save**.

**Uso en código:** la variable se expone como `process.env.MT_CONTENT_API_KEY` (Node.js) o `os.environ["MT_CONTENT_API_KEY"]` (Python). No exponerla en el cliente.

---

## Request

No se requieren parámetros en el body. Basta con un POST con body vacío o `{}`.

```bash
curl -X POST "https://mandalatickets.com/api/info_venues/X-API-KEY/$MT_CONTENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Response general

- **Status:** `200 OK`
- **Content-Type:** `application/json`
- **Body:** Array JSON de objetos **venue**.

| Concepto            | Valor                        |
|---------------------|------------------------------|
| Tipo                | `Array<Venue>`               |
| Venues totales      | 7                            |
| Idiomas disponibles | `es`, `en`, `pt`, `fr`       |
| Eventos totales     | 46                           |
| Peso aproximado     | ~400 KB+                     |

---

## Ciudades y venues

La API devuelve venues de **3 países** y **4 ciudades**:

### Mexico

#### Cancún (3 venues)

| Venue                  | `row_id` | `logo`                | Tipo            | Horario            | Días                   | Eventos |
|------------------------|----------|-----------------------|-----------------|--------------------|------------------------|---------|
| **MANDALA BEACH DAY**  | `3`      | `mandala-beach.png`   | Day Club / Playa | 11:00 AM – 5:30 PM | Diario                 | 2       |
| **MANDALA BEACH NIGHT**| `4`      | `mandala-beach-pp.png`| Night Pool Party | 10:00 PM – 3:00 AM | Miércoles              | 3       |
| **DCAVE**              | `6`      | `dady.png`            | Nightclub       | 10:00 PM – 3:00 AM | Jueves y Sábados       | 8       |

#### Tulum (2 venues)

| Venue            | `row_id` | `logo` | Tipo                  | Horario            | Días                        | Eventos |
|------------------|----------|--------|-----------------------|--------------------|-----------------------------|---------|
| **BONBONNIERE**  | `37`     | `null` | Nightclub de lujo     | Desde 10:00 PM     | Miércoles a Domingo         | 5       |
| **VAGALUME**     | `38`     | `null` | Beach Club / Festival | Variable por evento | Variable                    | 24      |

#### Guadalajara (1 venue)

| Venue            | `row_id` | `logo` | Tipo                       | Horario             | Días   | Eventos |
|------------------|----------|--------|----------------------------|---------------------|--------|---------|
| **SRA TANAKA**   | `54`     | `null` | Restaurante / Bar japonés  | 1:00 PM – 1:00 AM  | Diario | 1       |

### España

#### Madrid (1 venue)

| Venue        | `row_id` | `logo` | Tipo                 | Horario             | Días              | Eventos |
|--------------|----------|--------|----------------------|---------------------|-------------------|---------|
| **HOUDINNI** | `55`     | `null` | Nightclub underground| 12:00 AM – 6:00 AM | Martes a Domingo  | 3       |

---

## Catálogo completo de eventos

### MANDALA BEACH DAY — Cancún (2 eventos)

| # | Evento             | `nombre_corto` | Fecha       | Horario (desc.)    | Estatus    |
|---|--------------------|----------------|-------------|--------------------|------------|
| 1 | JERZY - March 2nd  | `jerzy-march02`| 2026-03-02  | 11:00 AM – 6:00 PM| Disponible |
| 2 | JAMO - March 16th  | `jamo.mar16`   | 2026-03-16  | 11:00 AM – 6:00 PM| Disponible |

### MANDALA BEACH NIGHT — Cancún (3 eventos)

| # | Evento              | `nombre_corto` | Fecha       | Horario (desc.)    | Estatus    |
|---|---------------------|----------------|-------------|--------------------|------------|
| 1 | Westend - March 3rd | `westend`      | 2026-03-03  | 10:00 PM – 3:00 AM| Disponible |
| 2 | GORDO - March 10th  | `gordo`        | 2026-03-10  | 10:00 PM – 3:00 AM| Disponible |
| 3 | LEVI - March 17th   | `levi-mar17`   | 2026-03-17  | 10:00 PM – 3:00 AM| Disponible |

### DCAVE — Cancún (8 eventos)

| # | Evento                   | `nombre_corto`     | Fecha       | Estatus    |
|---|--------------------------|--------------------|-------------|------------|
| 1 | CHUI - February 14th     | `chui-feb14`       | 2026-02-14  | Disponible |
| 2 | ZENS OF ONE - Feb 21st   | `zens-of-one-feb21`| 2026-02-21  | Disponible |
| 3 | JUANPI - February 28th   | `juampi-feb28`     | 2026-02-28  | Disponible |
| 4 | VINNY VIBE - March 1st   | `vinny-vibe-mar01` | 2026-03-01  | Disponible |
| 5 | TWINSICK - March 4th     | `twinsick-march03` | 2026-03-04  | Disponible |
| 6 | Dee Rock - March 8th     | `dee-rock-march08` | 2026-03-08  | Disponible |
| 7 | Timmy Trumpet - Mar 11th | `timmy-trumpet`    | 2026-03-11  | Disponible |
| 8 | SHIP WREK - March 18th   | `ship-wrek-feb18`  | 2026-03-18  | Disponible |

### BONBONNIERE — Tulum (5 eventos)

| # | Evento                      | `nombre_corto`        | Fecha       | Estatus    |
|---|-----------------------------|-----------------------|-------------|------------|
| 1 | Alan Dixon - Feb 20th       | `alan-dixon-feb20`    | 2026-02-20  | Disponible |
| 2 | Oriol Calvo - Feb 21st      | `oriol-calvo-feb21`   | 2026-02-21  | Disponible |
| 3 | Ancestral Soul - Feb 22nd   | `ancestral-soul-feb22`| 2026-02-22  | Disponible |
| 4 | AIRRICA - February 26th     | `airrica-feb26`       | 2026-02-26  | Disponible |
| 5 | Mishell - February 27th     | `mishell-feb27`       | 2026-02-27  | Disponible |

### VAGALUME — Tulum (24 eventos)

| # | Evento                         | `nombre_corto`          | Fecha       | Estatus    |
|---|--------------------------------|-------------------------|-------------|------------|
| 1 | Pendulum - February 12th       | `pendulum-feb12`        | 2026-02-12  | Disponible |
| 2 | Ten Ibiza - February 13th      | `ten-ibiza-feb13`       | 2026-02-13  | Disponible |
| 3 | SINNER - February 14th         | `sinner-feb14`          | 2026-02-14  | Disponible |
| 4 | MIXMAG - February 15th         | `mixmag-feb15`          | 2026-02-15  | Disponible |
| 5 | Vagalume Sessions - Feb 17th   | `vagalume-sessions-feb17`| 2026-02-17 | Disponible |
| 6 | RYTHMIA - February 18th        | `rythmia-feb18`         | 2026-02-18  | Disponible |
| 7 | SUMMERIANS - February 19th     | `summerians-feb19`      | 2026-02-19  | Disponible |
| 8 | Ten Ibiza - February 20th      | `ten-ibiza-feb20`       | 2026-02-20  | Disponible |
| 9 | SINNER - February 21st         | `sinner-feb21`          | 2026-02-21  | Disponible |
| 10| MIX MAG - February 22nd        | `mixmag-feb22`          | 2026-02-22  | Disponible |
| 11| LAGA RECORDS - February 24th   | `laga-records-feb24`    | 2026-02-24  | Disponible |
| 12| DOMINIK - February 25th        | `dominik-feb25`         | 2026-02-25  | Disponible |
| 13| SUMMERIANS - February 26th     | `summerians-feb26`      | 2026-02-26  | Disponible |
| 14| Ten Ibiza - February 27th      | `ten-ibiza-feb27`       | 2026-02-27  | Disponible |
| 15| SINNER - February 28th         | `sinner-feb28`          | 2026-02-28  | Disponible |
| 16| SUMMERIANS - March 5th         | `summerians-march5`     | 2026-03-05  | Disponible |
| 17| SUMMERIANS - March 12th        | `summerians-march12`    | 2026-03-12  | Disponible |
| 18| SINNER - March 14th            | `sinner-mar14`          | 2026-03-14  | Disponible |
| 19| GALA IBIZA @ VAGALUME - Mar 19 | `gala-mar`              | 2026-03-19  | Disponible |
| 20| Pendulum - March 26th          | `pendulum-mar`          | 2026-03-26  | Disponible |
| 21| Pendulum - April 9th           | `pendulum-apr9`         | 2026-04-09  | Disponible |
| 22| GALA IBIZA @ VAGALUME - Apr 16 | `gala-abr`              | 2026-04-16  | Disponible |
| 23| Renaissance - April 24th       | `renaissance-apr24`     | 2026-04-24  | Disponible |
| 24| Pendulum - May 7th             | `pendulum-may7`         | 2026-05-07  | Disponible |

### SRA TANAKA — Guadalajara (1 evento)

| # | Evento      | `nombre_corto` | Fecha       | Horario (desc.)     | Estatus    |
|---|-------------|----------------|-------------|---------------------|------------|
| 1 | WAGYUMAFIA  | `WAGYUMAFIA`   | 2026-08-29  | 8:00 PM – 11:00 PM  | Disponible |

### HOUDINNI — Madrid (3 eventos)

| # | Evento                      | `nombre_corto`  | Fecha       | Horario              | Estatus    |
|---|-----------------------------|-----------------|-------------|----------------------|------------|
| 1 | Murder on the dancefloor    | `murder`        | 2025-11-01  | 7:00 PM – 6:00 AM   | Disponible |
| 2 | Halloween                   | `halloween-2025`| 2025-10-31  | 10:00 PM – 6:00 AM  | Disponible |
| 3 | Houdinni - Nov 26th         | `nov-26`        | 2025-11-26  | 10:00 PM – 6:00 AM  | Disponible |

---

## Estructura JSON — Venue

Cada objeto del array principal:

| Campo                 | Tipo          | Nullable | Descripción |
|-----------------------|---------------|----------|-------------|
| `nombre`              | `string`      | No       | Nombre del venue (ej. `"MANDALA BEACH DAY"`, `"DCAVE"`, `"VAGALUME"`). |
| `row_id`              | `string`      | No       | ID interno único del venue. |
| `logo`                | `string|null` | Sí       | Nombre del archivo del logo. `null` si no tiene. |
| `metadata_contenido`  | `array[4]`    | No       | Contenido SEO y textos por idioma (es, en, pt, fr). |
| `multimedia`          | `object`      | No       | Imágenes y vídeos del venue. |
| `localizacion`        | `object`      | No       | Mapa, Google Maps, tour 360°. |
| `enlaces_adicionales` | `object`      | No       | Menú digital y redes sociales. |
| `eventos`             | `array`       | No       | Lista de eventos del venue. |

### `metadata_contenido[]` — Contenido del venue por idioma

Array con 4 elementos, uno por idioma:

| Campo          | Tipo     | Descripción |
|----------------|----------|-------------|
| `idioma`       | `string` | Nombre completo: `"ESPAÑOL"`, `"INGLÉS"`, `"PORTUGUÉS"`, `"FRANCÉS"`. |
| `idioma_abrev` | `string` | Código ISO: `es`, `en`, `pt`, `fr`. |
| `seo`          | `object` | Metadatos SEO. |
| `textos`       | `object` | Textos de presentación. |

**`seo`:**

| Campo         | Tipo     | Descripción |
|---------------|----------|-------------|
| `titulo`      | `string` | Meta title. |
| `descripcion` | `string` | Meta description. |
| `keywords`    | `string` | Keywords separados por coma. |

**`textos`:**

| Campo                    | Tipo          | Nullable | Descripción |
|--------------------------|---------------|----------|-------------|
| `titulo_disponibilidad`  | `string|null` | Sí       | Frase de disponibilidad (ej. `"ABRE DIARIO"`, `"OPEN WEDNESDAYS"`). |
| `descripcion_corta`      | `string`      | No       | HTML con horarios, música, dress code. |
| `descripcion_larga`      | `string`      | No       | HTML con descripción completa, reglas, restricciones. |

### `multimedia` — Multimedia del venue

| Campo            | Tipo          | Nullable | Descripción |
|------------------|---------------|----------|-------------|
| `imagen_portada` | `string|null` | Sí       | URL de la imagen de portada/thumbnail. |
| `video_portada`  | `string|null` | Sí       | URL de video de portada. Generalmente `null`. |
| `carrusel`       | `array`       | No       | Array de URLs de imágenes (típicamente 3). Puede contener `null` en items. |
| `hero_video`     | `string|null` | Sí       | URL de video hero. Generalmente `null`. |
| `hero_imagen`    | `string|null` | Sí       | URL de imagen hero. |

### `localizacion` — Ubicación del venue

| Campo                   | Tipo          | Nullable | Descripción |
|-------------------------|---------------|----------|-------------|
| `imagen_mapa_estatica`  | `string|null` | Sí       | URL de imagen del mapa/layout. |
| `iframe_google_maps`    | `string|null` | Sí       | HTML `<iframe>` completo de Google Maps. |
| `link_google_maps`      | `string|null` | Sí       | Link directo a Google Maps. |
| `link_360`              | `string|null` | Sí       | URL de tour 360° (Panoraven). |

### `enlaces_adicionales` — Menú y redes sociales

| Campo             | Tipo          | Nullable | Descripción |
|-------------------|---------------|----------|-------------|
| `link_menu`       | `string|null` | Sí       | URL del menú digital (`mandalagroup.menu`). |
| `redes_sociales`  | `object`      | No       | Redes sociales del venue. |

**`redes_sociales`:**

| Campo       | Tipo          | Nullable | Descripción |
|-------------|---------------|----------|-------------|
| `facebook`  | `string|null` | Sí       | URL de Facebook. |
| `instagram` | `string|null` | Sí       | URL de Instagram. |
| `tiktok`    | `string|null` | Sí       | URL de TikTok. |
| `whatsapp`  | `string|null` | Sí       | URL de WhatsApp API con mensaje prellenado. |

---

## Estructura JSON — Evento

Cada elemento de `venue.eventos[]`:

| Campo                  | Tipo     | Descripción |
|------------------------|----------|-------------|
| `configuracion_general`| `object` | Nombre, slug, prioridad, estatus, IDs externos. |
| `logistica`            | `object` | Fechas, horarios, ventana de venta, puertas. |
| `contenido_idiomas`    | `array[4]` | SEO y textos descriptivos por idioma. |
| `multimedia`           | `object` | Galería, mapa, video, banners responsive. |

### `configuracion_general`

| Campo               | Tipo          | Nullable | Descripción |
|---------------------|---------------|----------|-------------|
| `nombre_evento`     | `string`      | No       | Nombre completo (ej. `"GORDO - March 10th"`). |
| `nombre_corto`      | `string`      | No       | Slug/identificador (ej. `"gordo"`, `"sinner-feb14"`). |
| `orden_prioridad`   | `number`      | No       | Entero para ordenamiento. Mayor = más prioridad. |
| `id_evento_externo` | `string|null` | Sí       | ID de sistema externo de boletos. |
| `url_externo`       | `string|null` | Sí       | URL a sistema externo de boletos. |
| `estatus`           | `string`      | No       | Estado del evento. Valor conocido: `"Disponible"`. |

### `logistica`

| Campo              | Tipo     | Formato                  | Descripción |
|--------------------|----------|--------------------------|-------------|
| `fecha_inicio`     | `string` | `YYYY-MM-DD`             | Fecha de inicio del evento. |
| `fecha_fin`        | `string` | `YYYY-MM-DD`             | Fecha de fin (puede ser igual a inicio). |
| `hora_inicio`      | `string` | `HH:mm:ss`              | Hora de inicio. |
| `hora_fin`         | `string` | `HH:mm:ss`              | Hora de fin. |
| `inicio_venta`     | `string` | `YYYY-MM-DD HH:mm:ss`   | Inicio de venta de boletos. |
| `fin_venta`        | `string` | `YYYY-MM-DD HH:mm:ss`   | Fin de venta de boletos. |
| `apertura_puertas` | `string` | `HH:mm:ss`              | Apertura de puertas. |
| `cierre_puertas`   | `string` | `HH:mm:ss`              | Cierre de puertas. |

> **Nota:** `"0000-00-00"`, `"0000-00-00 00:00:00"` y `"00:00:00"` significan "no definido". Siempre validar antes de parsear.

### `contenido_idiomas[]` — Contenido del evento por idioma

| Campo          | Tipo     | Descripción |
|----------------|----------|-------------|
| `idioma_abrev` | `string` | Código ISO: `es`, `en`, `pt`, `fr`. |
| `url`          | `string` | **URL directa** a la página del evento en mandalatickets.com, localizada por idioma (ej. `https://mandalatickets.com/es/cancun/events/mandala-beach/jerzy-march02`). |
| `seo`          | `object` | Metadatos SEO del evento. |
| `textos`       | `object` | Textos descriptivos del evento. |

**`seo`:** (misma estructura que en venue)

| Campo         | Tipo     |
|---------------|----------|
| `titulo`      | `string` |
| `descripcion` | `string` |
| `keywords`    | `string` |

**`textos`:**

| Campo                 | Tipo          | Nullable | Descripción |
|-----------------------|---------------|----------|-------------|
| `descripcion_larga_1` | `string|null` | Sí       | Descripción principal en HTML. |
| `descripcion_larga_2` | `string|null` | Sí       | Descripción secundaria en HTML. Usado en venues como D'Cave y Bonbonniere. |

### `multimedia` — Multimedia del evento

| Campo               | Tipo          | Nullable | Descripción |
|---------------------|---------------|----------|-------------|
| `galeria`           | `array`       | No       | Array de URLs de imágenes (típicamente 3). |
| `mapa_evento`       | `string|null` | Sí       | URL del mapa/layout específico del evento. |
| `video_portada_url` | `string|null` | Sí       | URL de video de portada del evento. |
| `slider_banners`    | `object|null` | Sí       | Banners responsive. Puede ser `null` en algunos eventos. |

**`slider_banners`:**

| Campo     | Tipo     | Descripción |
|-----------|----------|-------------|
| `desktop` | `string` | Banner para escritorio (~4000px ancho). |
| `mobile`  | `string` | Banner para móvil (~1080px ancho). |

---

## Esquema completo (árbol)

```
[                                          // Array<Venue>
  {
    "nombre": string,
    "row_id": string,
    "logo": string | null,

    "metadata_contenido": [                // Array[4]
      {
        "idioma": string,
        "idioma_abrev": "es" | "en" | "pt" | "fr",
        "seo": {
          "titulo": string,
          "descripcion": string,
          "keywords": string
        },
        "textos": {
          "titulo_disponibilidad": string | null,
          "descripcion_corta": string,       // HTML
          "descripcion_larga": string        // HTML
        }
      }
    ],

    "multimedia": {
      "imagen_portada": string | null,
      "video_portada": string | null,
      "carrusel": [ string | null, ... ],
      "hero_video": string | null,
      "hero_imagen": string | null
    },

    "localizacion": {
      "imagen_mapa_estatica": string | null,
      "iframe_google_maps": string | null,   // HTML <iframe>
      "link_google_maps": string | null,
      "link_360": string | null
    },

    "enlaces_adicionales": {
      "link_menu": string | null,
      "redes_sociales": {
        "facebook": string | null,
        "instagram": string | null,
        "tiktok": string | null,
        "whatsapp": string | null
      }
    },

    "eventos": [                           // Array<Evento>
      {
        "configuracion_general": {
          "nombre_evento": string,
          "nombre_corto": string,
          "orden_prioridad": number,
          "id_evento_externo": string | null,
          "url_externo": string | null,
          "estatus": string
        },

        "logistica": {
          "fecha_inicio": string,            // "YYYY-MM-DD"
          "fecha_fin": string,
          "hora_inicio": string,             // "HH:mm:ss"
          "hora_fin": string,
          "inicio_venta": string,            // "YYYY-MM-DD HH:mm:ss"
          "fin_venta": string,
          "apertura_puertas": string,        // "HH:mm:ss"
          "cierre_puertas": string
        },

        "contenido_idiomas": [             // Array[4]
          {
            "idioma_abrev": "es" | "en" | "pt" | "fr",
            "url": string,                 // URL directa al evento, localizada por idioma
            "seo": {
              "titulo": string,
              "descripcion": string,
              "keywords": string
            },
            "textos": {
              "descripcion_larga_1": string | null,  // HTML
              "descripcion_larga_2": string | null   // HTML
            }
          }
        ],

        "multimedia": {
          "galeria": [ string, ... ],
          "mapa_evento": string | null,
          "video_portada_url": string | null,
          "slider_banners": {
            "desktop": string,
            "mobile": string
          } | null
        }
      }
    ]
  }
]
```

---

## Medidas y aspect ratios de multimedia

Medidas obtenidas directamente de los archivos reales que maneja la API.

### Multimedia del Venue

| Campo              | Medida estándar   | Aspect Ratio            | Uso |
|--------------------|-------------------|-------------------------|-----|
| `imagen_portada`   | **1200 x 630 px** | ~1.9:1 (aprox. 40:21)   | Thumbnail / Card del venue. Similar a Open Graph. |
| `hero_imagen`      | **1200 x 630 px** | ~1.9:1 (aprox. 40:21)   | Hero banner del venue. Mismo tamaño que portada. |
| `carrusel`         | **Variable**      | **1:1** o **3:2**       | Galería de productos. Algunos venues usan 1080x1080 (1:1), otros ~1500x1000 (3:2). |
| `video_portada`    | N/A               | N/A                     | Actualmente no se usa (siempre `null`). |
| `hero_video`       | N/A               | N/A                     | Actualmente no se usa (siempre `null`). |

> **Excepciones:** D'Cave tiene una `imagen_portada` de 4000x1120 (~3.57:1) y Houdinni de 1920x1080 (16:9). La mayoría sigue el estándar **1200x630**.

### Multimedia del Evento

| Campo                    | Medida estándar     | Aspect Ratio         | Uso |
|--------------------------|---------------------|----------------------|-----|
| `galeria`                | **1000 x 1000 px**  | **1:1** (cuadrado)   | Imágenes de producto/boleto del evento. Siempre cuadradas. |
| `mapa_evento`            | **1000 x 1000 px**  | **1:1** (cuadrado)   | Mapa/layout específico del evento. Cuadrado. |
| `slider_banners.desktop` | **4000 x 1200 px**  | **10:3** (~3.33:1)   | Banner hero para escritorio. Ultra-ancho. |
| `slider_banners.mobile`  | **1080 x 580 px**   | **54:29** (~1.86:1)  | Banner hero para móvil. Casi 2:1. |
| `video_portada_url`      | N/A                 | N/A                  | Actualmente no se usa (siempre `null`). |

### Resumen rápido

```
VENUE
  imagen_portada / hero_imagen  →  1200 x 630 px   →  ~1.9:1   (horizontal, estilo OG)
  carrusel (productos)          →  1:1 o 3:2        →  cuadrado o ligeramente horizontal

EVENTO
  galeria                       →  1000 x 1000 px   →  1:1      (cuadrado)
  mapa_evento                   →  1000 x 1000 px   →  1:1      (cuadrado)
  slider_banners.desktop        →  4000 x 1200 px   →  10:3     (ultra-ancho, ~3.3:1)
  slider_banners.mobile         →  1080 x 580 px    →  ~1.86:1  (casi 2:1)
```

---

## Recursos estáticos y rutas base

| Recurso                      | Ruta base                                                  | Medida típica        |
|------------------------------|------------------------------------------------------------|----------------------|
| Portadas/thumbnails de venues| `https://mandalatickets.com/assets/uploads/discos/`        | 1200 x 630 px       |
| Imágenes de productos        | `https://mandalatickets.com/assets/uploads/productos/`     | Variable (1:1 / 3:2)|
| Imágenes de eventos (galería)| `https://mandalatickets.com/assets/uploads/eventos/`       | 1000 x 1000 px      |
| Mapas de eventos             | `https://mandalatickets.com/assets/uploads/eventos_mapas/` | 1000 x 1000 px      |
| Banners slider (desktop)     | `https://mandalatickets.com/assets/uploads/eventos_slider/`| 4000 x 1200 px      |
| Banners slider (mobile)      | `https://mandalatickets.com/assets/uploads/eventos_slider/`| 1080 x 580 px       |
| Mapas estáticos de venues    | `https://mandalatickets.com/assets/img/mapa/`              | No accesible públicamente |
| Menús digitales              | `https://mandalagroup.menu/`                               | —                    |
| Tours 360°                   | `https://panoraven.com/es/embed/`                          | —                    |

### Links de menú por venue

| Venue               | URL del menú |
|----------------------|--------------|
| Mandala Beach Day    | `https://mandalagroup.menu/cancun/mandala-beach` |
| Mandala Beach Night  | `https://mandalagroup.menu/cancun/mandala-beach-night/` |
| D'Cave              | `https://mandalagroup.menu/cancun/dcave` |
| Bonbonniere          | `https://mandalagroup.menu/tulum/bonbonniere` |
| Vagalume             | `https://mandalagroup.menu/tulum/vagalume/` |
| Sra Tanaka           | `null` (no disponible) |
| Houdinni             | `https://mandalagroup.menu/es/houdinni` |

### Redes sociales por venue

| Venue               | Facebook | Instagram | TikTok | WhatsApp |
|----------------------|----------|-----------|--------|----------|
| Mandala Beach Day    | @MandalaBeachmx | @MandalaBeachmx | @mandala.beach | 525649802193 |
| Mandala Beach Night  | @MandalaBeachmx | @mandalabeachmx | — | 525649802193 |
| D'Cave              | @DCave.mx | @dcave.mx | — | 525649802193 |
| Bonbonniere          | — | — | — | 525649802193 |
| Vagalume             | — | — | — | 525649802193 |
| Sra Tanaka           | — | @senoratanakamx | — | — |
| Houdinni             | — | @houdinni.madrid | — | — |

---

## Diferencias clave: Venue vs Evento

| Aspecto           | Venue (`metadata_contenido`)       | Evento (`contenido_idiomas`) |
|-------------------|------------------------------------|------------------------------|
| Identificador idioma | `idioma` + `idioma_abrev`       | Solo `idioma_abrev`          |
| Textos            | `titulo_disponibilidad`, `descripcion_corta`, `descripcion_larga` | `descripcion_larga_1`, `descripcion_larga_2` |
| Multimedia        | `imagen_portada`, `video_portada`, `carrusel`, `hero_video`, `hero_imagen` | `galeria`, `mapa_evento`, `video_portada_url`, `slider_banners` |
| Banners responsive| No tiene                           | `slider_banners.desktop`, `slider_banners.mobile` |
| SEO               | Mismo esquema (`titulo`, `descripcion`, `keywords`) | Mismo esquema |

---

## Campos nulos y valores por defecto

| Campo / Valor                         | Frecuencia   | Fallback sugerido |
|---------------------------------------|--------------|-------------------|
| `logo = null`                         | 4 de 7 venues | Placeholder o no mostrar |
| `imagen_portada = null`               | 1 de 7       | Usar `hero_imagen` |
| `hero_imagen = null`                  | 1 de 7       | Usar `imagen_portada` |
| `video_portada = null`                | Siempre      | No mostrar video |
| `hero_video = null`                   | Siempre      | No mostrar video |
| `link_google_maps = null`             | Siempre      | Usar `iframe_google_maps` |
| `link_360 = null`                     | 2 de 7       | No mostrar tour 360° |
| `titulo_disponibilidad = null`        | Varios       | No mostrar badge |
| `facebook = null`                     | 4 de 7       | No mostrar icono |
| `instagram = null`                    | 2 de 7       | No mostrar icono |
| `tiktok = null`                       | 6 de 7       | No mostrar icono |
| `whatsapp = null`                     | 2 de 7       | No mostrar botón |
| `mapa_evento = null`                  | Variable     | No mostrar mapa del evento |
| `video_portada_url = null`            | Siempre      | No mostrar video |
| `descripcion_larga_2 = null`          | Mayoría      | No mostrar bloque secundario |
| `slider_banners = null`               | Raro         | No mostrar banner slider |
| `carrusel` contiene `null` en items   | 1 venue (Sra Tanaka) | Filtrar nulls del array |
| `fecha_inicio = "0000-00-00"`         | Nunca visto  | No parsear como fecha |
| `hora_inicio = "00:00:00"`            | Casi siempre | Usar horario de la descripción HTML |
| `inicio_venta = "0000-00-00 00:00:00"`| Casi siempre | Venta sin restricción de fechas |

---

## Ejemplos de código

### cURL

```bash
curl -X POST "https://mandalatickets.com/api/info_venues/X-API-KEY/$MT_CONTENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### JavaScript (fetch)

```javascript
const apiKey = process.env.MT_CONTENT_API_KEY;

const response = await fetch(
  `https://mandalatickets.com/api/info_venues/X-API-KEY/${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  }
);

const venues = await response.json();

// Filtrar venues por ciudad (ej. solo Cancún)
const cancunVenues = venues.filter(v =>
  ['3', '4', '6'].includes(v.row_id)
);

// Obtener eventos de un venue en español
const eventos = venues[0].eventos.map(ev => {
  const es = ev.contenido_idiomas.find(c => c.idioma_abrev === 'es');
  return {
    nombre: ev.configuracion_general.nombre_evento,
    fecha: ev.logistica.fecha_inicio,
    estatus: ev.configuracion_general.estatus,
    url: es?.url,  // Link directo a la página del evento
    seo_titulo: es?.seo.titulo,
    banner_desktop: ev.multimedia.slider_banners?.desktop,
    banner_mobile: ev.multimedia.slider_banners?.mobile,
  };
});
```

### Python (requests)

```python
import requests
import os

api_key = os.environ.get("MT_CONTENT_API_KEY")
url = f"https://mandalatickets.com/api/info_venues/X-API-KEY/{api_key}"

response = requests.post(url, json={})
venues = response.json()

# Agrupar venues por ciudad
ciudades = {
    "Cancún": ["3", "4", "6"],
    "Tulum": ["37", "38"],
    "Guadalajara": ["54"],
    "Madrid": ["55"],
}

for ciudad, ids in ciudades.items():
    city_venues = [v for v in venues if v["row_id"] in ids]
    total_eventos = sum(len(v["eventos"]) for v in city_venues)
    print(f"{ciudad}: {len(city_venues)} venues, {total_eventos} eventos")

# Obtener contenido en un idioma específico
def get_venue_text(venue, lang="es"):
    meta = next(m for m in venue["metadata_contenido"] if m["idioma_abrev"] == lang)
    return {
        "titulo_seo": meta["seo"]["titulo"],
        "descripcion_seo": meta["seo"]["descripcion"],
        "disponibilidad": meta["textos"]["titulo_disponibilidad"],
    }
```

### PHP

```php
<?php
$apiKey = getenv('MT_CONTENT_API_KEY');
$url = "https://mandalatickets.com/api/info_venues/X-API-KEY/{$apiKey}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, '{}');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$venues = json_decode($response, true);

foreach ($venues as $venue) {
    echo $venue['nombre'] . " — " . count($venue['eventos']) . " eventos\n";
}
```

---

## Notas técnicas

1. **Seguridad:** La API key no debe exponerse en frontend. Usarla solo en backend o en variables de entorno.

2. **Caché:** La respuesta es pesada (~400 KB+). Implementar caché del lado del servidor con TTL de 5-15 minutos.

3. **HTML en textos:** Los campos `descripcion_corta`, `descripcion_larga`, `descripcion_larga_1` y `descripcion_larga_2` contienen HTML crudo. **Sanitizar antes de renderizar** para prevenir XSS (`DOMPurify` en JS, `bleach` en Python, `htmlspecialchars` en PHP).

4. **Fechas inválidas:** `"0000-00-00"` y `"0000-00-00 00:00:00"` no son fechas válidas. Validar antes de parsear con `Date()`, `datetime`, etc.

5. **Horarios reales:** En la mayoría de eventos, `hora_inicio` y `hora_fin` vienen como `"00:00:00"` (no definidos). Los horarios reales están dentro del HTML de `descripcion_larga_1`. Considerar extraerlos con parsing de HTML si se necesitan como dato estructurado.

6. **URLs con espacios:** Algunos nombres de archivo contienen espacios y paréntesis (ej. `"Mesa de trabajo 1 (1).jpg"`). Las URLs ya vienen completas, pero si se reconstruyen manualmente, aplicar `encodeURIComponent()` / `urllib.parse.quote()`.

7. **Orden de eventos:** Usar `orden_prioridad` para determinar el orden de despliegue. El array NO viene ordenado.

8. **Estatus del evento:** El único valor observado es `"Disponible"`. Validar posibles valores futuros como `"Agotado"`, `"Cancelado"`, etc.

9. **Carrusel con nulls:** El venue SRA TANAKA tiene su `carrusel` como `[null, null, null]`. Filtrar nulls antes de renderizar.

10. **`descripcion_larga_2`:** Usado principalmente por D'Cave, Bonbonniere y Vagalume. Contiene información complementaria: line-ups, precios de boletos, dress code, políticas de check-in. **No ignorar este campo** — puede contener el contenido principal del evento cuando `descripcion_larga_1` es solo un título.

11. **Iframe de Google Maps:** Es HTML completo con `width="600"`, `height="450"`, `allowfullscreen`, `loading="lazy"`. Listo para insertar. Ajustar dimensiones con CSS.

12. **WhatsApp:** Los links incluyen número de teléfono (`525649802193`) y texto prellenado con el nombre del venue. Formato: `https://api.whatsapp.com/send?phone=...&text=...`

13. **URLs de eventos:** Cada elemento de `contenido_idiomas` incluye un campo `url` con el link directo a la página del evento en mandalatickets.com, ya localizado por idioma (ej. `/es/cancun/events/mandala-beach/jerzy-march02`). Usar este campo en lugar de construir URLs manualmente.

14. **Serie Spring Sounds:** Los eventos de marzo 2026 en Cancún (MB Day, MB Night, D'Cave) son parte del festival **Spring Sounds 2026** / Spring Break.

15. **Venues internacionales:** Houdinni está en Madrid, España (c/ de Serrano 41, Salamanca, 28001). Considerar zona horaria al mostrar horarios.
