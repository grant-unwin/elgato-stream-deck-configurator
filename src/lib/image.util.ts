import sharp from "sharp";

export const createButton = async (label: string, size: number) => {

    console.log("createButton", label, size);
    const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!--this rect should have rounded corners-->
  <rect x="0" y="0" width="100%" height="100%" fill="#fff"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.25em" fill="#000">${label}</text>
</svg>
`;

    const svg_buffer = Buffer.from(svg);

    return await sharp({
        create: {
            width: size,
            height: size,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
        }
    })

        .composite([{
            input: svg_buffer,
            top: 0,
            left: 0,
        }])
.removeAlpha()
        .flatten({ background: { r: 255, g: 255, b: 255 } }) // Eliminate alpha channel, if any.
        .resize(size, size) // Scale up/down to the right size, cropping if necessary.
        .raw() // Give us uncompressed RGB.
        .toBuffer()
}