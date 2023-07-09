interface IconProps {
    id: string;
    width?: string;
    height?: string;
}

const Icon = ({ id, width, height }: IconProps) => {
    return (
        <svg width={width || "1em"} height={height || "1em"}>
            <use href={id} />
        </svg>
    );
}

export default Icon;