interface propsTypes {
    name: string
    prefix?: string
    color?: string
    [key: string]: any
}
export default function SvgIcon({ name, prefix = 'icon', size = 20, ...props }: propsTypes) {
    const symbolId = `#${prefix}-${name}`
    return (
        <svg
            style={{ width: size, height: size, fontSize: size, fill: 'currentColor' }}
            {...props}
            aria-hidden="true"
        >
            <use href={symbolId} fill={'currentColor'} />
        </svg>
    )
}
