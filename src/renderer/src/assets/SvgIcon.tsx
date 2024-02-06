interface propsTypes {
    name: string
    prefix?: string
    color?: string
    [key: string]: any
}
export default function SvgIcon({ name, prefix = 'icon', size = 20, ...props }: propsTypes) {
    const symbolId = `#${prefix}-${name}`
    console.log(name, size);

    return (
        <svg
            style={{ width: size, height: size, fontSize: size }}
            {...props}
            aria-hidden="true"
        >
            <use href={symbolId} fill={'currentColor'} />
        </svg>
    )
}
