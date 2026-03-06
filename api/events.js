
export default async function handler(req, res) {
    const apiKey = process.env.MT_CONTENT_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API Key not configured" });
    }

    try {
        const response = await fetch(
            `https://mandalatickets.com/api/info_venues/X-API-KEY/${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            }
        );

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Filter for Rakata venues (some might be "RAKATA", "RAKATA CANCUN", etc. but according to response it's "RAKATA")
        const rakataVenues = data.filter(venue =>
            venue.nombre.toUpperCase() === 'RAKATA'
        );

        const allEvents = [];
        rakataVenues.forEach(venue => {
            venue.eventos.forEach(event => {
                const esContent = event.contenido_idiomas.find(c => c.idioma_abrev === 'es') || event.contenido_idiomas[0];
                allEvents.push({
                    nombre: event.configuracion_general.nombre_evento,
                    fecha: event.logistica.fecha_inicio,
                    imagen: event.multimedia.galeria[0],
                    banner_desktop: event.multimedia.slider_banners?.desktop,
                    banner_mobile: event.multimedia.slider_banners?.mobile,
                    url: esContent.url || '#'
                });
            });
        });

        // Sort events by priority or date if needed, but for now we follow the API order
        res.status(200).json(allEvents);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
}
