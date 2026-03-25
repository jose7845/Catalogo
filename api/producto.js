export default function handler(req, res) {
    const { title, img, desc } = req.query;
    const siteUrl = 'https://catalogo-bombones.vercel.app';

    if (!title || !img) {
        res.writeHead(302, { Location: siteUrl });
        return res.end();
    }

    const imageUrl = img.startsWith('http') ? img : `${siteUrl}/${img}`;
    const safeTitle = title.replace(/"/g, '&quot;');
    const safeDesc = (desc || '').replace(/"/g, '&quot;');

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="${safeTitle} - SOS Bombones">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="600">
    <meta property="og:image:height" content="600">
    <meta property="og:url" content="${siteUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="SOS Bombones">
    <meta http-equiv="refresh" content="0;url=${siteUrl}">
    <title>${safeTitle} - SOS Bombones</title>
</head>
<body>
    <p>Redirigiendo a SOS Bombones...</p>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(html);
}
