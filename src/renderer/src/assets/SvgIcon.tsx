interface propsTypes {
    name: string
    prefix?: string
    color?: string
    [key: string]: any
}
export default function SvgIcon({
    name,
    prefix = 'icon',
    color = '#333',
    fontSize = 20,
    height = 20,
    width = 20,
    ...props
}: propsTypes) {
    const symbolId = `#${prefix}-${name}`

    return (
        <svg style={{ width, height, fontSize }} {...props} aria-hidden="true">
            <use href={symbolId} fill={color} />
        </svg>
    )
}
