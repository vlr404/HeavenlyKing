export const Space = ({ mt = 0 }) => {
    return (
        <div
            style={{
                height: `${mt}px`,
                width: '100%',
                pointerEvents: 'none' // Чтобы этот блок не мешал кликать по ссылкам
            }}
        />
    );
};