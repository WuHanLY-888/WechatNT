export function generateCaptcha() {
    const width = 100
    const height = 35
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return { url: '', text: '' }
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, width, height)

    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789'
    let captchaText = ''
    ctx.font = '20px Arial'

    // Draw random characters on canvas
    for (let i = 0; i < 4; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length))
        captchaText += char
        ctx.fillStyle = getRandomColor()
        ctx.fillText(char, i * 24 + 5, 25)
    }

    // Function to get a random color for the text
    function getRandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    // Convert to base64 image
    return { url: canvas.toDataURL('image/png'), text: captchaText }
}
