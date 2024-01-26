export function svgToDataurl(svgCode: string) {
    const base64Svg: string = btoa(svgCode)
    return `data:image/svg+xml;base64,${base64Svg}`
}
